import postcss from 'postcss';
import type { DesignTokens } from '../types/DesignToken';
import { IntelligentTokenMatcher } from './intelligentTokenMatcher';

export type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
    suggestedFix?: string;
    confidence?: number;
    reasoning?: string;
    modernUnit?: string;
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
    const getLuminance = (color: string): number => {
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

export async function validateCSS(css: string, tokens: DesignTokens): Promise<ValidationResult> {
    const violations: Violation[] = [];
    let fixedCSS = css;
    const matcher = new IntelligentTokenMatcher(tokens);

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

            // Second pass: validate properties with intelligent matching
            rule.walkDecls((decl) => {
                const val = decl.value.trim();
                const prop = decl.prop;

                // Skip CSS variables and complex values
                if (val.startsWith('var(') || val.includes('calc(') || val.includes('url(')) {
                    return;
                }

                // Use intelligent token matching
                const matchResult = matcher.findBestMatch(prop, val);
                
                // Only create violation if confidence is reasonable and values are different
                if (matchResult.confidence > 0.3 && matchResult.suggestedValue !== val) {
                    let message = `Value '${val}' could be improved. ${matchResult.reasoning}`;
                    
                    // Add specific WCAG warnings
                    if (prop === 'font-size') {
                        const inputPx = parseFloat(val);
                        if (inputPx < 16 && val.includes('px')) {
                            message += ' ⚠️ WCAG recommends minimum 16px for body text.';
                        }
                    }
                    
                    if (prop === 'line-height') {
                        const inputValue = parseFloat(val);
                        if (inputValue < 1.5) {
                            message += ' ⚠️ WCAG recommends minimum 1.5 line-height for body text.';
                        }
                    }

                    violations.push({
                        selector: rule.selector,
                        property: prop,
                        value: val,
                        message,
                        suggestedFix: matchResult.suggestedValue,
                        confidence: matchResult.confidence,
                        reasoning: matchResult.reasoning,
                        modernUnit: matchResult.modernUnit,
                        line: decl.source?.start?.line,
                        column: decl.source?.start?.column
                    });

                    fixes.push({ 
                        original: `${prop}: ${val}`, 
                        fixed: `${prop}: ${matchResult.suggestedValue}` 
                    });
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