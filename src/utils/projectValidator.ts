import postcss from 'postcss';
import type { DesignTokens, FileAnalysis, ElementAnalysis, StyleProperty, ProjectViolation, ProjectValidationResult } from '../types/DesignToken';

// HTML/JSX parser for extracting elements and their styles
class ProjectAnalyzer {
    private tokens: DesignTokens;
    private fileAnalyses: FileAnalysis[] = [];

    constructor(tokens: DesignTokens) {
        this.tokens = tokens;
    }

    // Parse HTML content to extract elements and their structure
    private parseHTML(content: string, filePath: string): ElementAnalysis[] {
        const elements: ElementAnalysis[] = [];
        
        // Simple HTML/JSX parser (in production, use a proper parser like parse5 or @babel/parser)
        const tagRegex = /<(\w+)([^>]*?)(?:\s*\/?>|>(.*?)<\/\1>)/gs;
        const classRegex = /className?=["']([^"']+)["']/;
        const idRegex = /id=["']([^"']+)["']/;
        const styleRegex = /style=["']([^"']+)["']/;
        
        let match;
        while ((match = tagRegex.exec(content)) !== null) {
            const [fullMatch, tagName, attributes, innerContent] = match;
            const classMatch = attributes.match(classRegex);
            const idMatch = attributes.match(idRegex);
            const styleMatch = attributes.match(styleRegex);
            
            const element: ElementAnalysis = {
                tagName: tagName.toLowerCase(),
                selector: this.generateSelector(tagName, classMatch?.[1], idMatch?.[1]),
                className: classMatch?.[1],
                id: idMatch?.[1],
                styles: [],
                children: [],
                line: this.getLineNumber(content, match.index || 0)
            };

            // Parse inline styles
            if (styleMatch) {
                const inlineStyles = this.parseInlineStyles(styleMatch[1]);
                element.styles.push(...inlineStyles);
            }

            // Parse children recursively
            if (innerContent) {
                element.children = this.parseHTML(innerContent, filePath);
                element.children.forEach(child => child.parent = element.selector);
            }

            elements.push(element);
        }

        return elements;
    }

    // Parse CSS content to extract rules and properties
    private async parseCSS(content: string, filePath: string): Promise<ElementAnalysis[]> {
        const elements: ElementAnalysis[] = [];

        try {
            const result = await postcss().process(content, { from: filePath });
            
            result.root.walkRules((rule) => {
                const element: ElementAnalysis = {
                    tagName: 'css-rule',
                    selector: rule.selector,
                    styles: [],
                    children: [],
                    line: rule.source?.start?.line
                };

                rule.walkDecls((decl) => {
                    element.styles.push({
                        property: decl.prop,
                        value: decl.value,
                        source: 'css',
                        line: decl.source?.start?.line,
                        column: decl.source?.start?.column
                    });
                });

                elements.push(element);
            });
        } catch (error) {
            console.error(`Error parsing CSS in ${filePath}:`, error);
        }

        return elements;
    }

    // Parse React/JSX components
    private parseReactComponent(content: string, filePath: string): ElementAnalysis[] {
        // Extract JSX from React components
        const jsxRegex = /return\s*\(([\s\S]*?)\);?/g;
        const elements: ElementAnalysis[] = [];
        
        let match;
        while ((match = jsxRegex.exec(content)) !== null) {
            const jsxContent = match[1];
            elements.push(...this.parseHTML(jsxContent, filePath));
        }

        return elements;
    }

    // Generate CSS selector from element attributes
    private generateSelector(tagName: string, className?: string, id?: string): string {
        let selector = tagName;
        if (id) selector += `#${id}`;
        if (className) {
            const classes = className.split(/\s+/).map(c => `.${c}`).join('');
            selector += classes;
        }
        return selector;
    }

    // Parse inline style string into StyleProperty array
    private parseInlineStyles(styleString: string): StyleProperty[] {
        const styles: StyleProperty[] = [];
        const declarations = styleString.split(';').filter(d => d.trim());
        
        declarations.forEach(decl => {
            const [property, value] = decl.split(':').map(s => s.trim());
            if (property && value) {
                styles.push({
                    property,
                    value,
                    source: 'inline'
                });
            }
        });

        return styles;
    }

    // Get line number for a given position in content
    private getLineNumber(content: string, position: number): number {
        return content.substring(0, position).split('\n').length;
    }

    // Analyze a single file
    async analyzeFile(filePath: string, content: string): Promise<FileAnalysis> {
        const fileType = this.getFileType(filePath);
        let elements: ElementAnalysis[] = [];
        const dependencies: string[] = [];

        // Extract import/require statements
        const importRegex = /(?:import.*?from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\))/g;
        let importMatch;
        while ((importMatch = importRegex.exec(content)) !== null) {
            dependencies.push(importMatch[1] || importMatch[2]);
        }

        switch (fileType) {
            case 'html':
                elements = this.parseHTML(content, filePath);
                break;
            case 'css':
                elements = await this.parseCSS(content, filePath);
                break;
            case 'tsx':
            case 'jsx':
                elements = this.parseReactComponent(content, filePath);
                break;
            case 'js':
            case 'ts':
                // Look for template literals or createElement calls
                elements = this.parseReactComponent(content, filePath);
                break;
        }

        return {
            filePath,
            fileType,
            content,
            elements,
            dependencies
        };
    }

    // Determine file type from extension
    private getFileType(filePath: string): FileAnalysis['fileType'] {
        const ext = filePath.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'html': return 'html';
            case 'css': return 'css';
            case 'tsx': return 'tsx';
            case 'jsx': return 'jsx';
            case 'js': return 'js';
            case 'ts': return 'ts';
            default: return 'html';
        }
    }

    // Validate styles against design tokens
    private validateStyle(style: StyleProperty, element: ElementAnalysis, fileAnalysis: FileAnalysis): ProjectViolation[] {
        const violations: ProjectViolation[] = [];
        const { property, value } = style;

        // Color validation
        if (property === 'color' || property === 'background-color' || property.includes('border-color')) {
            if (!this.tokens.colors.includes(value)) {
                const suggestedFix = this.findClosestToken(value, this.tokens.colors);
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Color '${value}' is not in the design system. Consider using '${suggestedFix}'.`,
                    suggestedFix,
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'error',
                    wcagRule: 'WCAG 1.4.3 (Contrast)',
                    line: style.line,
                    column: style.column
                });
            }
        }

        // Spacing validation
        if (this.isSpacingProperty(property)) {
            const values = value.split(/\s+/);
            const invalidValues = values.filter(v => !this.tokens.spacing.includes(v) && !this.isValidSpacingKeyword(v));
            
            if (invalidValues.length > 0) {
                const suggestedFix = values.map(v => 
                    invalidValues.includes(v) ? this.findClosestToken(v, this.tokens.spacing) : v
                ).join(' ');
                
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Spacing values not in design system: ${invalidValues.join(', ')}`,
                    suggestedFix,
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'error',
                    wcagRule: 'WCAG 1.4.10 (Reflow)',
                    line: style.line,
                    column: style.column
                });
            }
        }

        // Font size validation (WCAG minimum 16px for body text)
        if (property === 'font-size') {
            const numericValue = parseFloat(value);
            const isBodyText = element.tagName === 'p' || element.tagName === 'div' || element.tagName === 'span';
            
            if (!this.tokens.fontSizes.includes(value)) {
                const suggestedFix = this.findClosestToken(value, this.tokens.fontSizes);
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Font size '${value}' not in typography scale. Consider using '${suggestedFix}'.`,
                    suggestedFix,
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'error',
                    wcagRule: 'WCAG 1.4.4 (Resize Text)',
                    line: style.line,
                    column: style.column
                });
            }

            // Check WCAG minimum font size for body text
            if (isBodyText && numericValue < 16 && value.includes('px')) {
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Font size ${value} is below WCAG recommended minimum of 16px for body text.`,
                    suggestedFix: '16px',
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'warning',
                    wcagRule: 'WCAG 1.4.4 (Resize Text)',
                    line: style.line,
                    column: style.column
                });
            }
        }

        // Line height validation (WCAG recommends 1.5 for body text)
        if (property === 'line-height') {
            const numericValue = parseFloat(value);
            const isBodyText = element.tagName === 'p' || element.tagName === 'div';
            
            if (!this.tokens.lineHeights.includes(value)) {
                const suggestedFix = this.findClosestToken(value, this.tokens.lineHeights);
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Line height '${value}' not in design system.`,
                    suggestedFix,
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'error',
                    wcagRule: 'WCAG 1.4.8 (Visual Presentation)',
                    line: style.line,
                    column: style.column
                });
            }

            if (isBodyText && numericValue < 1.5) {
                violations.push({
                    filePath: fileAnalysis.filePath,
                    elementPath: this.getElementPath(element),
                    selector: element.selector,
                    property,
                    value,
                    message: `Line height ${value} is below WCAG recommended minimum of 1.5 for body text.`,
                    suggestedFix: '1.5',
                    context: this.buildContext(element, fileAnalysis),
                    severity: 'warning',
                    wcagRule: 'WCAG 1.4.8 (Visual Presentation)',
                    line: style.line,
                    column: style.column
                });
            }
        }

        return violations;
    }

    // Check if property is spacing-related
    private isSpacingProperty(property: string): boolean {
        return property.includes('margin') || property.includes('padding') || 
               property === 'gap' || property.includes('top') || 
               property.includes('right') || property.includes('bottom') || 
               property.includes('left');
    }

    // Check if value is a valid spacing keyword
    private isValidSpacingKeyword(value: string): boolean {
        return ['auto', 'inherit', 'initial', 'unset', 'revert'].includes(value);
    }

    // Find closest matching token
    private findClosestToken(value: string, tokens: string[]): string {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const numericTokens = tokens
                .map(token => ({ token, value: parseFloat(token) }))
                .filter(t => !isNaN(t.value))
                .sort((a, b) => Math.abs(a.value - numericValue) - Math.abs(b.value - numericValue));
            
            if (numericTokens.length > 0) {
                return numericTokens[0].token;
            }
        }
        return tokens[0] || value;
    }

    // Get element path for better identification
    private getElementPath(element: ElementAnalysis): string {
        const parts = [element.selector];
        let current = element;
        while (current.parent) {
            parts.unshift(current.parent);
            // Find parent element (simplified)
            break;
        }
        return parts.join(' > ');
    }

    // Build context information for violations
    private buildContext(element: ElementAnalysis, fileAnalysis: FileAnalysis) {
        return {
            parentElement: element.parent,
            childElements: element.children.map(child => child.selector),
            relatedFiles: fileAnalysis.dependencies,
            cascadingImpact: this.findCascadingImpact(element, fileAnalysis)
        };
    }

    // Find elements that might be affected by changes to this element
    private findCascadingImpact(element: ElementAnalysis, fileAnalysis: FileAnalysis): string[] {
        const impact: string[] = [];
        
        // Check for child elements that might inherit styles
        element.children.forEach(child => {
            impact.push(`Child element: ${child.selector}`);
        });

        // Check for similar class names across the project
        if (element.className) {
            const classes = element.className.split(/\s+/);
            classes.forEach(className => {
                impact.push(`Elements with class: .${className}`);
            });
        }

        return impact;
    }

    // Main validation method
    async validateProject(files: { [filePath: string]: string }): Promise<ProjectValidationResult> {
        const violations: ProjectViolation[] = [];
        const fixedFiles: { [filePath: string]: string } = {};
        
        // Analyze all files
        for (const [filePath, content] of Object.entries(files)) {
            const analysis = await this.analyzeFile(filePath, content);
            this.fileAnalyses.push(analysis);
        }

        // Validate each file
        for (const analysis of this.fileAnalyses) {
            const fileViolations: ProjectViolation[] = [];
            
            for (const element of analysis.elements) {
                for (const style of element.styles) {
                    const styleViolations = this.validateStyle(style, element, analysis);
                    fileViolations.push(...styleViolations);
                }
            }

            violations.push(...fileViolations);

            // Generate fixed content if there are violations
            if (fileViolations.length > 0) {
                fixedFiles[analysis.filePath] = this.generateFixedContent(analysis, fileViolations);
            }
        }

        // Calculate summary
        const summary = {
            totalFiles: this.fileAnalyses.length,
            filesWithIssues: Object.keys(fixedFiles).length,
            totalViolations: violations.length,
            errorCount: violations.filter(v => v.severity === 'error').length,
            warningCount: violations.filter(v => v.severity === 'warning').length,
            infoCount: violations.filter(v => v.severity === 'info').length
        };

        return { violations, fixedFiles, summary };
    }

    // Generate fixed content for a file
    private generateFixedContent(analysis: FileAnalysis, violations: ProjectViolation[]): string {
        let fixedContent = analysis.content;
        
        // Apply fixes in reverse order to maintain positions
        const sortedViolations = violations
            .filter(v => v.suggestedFix)
            .sort((a, b) => (b.line || 0) - (a.line || 0));

        for (const violation of sortedViolations) {
            const originalDeclaration = `${violation.property}: ${violation.value}`;
            const fixedDeclaration = `${violation.property}: ${violation.suggestedFix}`;
            fixedContent = fixedContent.replace(originalDeclaration, fixedDeclaration);
        }

        return fixedContent;
    }
}

export async function validateProject(files: { [filePath: string]: string }, tokens: DesignTokens): Promise<ProjectValidationResult> {
    const analyzer = new ProjectAnalyzer(tokens);
    return await analyzer.validateProject(files);
}