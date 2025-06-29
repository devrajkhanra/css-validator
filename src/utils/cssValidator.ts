import postcss from 'postcss';
import type { DesignTokens } from '../types/DesignToken';

export type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
};

export async function validateCSS(css: string, tokens: DesignTokens): Promise<Violation[]> {
    const violations: Violation[] = [];

    const result = await postcss().process(css, { from: undefined });

    result.root.walkRules((rule) => {
        rule.walkDecls((decl) => {
            const val = decl.value.trim();

            if (decl.prop === "color" && !tokens.colors.includes(val)) {
                violations.push({
                    selector: rule.selector,
                    property: decl.prop,
                    value: val,
                    message: `Invalid color '${val}'. Use one of: ${tokens.colors.join(", ")}`,
                });
            }

            if (decl.prop.includes("margin") || decl.prop.includes("padding")) {
                if (!tokens.spacing.includes(val)) {
                    violations.push({
                        selector: rule.selector,
                        property: decl.prop,
                        value: val,
                        message: `Spacing value '${val}' not in spacing scale: ${tokens.spacing.join(", ")}`,
                    });
                }
            }

            if (decl.prop === "font-size" && !tokens.fontSizes.includes(val)) {
                violations.push({
                    selector: rule.selector,
                    property: decl.prop,
                    value: val,
                    message: `Font size '${val}' not allowed. Use one of: ${tokens.fontSizes.join(", ")}`,
                });
            }
        });
    });

    return violations;
}