import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, Globe, ShoppingBag, User, Briefcase, Camera, Gamepad2, Heart, Sparkles, Zap, Moon, Sun, Layers, Grid, Waves, Mountain, Coffee, Flower } from 'lucide-react';

export type DesignStyle = {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    characteristics: string[];
    colorSchemes: {
        name: string;
        colors: string[];
        description: string;
    }[];
    typography: {
        primary: string;
        secondary: string;
        weights: string[];
    };
    spacing: string[];
    borderRadius: string[];
    category: string;
    popularity: number;
};

const designStyles: DesignStyle[] = [
    // Modern & Contemporary
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Clean, simple, and focused on content with plenty of white space',
        icon: <Monitor className="w-5 h-5" />,
        category: 'Modern',
        popularity: 9,
        characteristics: ['Clean layouts', 'Subtle shadows', 'Neutral colors', 'Simple typography'],
        colorSchemes: [
            {
                name: 'Monochrome',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#6c757d', '#343a40', '#000000'],
                description: 'Pure grayscale for ultimate simplicity'
            },
            {
                name: 'Warm Minimal',
                colors: ['#fefefe', '#f7f5f3', '#e8e6e1', '#d3c7b8', '#a08d7a', '#2c2c2c'],
                description: 'Warm grays with subtle beige undertones'
            }
        ],
        typography: {
            primary: 'Inter, system-ui, sans-serif',
            secondary: 'SF Pro Display, system-ui, sans-serif',
            weights: ['300', '400', '500', '600']
        },
        spacing: ['4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px'],
        borderRadius: ['0', '4px', '8px', '12px']
    },
    {
        id: 'glassmorphism',
        name: 'Glassmorphism',
        description: 'Translucent elements with blur effects and frosted glass aesthetics',
        icon: <Layers className="w-5 h-5" />,
        category: 'Modern',
        popularity: 8,
        characteristics: ['Translucent backgrounds', 'Blur effects', 'Subtle borders', 'Layered depth'],
        colorSchemes: [
            {
                name: 'Glass Light',
                colors: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(0,0,0,0.1)', '#ffffff', '#f8f9fa', '#e9ecef'],
                description: 'Light translucent colors for glass effects'
            },
            {
                name: 'Glass Dark',
                colors: ['rgba(0,0,0,0.2)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', '#1a1a1a', '#2d2d2d', '#ffffff'],
                description: 'Dark translucent colors for night themes'
            }
        ],
        typography: {
            primary: 'SF Pro Display, system-ui, sans-serif',
            secondary: 'Inter, system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['8px', '16px', '24px', '32px', '48px', '64px'],
        borderRadius: ['12px', '16px', '20px', '24px']
    },
    {
        id: 'neumorphism',
        name: 'Neumorphism',
        description: 'Soft, extruded plastic look with subtle shadows and highlights',
        icon: <Sparkles className="w-5 h-5" />,
        category: 'Modern',
        popularity: 6,
        characteristics: ['Soft shadows', 'Subtle highlights', 'Monochromatic', 'Tactile feel'],
        colorSchemes: [
            {
                name: 'Soft Gray',
                colors: ['#e0e5ec', '#ffffff', '#a3b1c6', '#9baacf', '#e0e5ec', '#ffffff'],
                description: 'Soft gray palette for neumorphic elements'
            },
            {
                name: 'Warm Neuro',
                colors: ['#f0f0f3', '#ffffff', '#d1d9e6', '#b8c5d6', '#a8b4c8', '#98a4b8'],
                description: 'Warm tones for friendly neumorphism'
            }
        ],
        typography: {
            primary: 'Nunito, system-ui, sans-serif',
            secondary: 'Open Sans, system-ui, sans-serif',
            weights: ['400', '600', '700']
        },
        spacing: ['8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['16px', '20px', '24px', '32px']
    },
    {
        id: 'brutalist',
        name: 'Brutalist',
        description: 'Bold, raw, and unapologetic design with strong contrasts',
        icon: <Grid className="w-5 h-5" />,
        category: 'Modern',
        popularity: 5,
        characteristics: ['Bold typography', 'High contrast', 'Raw aesthetics', 'Geometric shapes'],
        colorSchemes: [
            {
                name: 'High Contrast',
                colors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'],
                description: 'Maximum contrast for bold statements'
            },
            {
                name: 'Monochrome Brutal',
                colors: ['#000000', '#ffffff', '#333333', '#666666', '#999999', '#cccccc'],
                description: 'Stark monochrome for raw appeal'
            }
        ],
        typography: {
            primary: 'Arial Black, sans-serif',
            secondary: 'Helvetica, sans-serif',
            weights: ['700', '800', '900']
        },
        spacing: ['0', '8px', '16px', '32px', '64px'],
        borderRadius: ['0', '4px']
    },

    // Corporate & Professional
    {
        id: 'modern-corporate',
        name: 'Modern Corporate',
        description: 'Professional and trustworthy with sophisticated color palettes',
        icon: <Briefcase className="w-5 h-5" />,
        category: 'Corporate',
        popularity: 8,
        characteristics: ['Professional layouts', 'Structured grids', 'Corporate colors', 'Clear hierarchy'],
        colorSchemes: [
            {
                name: 'Corporate Blue',
                colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b'],
                description: 'Trust-inspiring blues with clean neutrals'
            },
            {
                name: 'Executive Gray',
                colors: ['#ffffff', '#f1f5f9', '#cbd5e1', '#64748b', '#334155', '#0f172a'],
                description: 'Sophisticated grays for executive presence'
            }
        ],
        typography: {
            primary: 'Roboto, Arial, sans-serif',
            secondary: 'Open Sans, system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['8px', '12px', '16px', '24px', '32px', '48px', '64px'],
        borderRadius: ['4px', '6px', '8px', '12px']
    },
    {
        id: 'financial',
        name: 'Financial Authority',
        description: 'Authoritative design for financial and banking services',
        icon: <Briefcase className="w-5 h-5" />,
        category: 'Corporate',
        popularity: 7,
        characteristics: ['Authority', 'Trust', 'Security', 'Professional'],
        colorSchemes: [
            {
                name: 'Banking Blue',
                colors: ['#ffffff', '#f8fafc', '#1e40af', '#1e3a8a', '#1e293b', '#0f172a'],
                description: 'Authoritative blues for financial trust'
            },
            {
                name: 'Wealth Green',
                colors: ['#ffffff', '#f0fdf4', '#16a34a', '#15803d', '#166534', '#14532d'],
                description: 'Prosperity greens for wealth management'
            }
        ],
        typography: {
            primary: 'Times New Roman, serif',
            secondary: 'Arial, sans-serif',
            weights: ['400', '600', '700']
        },
        spacing: ['8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['4px', '8px', '12px']
    },

    // Creative & Artistic
    {
        id: 'creative-portfolio',
        name: 'Creative Portfolio',
        description: 'Bold and expressive with unique layouts and vibrant colors',
        icon: <Camera className="w-5 h-5" />,
        category: 'Creative',
        popularity: 7,
        characteristics: ['Asymmetric layouts', 'Bold typography', 'Vibrant colors', 'Creative spacing'],
        colorSchemes: [
            {
                name: 'Vibrant Creative',
                colors: ['#ffffff', '#fef3c7', '#f59e0b', '#dc2626', '#7c3aed', '#1f2937'],
                description: 'Bold colors for creative expression'
            },
            {
                name: 'Artistic Palette',
                colors: ['#fefefe', '#fce7f3', '#ec4899', '#8b5cf6', '#3730a3', '#111827'],
                description: 'Artistic purples and magentas'
            }
        ],
        typography: {
            primary: 'Playfair Display, serif',
            secondary: 'Source Sans Pro, sans-serif',
            weights: ['300', '400', '600', '700', '900']
        },
        spacing: ['6px', '12px', '18px', '30px', '48px', '72px', '120px'],
        borderRadius: ['0', '8px', '16px', '24px', '50%']
    },
    {
        id: 'artistic-expression',
        name: 'Artistic Expression',
        description: 'Free-form design with artistic flair and creative elements',
        icon: <Flower className="w-5 h-5" />,
        category: 'Creative',
        popularity: 6,
        characteristics: ['Artistic layouts', 'Creative typography', 'Expressive colors', 'Unique elements'],
        colorSchemes: [
            {
                name: 'Artist Palette',
                colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'],
                description: 'Rich colors for artistic expression'
            },
            {
                name: 'Watercolor',
                colors: ['#fef7ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7'],
                description: 'Soft watercolor-inspired tones'
            }
        ],
        typography: {
            primary: 'Crimson Text, serif',
            secondary: 'Lato, sans-serif',
            weights: ['300', '400', '600', '700']
        },
        spacing: ['4px', '12px', '20px', '36px', '60px', '100px'],
        borderRadius: ['0', '12px', '24px', '50%']
    },

    // Retro & Vintage
    {
        id: 'retro-80s',
        name: 'Retro 80s',
        description: 'Neon colors and geometric patterns from the 1980s',
        icon: <Zap className="w-5 h-5" />,
        category: 'Retro',
        popularity: 6,
        characteristics: ['Neon colors', 'Geometric patterns', 'Bold gradients', 'Synthwave aesthetics'],
        colorSchemes: [
            {
                name: 'Neon Nights',
                colors: ['#000000', '#1a1a2e', '#ff0080', '#00d4ff', '#39ff14', '#ff6600'],
                description: 'Electric neons on dark backgrounds'
            },
            {
                name: 'Synthwave',
                colors: ['#0c0c0c', '#1a1a2e', '#533483', '#7209b7', '#a663cc', '#4deeea'],
                description: 'Synthwave-inspired color palette'
            }
        ],
        typography: {
            primary: 'Orbitron, monospace',
            secondary: 'Rajdhani, sans-serif',
            weights: ['400', '700', '900']
        },
        spacing: ['4px', '8px', '16px', '32px', '64px'],
        borderRadius: ['0', '4px', '8px']
    },
    {
        id: 'vintage-classic',
        name: 'Vintage Classic',
        description: 'Timeless design with classic typography and muted colors',
        icon: <Coffee className="w-5 h-5" />,
        category: 'Retro',
        popularity: 7,
        characteristics: ['Classic typography', 'Muted colors', 'Vintage elements', 'Nostalgic feel'],
        colorSchemes: [
            {
                name: 'Sepia Tones',
                colors: ['#f4e4bc', '#d4a574', '#bc9a6a', '#a47551', '#8b5a3c', '#6b4226'],
                description: 'Warm sepia tones for vintage feel'
            },
            {
                name: 'Faded Glory',
                colors: ['#f5f5dc', '#deb887', '#cd853f', '#a0522d', '#8b4513', '#654321'],
                description: 'Faded colors with nostalgic appeal'
            }
        ],
        typography: {
            primary: 'Merriweather, serif',
            secondary: 'Lora, serif',
            weights: ['300', '400', '700']
        },
        spacing: ['8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['4px', '8px', '16px']
    },

    // Tech & Gaming
    {
        id: 'tech-startup',
        name: 'Tech Startup',
        description: 'Innovative and forward-thinking with modern gradients and tech aesthetics',
        icon: <Smartphone className="w-5 h-5" />,
        category: 'Tech',
        popularity: 8,
        characteristics: ['Modern gradients', 'Tech aesthetics', 'Innovation focus', 'Sleek interfaces'],
        colorSchemes: [
            {
                name: 'Tech Blue',
                colors: ['#ffffff', '#eff6ff', '#3b82f6', '#1d4ed8', '#1e1b4b', '#0f172a'],
                description: 'Modern tech blues with depth'
            },
            {
                name: 'Startup Purple',
                colors: ['#ffffff', '#f3e8ff', '#a855f7', '#7c3aed', '#581c87', '#1c1917'],
                description: 'Innovation-inspiring purples'
            }
        ],
        typography: {
            primary: 'Space Grotesk, system-ui, sans-serif',
            secondary: 'Inter, system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['4px', '8px', '16px', '24px', '40px', '64px', '96px'],
        borderRadius: ['8px', '12px', '16px', '24px']
    },
    {
        id: 'gaming',
        name: 'Gaming',
        description: 'Dynamic and energetic with bold colors and immersive experiences',
        icon: <Gamepad2 className="w-5 h-5" />,
        category: 'Gaming',
        popularity: 7,
        characteristics: ['Bold colors', 'Dynamic layouts', 'Immersive design', 'High energy'],
        colorSchemes: [
            {
                name: 'Neon Gaming',
                colors: ['#0a0a0a', '#1a1a2e', '#16213e', '#00d4ff', '#ff0080', '#ffffff'],
                description: 'Electric neons on dark backgrounds'
            },
            {
                name: 'Retro Arcade',
                colors: ['#1a1a1a', '#2d1b69', '#11998e', '#f38ba8', '#ffd23f', '#ffffff'],
                description: 'Retro arcade-inspired colors'
            }
        ],
        typography: {
            primary: 'Orbitron, monospace',
            secondary: 'Rajdhani, sans-serif',
            weights: ['400', '700', '900']
        },
        spacing: ['4px', '8px', '12px', '20px', '32px', '48px', '80px'],
        borderRadius: ['0', '4px', '8px', '16px', '50%']
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        description: 'Futuristic design with neon accents and dark themes',
        icon: <Zap className="w-5 h-5" />,
        category: 'Gaming',
        popularity: 5,
        characteristics: ['Neon accents', 'Dark themes', 'Futuristic elements', 'High contrast'],
        colorSchemes: [
            {
                name: 'Cyber Neon',
                colors: ['#000000', '#0a0a0a', '#00ff41', '#ff0080', '#00d4ff', '#ffffff'],
                description: 'Bright neons for cyber aesthetics'
            },
            {
                name: 'Matrix Green',
                colors: ['#000000', '#001100', '#003300', '#00ff00', '#00cc00', '#ffffff'],
                description: 'Matrix-inspired green theme'
            }
        ],
        typography: {
            primary: 'Share Tech Mono, monospace',
            secondary: 'Exo 2, sans-serif',
            weights: ['400', '700']
        },
        spacing: ['2px', '4px', '8px', '16px', '32px'],
        borderRadius: ['0', '2px', '4px']
    },

    // E-commerce & Business
    {
        id: 'e-commerce',
        name: 'E-commerce',
        description: 'Conversion-focused with clear CTAs and product-centric design',
        icon: <ShoppingBag className="w-5 h-5" />,
        category: 'Business',
        popularity: 8,
        characteristics: ['Clear CTAs', 'Product focus', 'Trust signals', 'Conversion optimization'],
        colorSchemes: [
            {
                name: 'Commerce Green',
                colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#22c55e', '#15803d', '#1f2937'],
                description: 'Trust-building greens for commerce'
            },
            {
                name: 'Premium Gold',
                colors: ['#ffffff', '#fffbeb', '#fde68a', '#f59e0b', '#92400e', '#1c1917'],
                description: 'Luxury gold tones for premium products'
            }
        ],
        typography: {
            primary: 'Nunito Sans, system-ui, sans-serif',
            secondary: 'Inter, system-ui, sans-serif',
            weights: ['400', '600', '700', '800']
        },
        spacing: ['4px', '8px', '12px', '16px', '24px', '32px', '48px'],
        borderRadius: ['6px', '8px', '12px', '16px']
    },

    // Health & Wellness
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Calming and trustworthy with accessible design and soothing colors',
        icon: <Heart className="w-5 h-5" />,
        category: 'Healthcare',
        popularity: 8,
        characteristics: ['Calming colors', 'Accessible design', 'Trust building', 'Clear information'],
        colorSchemes: [
            {
                name: 'Medical Blue',
                colors: ['#ffffff', '#f0f9ff', '#bae6fd', '#0ea5e9', '#0369a1', '#1e293b'],
                description: 'Calming medical blues'
            },
            {
                name: 'Wellness Green',
                colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#10b981', '#047857', '#1f2937'],
                description: 'Healing and wellness greens'
            }
        ],
        typography: {
            primary: 'Source Sans Pro, system-ui, sans-serif',
            secondary: 'Open Sans, system-ui, sans-serif',
            weights: ['400', '600', '700']
        },
        spacing: ['8px', '16px', '24px', '32px', '48px', '64px'],
        borderRadius: ['8px', '12px', '16px']
    },

    // Media & Content
    {
        id: 'news-media',
        name: 'News & Media',
        description: 'Content-focused with excellent readability and information hierarchy',
        icon: <Globe className="w-5 h-5" />,
        category: 'Media',
        popularity: 7,
        characteristics: ['Content focus', 'Readability', 'Information hierarchy', 'News layout'],
        colorSchemes: [
            {
                name: 'News Classic',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#495057', '#212529', '#000000'],
                description: 'Classic news colors for readability'
            },
            {
                name: 'Modern Media',
                colors: ['#ffffff', '#f1f5f9', '#cbd5e1', '#475569', '#1e293b', '#0f172a'],
                description: 'Modern media with subtle blues'
            }
        ],
        typography: {
            primary: 'Georgia, serif',
            secondary: 'system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['4px', '8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['0', '4px', '6px']
    },

    // Dark Themes
    {
        id: 'dark-mode-pro',
        name: 'Dark Mode Pro',
        description: 'Professional dark theme with excellent contrast and readability',
        icon: <Moon className="w-5 h-5" />,
        category: 'Dark',
        popularity: 9,
        characteristics: ['Dark backgrounds', 'High contrast', 'Eye-friendly', 'Professional'],
        colorSchemes: [
            {
                name: 'Pro Dark',
                colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9'],
                description: 'Professional dark mode colors'
            },
            {
                name: 'Midnight',
                colors: ['#000000', '#111111', '#222222', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'],
                description: 'Deep midnight theme'
            }
        ],
        typography: {
            primary: 'Inter, system-ui, sans-serif',
            secondary: 'SF Pro Display, system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['4px', '8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['6px', '8px', '12px', '16px']
    },

    // Nature & Organic
    {
        id: 'nature-organic',
        name: 'Nature Organic',
        description: 'Earth-inspired design with natural colors and organic shapes',
        icon: <Mountain className="w-5 h-5" />,
        category: 'Nature',
        popularity: 6,
        characteristics: ['Natural colors', 'Organic shapes', 'Earth tones', 'Sustainable feel'],
        colorSchemes: [
            {
                name: 'Forest Earth',
                colors: ['#fefdfb', '#f7f3f0', '#8b7355', '#6b5b47', '#4a3f35', '#2d2520'],
                description: 'Natural earth tones'
            },
            {
                name: 'Ocean Breeze',
                colors: ['#f0fdfa', '#ccfbf1', '#5eead4', '#14b8a6', '#0d9488', '#134e4a'],
                description: 'Ocean-inspired blues and teals'
            }
        ],
        typography: {
            primary: 'Merriweather, serif',
            secondary: 'Source Sans Pro, sans-serif',
            weights: ['300', '400', '600', '700']
        },
        spacing: ['6px', '12px', '20px', '32px', '52px', '84px'],
        borderRadius: ['8px', '16px', '24px', '32px']
    },

    // Luxury & Premium
    {
        id: 'luxury-premium',
        name: 'Luxury Premium',
        description: 'Sophisticated design for high-end brands and luxury products',
        icon: <Sparkles className="w-5 h-5" />,
        category: 'Luxury',
        popularity: 7,
        characteristics: ['Sophisticated colors', 'Premium feel', 'Elegant typography', 'Refined details'],
        colorSchemes: [
            {
                name: 'Gold Luxury',
                colors: ['#ffffff', '#fffbeb', '#fde68a', '#f59e0b', '#92400e', '#000000'],
                description: 'Luxurious gold and black'
            },
            {
                name: 'Platinum Elite',
                colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#94a3b8', '#475569', '#1e293b'],
                description: 'Sophisticated platinum tones'
            }
        ],
        typography: {
            primary: 'Playfair Display, serif',
            secondary: 'Montserrat, sans-serif',
            weights: ['300', '400', '600', '700']
        },
        spacing: ['8px', '16px', '32px', '48px', '64px', '96px'],
        borderRadius: ['0', '4px', '8px', '16px']
    },

    // Playful & Fun
    {
        id: 'playful-fun',
        name: 'Playful Fun',
        description: 'Vibrant and energetic design for youth-oriented brands',
        icon: <Sun className="w-5 h-5" />,
        category: 'Playful',
        popularity: 6,
        characteristics: ['Vibrant colors', 'Playful elements', 'Fun typography', 'Energetic feel'],
        colorSchemes: [
            {
                name: 'Rainbow Bright',
                colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'],
                description: 'Bright rainbow colors'
            },
            {
                name: 'Candy Pop',
                colors: ['#ff9ff3', '#f368e0', '#bf95f9', '#9775fa', '#845ef7', '#7950f2'],
                description: 'Sweet candy-inspired colors'
            }
        ],
        typography: {
            primary: 'Fredoka One, cursive',
            secondary: 'Nunito, sans-serif',
            weights: ['400', '600', '700']
        },
        spacing: ['4px', '12px', '20px', '32px', '48px', '72px'],
        borderRadius: ['12px', '20px', '32px', '50%']
    }
];

type Props = {
    onStyleSelect: (style: DesignStyle) => void;
    selectedStyleId?: string;
};

const DesignStyleSelector: React.FC<Props> = ({ onStyleSelect, selectedStyleId }) => {
    const [expandedStyle, setExpandedStyle] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(designStyles.map(style => style.category)))];
    const filteredStyles = selectedCategory === 'all' 
        ? designStyles 
        : designStyles.filter(style => style.category === selectedCategory);

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                    <Palette className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Design Style</h2>
                    <p className="text-sm text-gray-500">Choose from 20+ design directions</p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            selectedCategory === category
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {category === 'all' ? 'All Styles' : category}
                    </button>
                ))}
            </div>

            <div className="grid gap-3 max-h-96 overflow-y-auto scrollbar-thin">
                {filteredStyles.map((style) => (
                    <div key={style.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => {
                                onStyleSelect(style);
                                setExpandedStyle(expandedStyle === style.id ? null : style.id);
                            }}
                            className={`w-full p-4 text-left transition-all ${
                                selectedStyleId === style.id
                                    ? 'bg-indigo-50 border-indigo-200'
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    selectedStyleId === style.id 
                                        ? 'bg-indigo-100 text-indigo-600' 
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {style.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-800">{style.name}</h3>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            {style.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-gray-500">{style.popularity}/10</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{style.description}</p>
                                </div>
                                {selectedStyleId === style.id && (
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                )}
                            </div>
                        </button>

                        {expandedStyle === style.id && (
                            <div className="p-4 bg-gray-50/50 border-t border-gray-200 space-y-4">
                                {/* Characteristics */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Characteristics</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {style.characteristics.map((char, index) => (
                                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Schemes */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Color Schemes</h4>
                                    <div className="space-y-2">
                                        {style.colorSchemes.map((scheme, index) => (
                                            <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">{scheme.name}</span>
                                                    <div className="flex gap-1">
                                                        {scheme.colors.slice(0, 6).map((color, colorIndex) => (
                                                            <div
                                                                key={colorIndex}
                                                                className="w-4 h-4 rounded border border-gray-300"
                                                                style={{ backgroundColor: color.includes('rgba') ? color : color }}
                                                                title={color}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600">{scheme.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Typography */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Typography</h4>
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                        <div className="text-sm space-y-1">
                                            <div><span className="text-gray-600">Primary:</span> <code className="text-xs bg-gray-100 px-1 rounded">{style.typography.primary}</code></div>
                                            <div><span className="text-gray-600">Secondary:</span> <code className="text-xs bg-gray-100 px-1 rounded">{style.typography.secondary}</code></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-600">Weights:</span>
                                                <div className="flex gap-1">
                                                    {style.typography.weights.map((weight, index) => (
                                                        <span key={index} className="text-xs bg-gray-100 px-1 rounded">{weight}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignStyleSelector;