import type { DesignTokens } from '../types/DesignToken';

export interface DesignTrend {
    id: string;
    name: string;
    description: string;
    category: 'color' | 'typography' | 'spacing' | 'layout' | 'interaction';
    popularity: number; // 1-10 scale
    tokens: Partial<DesignTokens>;
    examples: string[];
    inspiration: {
        source: 'dribbble' | 'behance' | 'awwwards' | 'design-systems';
        keywords: string[];
        styleGuide: string;
    };
}

export interface DesignSuggestion {
    trend: DesignTrend;
    applicability: number; // How well it fits the current project
    reasoning: string;
    implementation: string[];
}

export class DesignInspirationSystem {
    private currentTrends: DesignTrend[] = [
        {
            id: 'glassmorphism-2024',
            name: 'Glassmorphism & Frosted Glass',
            description: 'Translucent elements with blur effects and subtle borders',
            category: 'layout',
            popularity: 9,
            tokens: {
                colors: [
                    'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)', 
                    'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.05)'
                ],
                borderRadius: ['12px', '16px', '20px', '24px'],
                boxShadow: [
                    '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
                    '0 4px 16px 0 rgba(31, 38, 135, 0.2)'
                ]
            },
            examples: [
                'backdrop-filter: blur(10px)',
                'border: 1px solid rgba(255, 255, 255, 0.18)',
                'background: rgba(255, 255, 255, 0.1)'
            ],
            inspiration: {
                source: 'dribbble',
                keywords: ['glassmorphism', 'frosted glass', 'translucent', 'blur'],
                styleGuide: 'Apple Design Language, iOS interfaces'
            }
        },
        {
            id: 'brutalist-typography',
            name: 'Bold Brutalist Typography',
            description: 'Strong, impactful typography with high contrast and bold weights',
            category: 'typography',
            popularity: 8,
            tokens: {
                fontSizes: ['48px', '56px', '64px', '72px', '96px', '128px'],
                fontWeights: ['700', '800', '900'],
                lineHeights: ['0.9', '1.0', '1.1'],
                colors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff']
            },
            examples: [
                'font-weight: 900',
                'font-size: 4rem',
                'line-height: 0.9',
                'letter-spacing: -0.02em'
            ],
            inspiration: {
                source: 'behance',
                keywords: ['brutalism', 'bold typography', 'high contrast', 'impact'],
                styleGuide: 'Brutalist web design, Swiss typography'
            }
        },
        {
            id: 'soft-minimalism',
            name: 'Soft Minimalism',
            description: 'Clean layouts with subtle shadows, rounded corners, and muted colors',
            category: 'layout',
            popularity: 9,
            tokens: {
                colors: [
                    '#f8f9fa', '#f1f3f4', '#e8eaed', '#dadce0',
                    '#9aa0a6', '#5f6368', '#3c4043', '#202124'
                ],
                spacing: ['4px', '8px', '12px', '16px', '24px', '32px', '48px'],
                borderRadius: ['8px', '12px', '16px'],
                boxShadow: [
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    '0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                ]
            },
            examples: [
                'padding: 1.5rem',
                'border-radius: 0.75rem',
                'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            ],
            inspiration: {
                source: 'dribbble',
                keywords: ['minimalism', 'clean', 'subtle', 'soft shadows'],
                styleGuide: 'Google Material Design, Notion interface'
            }
        },
        {
            id: 'vibrant-gradients',
            name: 'Vibrant Gradient Systems',
            description: 'Rich, saturated gradients with smooth transitions',
            category: 'color',
            popularity: 7,
            tokens: {
                colors: [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                ]
            },
            examples: [
                'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'background-clip: text',
                '-webkit-text-fill-color: transparent'
            ],
            inspiration: {
                source: 'dribbble',
                keywords: ['gradients', 'vibrant', 'colorful', 'modern'],
                styleGuide: 'Instagram branding, Spotify interface'
            }
        },
        {
            id: 'micro-interactions',
            name: 'Subtle Micro-interactions',
            description: 'Smooth transitions and hover effects that enhance user experience',
            category: 'interaction',
            popularity: 10,
            tokens: {
                // CSS custom properties for animations
                colors: ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)']
            },
            examples: [
                'transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                'transform: translateY(-2px)',
                'box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15)'
            ],
            inspiration: {
                source: 'awwwards',
                keywords: ['micro-interactions', 'smooth', 'transitions', 'hover'],
                styleGuide: 'Framer Motion, Apple interfaces'
            }
        },
        {
            id: 'accessible-contrast',
            name: 'High Contrast Accessibility',
            description: 'WCAG AAA compliant color schemes with excellent readability',
            category: 'color',
            popularity: 8,
            tokens: {
                colors: [
                    '#000000', '#ffffff', // Pure contrast
                    '#1a1a1a', '#f5f5f5', // Near pure with softer feel
                    '#2d3748', '#f7fafc', // Accessible grays
                    '#1a202c', '#edf2f7', // Dark mode friendly
                    '#0066cc', '#ffffff', // Accessible blue
                    '#d63384', '#ffffff', // Accessible pink
                    '#198754', '#ffffff', // Accessible green
                ]
            },
            examples: [
                'color: #000000',
                'background-color: #ffffff',
                'contrast-ratio: 21:1'
            ],
            inspiration: {
                source: 'design-systems',
                keywords: ['accessibility', 'WCAG', 'contrast', 'inclusive'],
                styleGuide: 'GOV.UK Design System, IBM Carbon'
            }
        },
        {
            id: 'fluid-typography',
            name: 'Fluid Typography Scale',
            description: 'Responsive typography that scales smoothly across devices',
            category: 'typography',
            popularity: 9,
            tokens: {
                fontSizes: [
                    'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',      // Body text
                    'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',        // Small heading
                    'clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)',    // Medium heading
                    'clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem)',     // Large heading
                    'clamp(2.5rem, 2rem + 2.5vw, 4rem)',           // Display heading
                ],
                lineHeights: ['1.4', '1.5', '1.6']
            },
            examples: [
                'font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',
                'line-height: 1.5'
            ],
            inspiration: {
                source: 'design-systems',
                keywords: ['fluid', 'responsive', 'clamp', 'viewport'],
                styleGuide: 'Modern CSS, Utopia design system'
            }
        }
    ];

    // Analyze current project and suggest relevant design trends
    analyzeProject(tokens: DesignTokens, projectType: 'dashboard' | 'landing' | 'app' | 'portfolio' | 'ecommerce' = 'app'): DesignSuggestion[] {
        const suggestions: DesignSuggestion[] = [];

        for (const trend of this.currentTrends) {
            const applicability = this.calculateApplicability(trend, tokens, projectType);
            
            if (applicability > 0.3) {
                suggestions.push({
                    trend,
                    applicability,
                    reasoning: this.generateReasoning(trend, tokens, projectType),
                    implementation: this.generateImplementation(trend, tokens)
                });
            }
        }

        // Sort by applicability and popularity
        return suggestions.sort((a, b) => 
            (b.applicability * b.trend.popularity) - (a.applicability * a.trend.popularity)
        );
    }

    private calculateApplicability(trend: DesignTrend, currentTokens: DesignTokens, projectType: string): number {
        let score = 0.5; // Base score

        // Project type relevance
        const projectRelevance = this.getProjectRelevance(trend, projectType);
        score *= projectRelevance;

        // Current token compatibility
        const tokenCompatibility = this.getTokenCompatibility(trend, currentTokens);
        score *= tokenCompatibility;

        // Trend popularity factor
        score *= (trend.popularity / 10);

        return Math.min(score, 1.0);
    }

    private getProjectRelevance(trend: DesignTrend, projectType: string): number {
        const relevanceMap: { [key: string]: { [key: string]: number } } = {
            'glassmorphism-2024': {
                'dashboard': 0.9,
                'app': 0.8,
                'landing': 0.7,
                'portfolio': 0.6,
                'ecommerce': 0.5
            },
            'brutalist-typography': {
                'portfolio': 0.9,
                'landing': 0.8,
                'app': 0.4,
                'dashboard': 0.3,
                'ecommerce': 0.5
            },
            'soft-minimalism': {
                'dashboard': 0.9,
                'app': 0.9,
                'ecommerce': 0.8,
                'landing': 0.7,
                'portfolio': 0.6
            },
            'accessible-contrast': {
                'dashboard': 1.0,
                'app': 1.0,
                'ecommerce': 0.9,
                'landing': 0.8,
                'portfolio': 0.7
            }
        };

        return relevanceMap[trend.id]?.[projectType] || 0.5;
    }

    private getTokenCompatibility(trend: DesignTrend, currentTokens: DesignTokens): number {
        let compatibility = 0.5;

        // Check if current tokens align with trend tokens
        if (trend.tokens.colors) {
            const colorOverlap = this.calculateOverlap(currentTokens.colors, trend.tokens.colors);
            compatibility += colorOverlap * 0.3;
        }

        if (trend.tokens.spacing) {
            const spacingOverlap = this.calculateOverlap(currentTokens.spacing, trend.tokens.spacing);
            compatibility += spacingOverlap * 0.2;
        }

        if (trend.tokens.fontSizes) {
            const fontOverlap = this.calculateOverlap(currentTokens.fontSizes, trend.tokens.fontSizes);
            compatibility += fontOverlap * 0.2;
        }

        return Math.min(compatibility, 1.0);
    }

    private calculateOverlap(current: string[], trend: string[]): number {
        const intersection = current.filter(item => trend.includes(item));
        return intersection.length / Math.max(current.length, trend.length);
    }

    private generateReasoning(trend: DesignTrend, tokens: DesignTokens, projectType: string): string {
        const reasons = [];

        reasons.push(`${trend.name} is trending with ${trend.popularity}/10 popularity`);
        reasons.push(`Well-suited for ${projectType} projects`);
        reasons.push(`Inspired by ${trend.inspiration.source} designs`);
        
        if (trend.category === 'color') {
            reasons.push('Enhances visual hierarchy and brand identity');
        } else if (trend.category === 'typography') {
            reasons.push('Improves readability and content hierarchy');
        } else if (trend.category === 'layout') {
            reasons.push('Creates modern, engaging user interfaces');
        }

        return reasons.join('. ') + '.';
    }

    private generateImplementation(trend: DesignTrend, currentTokens: DesignTokens): string[] {
        const implementation = [];

        implementation.push(`Apply ${trend.name} principles to your design system`);
        
        if (trend.tokens.colors) {
            implementation.push('Update color palette with trend-inspired values');
        }
        
        if (trend.tokens.spacing) {
            implementation.push('Adjust spacing scale for better visual rhythm');
        }
        
        if (trend.tokens.fontSizes) {
            implementation.push('Implement responsive typography scale');
        }

        implementation.push(...trend.examples.map(example => `CSS: ${example}`));

        return implementation;
    }

    // Get specific trend by ID
    getTrend(id: string): DesignTrend | undefined {
        return this.currentTrends.find(trend => trend.id === id);
    }

    // Get trends by category
    getTrendsByCategory(category: DesignTrend['category']): DesignTrend[] {
        return this.currentTrends.filter(trend => trend.category === category);
    }

    // Get most popular trends
    getPopularTrends(limit: number = 5): DesignTrend[] {
        return this.currentTrends
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit);
    }
}