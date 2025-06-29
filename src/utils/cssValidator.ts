import postcss from 'postcss';
import type { DesignTokens } from '../types/DesignToken';

export type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
    suggestedFix?: string;
    line?: number;
    column?: number;
};

export type ValidationResult = {
    violations: Violation[];
    fixedCSS: string;
};

// Color contrast checker for WCAG compliance
function getContrastRatio(color1: string, color2: string): number {
    // Simplified contrast ratio calculation
    // In a real implementation, you'd want a more robust color parsing library
    const getLuminance = (color: string): number => {
        // Basic luminance calculation for hex colors
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const r = parseInt(hex.substr(0, 2), 16) / 255;
            const g = parseInt(hex.substr(2, 2), 16) / 255;
            const b = parseInt(hex.substr(4, 2), 16) / 255;
            
            const sRGB = [r, g, b].map(c => {
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            
            return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
        }
        return 0.5; // Default for non-hex colors
    };
    
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

function findClosestToken(value: string, tokens: string[]): string {
    // Simple string matching - in production, you'd want more sophisticated matching
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
    
    // Fallback to first token of the same type
    return tokens[0] || value;
}

export async function validateCSS(css: string, tokens: DesignTokens): Promise<ValidationResult> {
    const violations: Violation[] = [];
    let fixedCSS = css;

    try {
        const result = await postcss().process(css, { from: undefined });
        const fixes: Array<{ original: string; fixed: string }> = [];

        result.root.walkRules((rule) => {
            let backgroundColor = '';
            let textColor = '';

            // First pass: collect colors for contrast checking
            rule.walkDecls((decl) => {
                if (decl.prop === 'background-color' || decl.prop === 'background') {
                    backgroundColor = decl.value.trim();
                }
                if (decl.prop === 'color') {
                    textColor = decl.value.trim();
                }
            });

            // Second pass: validate properties
            rule.walkDecls((decl) => {
                const val = decl.value.trim();
                const prop = decl.prop;

                // Color validation
                if (prop === 'color' || prop === 'background-color' || prop.includes('border-color')) {
                    if (!tokens.colors.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.colors);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Color '${val}' is not in the design system. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Spacing validation (margin, padding, gap, etc.)
                if (prop.includes('margin') || prop.includes('padding') || prop === 'gap' || 
                    prop.includes('top') || prop.includes('right') || prop.includes('bottom') || prop.includes('left')) {
                    // Handle multiple values (e.g., "10px 20px")
                    const values = val.split(/\s+/);
                    const invalidValues = values.filter(v => !tokens.spacing.includes(v) && v !== 'auto' && v !== 'inherit');
                    
                    if (invalidValues.length > 0) {
                        const suggestedValues = invalidValues.map(v => findClosestToken(v, tokens.spacing));
                        const suggestedFix = val.split(/\s+/).map(v => 
                            invalidValues.includes(v) ? findClosestToken(v, tokens.spacing) : v
                        ).join(' ');
                        
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Spacing value contains non-standard values: ${invalidValues.join(', ')}. Consider using: ${suggestedValues.join(', ')}.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Font size validation
                if (prop === 'font-size') {
                    if (!tokens.fontSizes.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.fontSizes);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Font size '${val}' is not in the typography scale. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Line height validation
                if (prop === 'line-height') {
                    if (!tokens.lineHeights.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.lineHeights);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Line height '${val}' is not in the design system. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Font weight validation
                if (prop === 'font-weight') {
                    if (!tokens.fontWeights.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.fontWeights);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Font weight '${val}' is not in the design system. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Border radius validation
                if (prop.includes('border-radius')) {
                    if (!tokens.borderRadius.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.borderRadius);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Border radius '${val}' is not in the design system. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }

                // Box shadow validation
                if (prop === 'box-shadow') {
                    if (!tokens.boxShadow.includes(val)) {
                        const suggestedFix = findClosestToken(val, tokens.boxShadow);
                        violations.push({
                            selector: rule.selector,
                            property: prop,
                            value: val,
                            message: `Box shadow '${val}' is not in the design system. Consider using '${suggestedFix}'.`,
                            suggestedFix,
                            line: decl.source?.start?.line,
                            column: decl.source?.start?.column
                        });
                        fixes.push({ original: `${prop}: ${val}`, fixed: `${prop}: ${suggestedFix}` });
                    }
                }
            });

            // Contrast ratio validation
            if (backgroundColor && textColor && 
                tokens.colors.includes(backgroundColor) && tokens.colors.includes(textColor)) {
                const contrastRatio = getContrastRatio(backgroundColor, textColor);
                if (contrastRatio < 4.5) { // WCAG AA standard
                    violations.push({
                        selector: rule.selector,
                        property: 'color contrast',
                        value: `${textColor} on ${backgroundColor}`,
                        message: `Insufficient color contrast (${contrastRatio.toFixed(2)}:1). WCAG AA requires at least 4.5:1 for normal text.`,
                        line: rule.source?.start?.line,
                        column: rule.source?.start?.column
                    });
                }
            }
        });

        // Apply fixes to generate corrected CSS
        fixedCSS = css;
        fixes.forEach(fix => {
            fixedCSS = fixedCSS.replace(fix.original, fix.fixed);
        });

    } catch (error) {
        violations.push({
            selector: 'CSS Parse Error',
            property: 'syntax',
            value: '',
            message: `CSS parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }

    return { violations, fixedCSS };
}