import type { DesignTokens } from '../types/DesignToken';

export interface TokenMatchResult {
    suggestedValue: string;
    confidence: number;
    reasoning: string;
    modernUnit: string;
}

export class IntelligentTokenMatcher {
    private tokens: DesignTokens;

    constructor(tokens: DesignTokens) {
        this.tokens = tokens;
    }

    // Convert px to rem (16px = 1rem base)
    private pxToRem(pxValue: number): string {
        return `${(pxValue / 16).toFixed(3).replace(/\.?0+$/, '')}rem`;
    }

    // Convert rem to px for comparison
    private remToPx(remValue: number): number {
        return remValue * 16;
    }

    // Extract numeric value and unit from CSS value
    private parseValue(value: string): { number: number; unit: string; originalValue: string } {
        const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
        if (!match) return { number: 0, unit: '', originalValue: value };
        
        return {
            number: parseFloat(match[1]),
            unit: match[2].trim() || 'px',
            originalValue: value
        };
    }

    // Convert all values to px for comparison
    private normalizeValueToPx(value: string): number {
        const parsed = this.parseValue(value);
        
        switch (parsed.unit) {
            case 'rem':
                return this.remToPx(parsed.number);
            case 'em':
                return parsed.number * 16; // Approximate, assuming 16px base
            case 'px':
                return parsed.number;
            case '%':
                return parsed.number; // Keep as-is for percentage matching
            case 'vh':
            case 'vw':
                return parsed.number; // Keep as-is for viewport units
            default:
                return parsed.number;
        }
    }

    // Determine if a property should use modern CSS units
    private shouldUseModernUnits(property: string, value: string): boolean {
        const parsed = this.parseValue(value);
        
        // Very small values (borders, outlines) should stay in px
        if (parsed.number <= 2 && parsed.unit === 'px') {
            return false;
        }
        
        // Font sizes should generally use rem for accessibility
        if (property === 'font-size') {
            return true;
        }
        
        // Spacing properties benefit from rem for scalability
        if (this.isSpacingProperty(property)) {
            return parsed.number > 2; // Keep small values in px
        }
        
        // Border radius can use rem for larger values
        if (property.includes('border-radius')) {
            return parsed.number > 4;
        }
        
        return false;
    }

    // Find closest spacing token with intelligent matching
    findClosestSpacing(inputValue: string): TokenMatchResult {
        const inputPx = this.normalizeValueToPx(inputValue);
        const inputParsed = this.parseValue(inputValue);
        
        // Convert all spacing tokens to px for comparison
        const spacingInPx = this.tokens.spacing.map(token => ({
            token,
            pxValue: this.normalizeValueToPx(token),
            originalToken: token
        }));

        // Find closest match by absolute difference
        const closest = spacingInPx.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev.pxValue - inputPx);
            const currDiff = Math.abs(curr.pxValue - inputPx);
            return currDiff < prevDiff ? curr : prev;
        });

        const closestPx = closest.pxValue;
        
        // Determine the best unit format based on modern standards
        let suggestedValue: string;
        let modernUnit: string;
        let reasoning: string;

        // Modern CSS unit preferences based on context
        if (closestPx <= 2) {
            // Very small values stay in px for precision
            suggestedValue = `${closestPx}px`;
            modernUnit = 'px';
            reasoning = 'Small values (≤2px) kept in pixels for precision (borders, fine details)';
        } else if (inputParsed.unit === 'rem' || inputParsed.unit === 'em') {
            // If input was already in rem/em, suggest rem
            suggestedValue = this.pxToRem(closestPx);
            modernUnit = 'rem';
            reasoning = 'Converted to rem for better accessibility and user preference scaling';
        } else if (closestPx >= 16) {
            // Larger spacing values benefit from rem
            suggestedValue = this.pxToRem(closestPx);
            modernUnit = 'rem';
            reasoning = 'Larger spacing values use rem for better scalability and accessibility';
        } else {
            // Medium values can stay in px or convert to rem based on context
            if (this.shouldUseModernUnits('spacing', inputValue)) {
                suggestedValue = this.pxToRem(closestPx);
                modernUnit = 'rem';
                reasoning = 'Converted to rem for consistent scaling across devices';
            } else {
                suggestedValue = `${closestPx}px`;
                modernUnit = 'px';
                reasoning = 'Kept in pixels for precise control';
            }
        }

        const confidence = this.calculateConfidence(inputPx, closestPx);

        return {
            suggestedValue,
            confidence,
            reasoning,
            modernUnit
        };
    }

    // Find closest font size with intelligent matching
    findClosestFontSize(inputValue: string): TokenMatchResult {
        const inputPx = this.normalizeValueToPx(inputValue);
        const inputParsed = this.parseValue(inputValue);
        
        // Convert all font size tokens to px for comparison
        const fontSizesInPx = this.tokens.fontSizes.map(token => ({
            token,
            pxValue: this.normalizeValueToPx(token),
            originalToken: token
        }));

        // Find closest match
        const closest = fontSizesInPx.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev.pxValue - inputPx);
            const currDiff = Math.abs(curr.pxValue - inputPx);
            return currDiff < prevDiff ? curr : prev;
        });

        const closestPx = closest.pxValue;
        
        // Font sizes should generally be in rem for accessibility
        let suggestedValue: string;
        let modernUnit: string;
        let reasoning: string;

        // Modern typography best practices
        if (inputParsed.unit === 'px' && closestPx < 14) {
            // Very small font sizes - warn about accessibility but keep in px if needed
            suggestedValue = `${closestPx}px`;
            modernUnit = 'px';
            reasoning = 'Small font size - consider accessibility (WCAG recommends ≥16px for body text)';
        } else if (inputParsed.unit === 'px' && closestPx >= 14) {
            // Convert larger px font sizes to rem for better accessibility
            suggestedValue = this.pxToRem(closestPx);
            modernUnit = 'rem';
            reasoning = 'Converted to rem for better accessibility and user preference scaling';
        } else if (inputParsed.unit === 'rem' || inputParsed.unit === 'em') {
            // Already in relative units - keep in rem
            suggestedValue = this.pxToRem(closestPx);
            modernUnit = 'rem';
            reasoning = 'Maintained in rem for accessibility and scalability';
        } else {
            // Default to rem for modern typography
            suggestedValue = this.pxToRem(closestPx);
            modernUnit = 'rem';
            reasoning = 'Converted to rem following modern typography best practices';
        }

        const confidence = this.calculateConfidence(inputPx, closestPx);

        return {
            suggestedValue,
            confidence,
            reasoning,
            modernUnit
        };
    }

    // Find closest border radius
    findClosestBorderRadius(inputValue: string): TokenMatchResult {
        const inputPx = this.normalizeValueToPx(inputValue);
        const inputParsed = this.parseValue(inputValue);
        
        const borderRadiusInPx = this.tokens.borderRadius.map(token => ({
            token,
            pxValue: token === '9999px' ? 9999 : this.normalizeValueToPx(token),
            originalToken: token
        }));

        const closest = borderRadiusInPx.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev.pxValue - inputPx);
            const currDiff = Math.abs(curr.pxValue - inputPx);
            return currDiff < prevDiff ? curr : prev;
        });

        let suggestedValue: string;
        let modernUnit: string;
        let reasoning: string;

        if (closest.originalToken === '9999px') {
            suggestedValue = '9999px';
            modernUnit = 'px';
            reasoning = 'Large radius for fully rounded elements (pills, circles)';
        } else if (closest.pxValue <= 4) {
            suggestedValue = `${closest.pxValue}px`;
            modernUnit = 'px';
            reasoning = 'Small radius values kept in pixels for precise control';
        } else if (inputParsed.unit === 'rem' || this.shouldUseModernUnits('border-radius', inputValue)) {
            suggestedValue = this.pxToRem(closest.pxValue);
            modernUnit = 'rem';
            reasoning = 'Converted to rem for consistent scaling with typography';
        } else {
            suggestedValue = `${closest.pxValue}px`;
            modernUnit = 'px';
            reasoning = 'Kept in pixels for precise visual control';
        }

        const confidence = this.calculateConfidence(inputPx, closest.pxValue);

        return {
            suggestedValue,
            confidence,
            reasoning,
            modernUnit
        };
    }

    // Find closest line height
    findClosestLineHeight(inputValue: string): TokenMatchResult {
        const inputNumber = parseFloat(inputValue);
        
        const lineHeights = this.tokens.lineHeights.map(token => parseFloat(token));
        const closest = lineHeights.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev - inputNumber);
            const currDiff = Math.abs(curr - inputNumber);
            return currDiff < prevDiff ? curr : prev;
        });

        const suggestedValue = closest.toString();
        const confidence = this.calculateConfidence(inputNumber, closest);

        return {
            suggestedValue,
            confidence,
            reasoning: 'Unitless line-height values are preferred for better inheritance and accessibility',
            modernUnit: 'unitless'
        };
    }

    // Find closest font weight
    findClosestFontWeight(inputValue: string): TokenMatchResult {
        const inputNumber = parseInt(inputValue);
        
        const fontWeights = this.tokens.fontWeights.map(token => parseInt(token));
        const closest = fontWeights.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev - inputNumber);
            const currDiff = Math.abs(curr - inputNumber);
            return currDiff < prevDiff ? curr : prev;
        });

        const suggestedValue = closest.toString();
        const confidence = this.calculateConfidence(inputNumber, closest);

        return {
            suggestedValue,
            confidence,
            reasoning: 'Standardized font weight values ensure consistent typography across browsers',
            modernUnit: 'numeric'
        };
    }

    // Find closest color (exact match required for colors)
    findClosestColor(inputValue: string): TokenMatchResult {
        const normalizedInput = inputValue.toLowerCase().trim();
        
        // Check for exact match first
        const exactMatch = this.tokens.colors.find(color => 
            color.toLowerCase() === normalizedInput
        );

        if (exactMatch) {
            return {
                suggestedValue: exactMatch,
                confidence: 1.0,
                reasoning: 'Exact color match found in design system',
                modernUnit: 'hex'
            };
        }

        // For colors, we should be more conservative and suggest the closest semantic color
        // This is a simplified approach - in production, you'd want proper color space calculations
        const suggestedValue = this.tokens.colors[0]; // Default to first color
        
        return {
            suggestedValue,
            confidence: 0.3,
            reasoning: 'No exact color match - please review design system colors manually for brand consistency',
            modernUnit: 'hex'
        };
    }

    // Calculate confidence score based on how close the match is
    private calculateConfidence(inputValue: number, suggestedValue: number): number {
        const difference = Math.abs(inputValue - suggestedValue);
        const average = (inputValue + suggestedValue) / 2;
        const percentageDiff = average === 0 ? 0 : (difference / average) * 100;
        
        // Confidence decreases as percentage difference increases
        if (percentageDiff === 0) return 1.0;
        if (percentageDiff <= 5) return 0.95;
        if (percentageDiff <= 10) return 0.85;
        if (percentageDiff <= 20) return 0.70;
        if (percentageDiff <= 50) return 0.50;
        return 0.30;
    }

    // Main method to find appropriate token based on property type
    findBestMatch(property: string, value: string): TokenMatchResult {
        // Skip CSS variables, calc(), url(), and other complex values
        if (value.startsWith('var(') || value.includes('calc(') || value.includes('url(') || 
            value.includes('linear-gradient') || value.includes('radial-gradient')) {
            return {
                suggestedValue: value,
                confidence: 0.0,
                reasoning: 'Complex CSS value - skipping intelligent matching',
                modernUnit: 'complex'
            };
        }

        // Spacing properties
        if (this.isSpacingProperty(property)) {
            return this.findClosestSpacing(value);
        }
        
        // Font size
        if (property === 'font-size') {
            return this.findClosestFontSize(value);
        }
        
        // Line height
        if (property === 'line-height') {
            return this.findClosestLineHeight(value);
        }
        
        // Font weight
        if (property === 'font-weight') {
            return this.findClosestFontWeight(value);
        }
        
        // Border radius
        if (property.includes('border-radius')) {
            return this.findClosestBorderRadius(value);
        }
        
        // Colors
        if (this.isColorProperty(property)) {
            return this.findClosestColor(value);
        }
        
        // Default fallback
        return {
            suggestedValue: value,
            confidence: 0.0,
            reasoning: 'Property type not recognized for intelligent matching',
            modernUnit: 'unknown'
        };
    }

    private isSpacingProperty(property: string): boolean {
        return property.includes('margin') || property.includes('padding') || 
               property === 'gap' || property.includes('top') || 
               property.includes('right') || property.includes('bottom') || 
               property.includes('left') || property === 'width' || 
               property === 'height' || property.includes('inset');
    }

    private isColorProperty(property: string): boolean {
        return property === 'color' || property === 'background-color' || 
               property.includes('border-color') || property.includes('outline-color');
    }
}