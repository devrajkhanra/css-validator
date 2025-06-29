import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, Globe, ShoppingBag, Briefcase, Camera, Gamepad2, Heart, Sparkles, Zap, Moon, Layers, Grid, Mountain, Coffee } from 'lucide-react';

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
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Clean, simple design with plenty of white space',
        icon: <Monitor className="w-5 h-5" />,
        category: 'Modern',
        popularity: 9,
        characteristics: ['Clean layouts', 'White space', 'Simple typography', 'Subtle colors'],
        colorSchemes: [
            {
                name: 'Pure Minimal',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#495057', '#343a40', '#212529'],
                description: 'Clean grayscale palette'
            }
        ],
        typography: {
            primary: 'Inter, system-ui, sans-serif',
            secondary: 'SF Pro Display, system-ui, sans-serif',
            weights: ['300', '400', '500', '600']
        },
        spacing: ['4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px'],
        borderRadius: ['0px', '4px', '8px', '12px']
    },
    {
        id: 'glassmorphism',
        name: 'Glassmorphism',
        description: 'Translucent glass-like elements with blur effects',
        icon: <Layers className="w-5 h-5" />,
        category: 'Modern',
        popularity: 8,
        characteristics: ['Glass effects', 'Blur backgrounds', 'Translucent elements', 'Layered depth'],
        colorSchemes: [
            {
                name: 'Glass Light',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#adb5bd', '#6c757d', '#495057', '#343a40'],
                description: 'Light colors for glass effects'
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
        id: 'dark-mode',
        name: 'Dark Mode Pro',
        description: 'Professional dark theme with excellent contrast',
        icon: <Moon className="w-5 h-5" />,
        category: 'Dark',
        popularity: 9,
        characteristics: ['Dark backgrounds', 'High contrast', 'Eye-friendly', 'Professional'],
        colorSchemes: [
            {
                name: 'Pro Dark',
                colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9'],
                description: 'Professional dark mode colors'
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
    {
        id: 'corporate',
        name: 'Corporate Professional',
        description: 'Professional design for business applications',
        icon: <Briefcase className="w-5 h-5" />,
        category: 'Business',
        popularity: 8,
        characteristics: ['Professional', 'Trustworthy', 'Clean hierarchy', 'Business colors'],
        colorSchemes: [
            {
                name: 'Corporate Blue',
                colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b', '#0f172a', '#000000'],
                description: 'Professional blue palette'
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
        id: 'creative',
        name: 'Creative Portfolio',
        description: 'Bold and expressive design for creative work',
        icon: <Camera className="w-5 h-5" />,
        category: 'Creative',
        popularity: 7,
        characteristics: ['Bold colors', 'Creative layouts', 'Artistic typography', 'Expressive'],
        colorSchemes: [
            {
                name: 'Creative Vibrant',
                colors: ['#ffffff', '#fef3c7', '#f59e0b', '#dc2626', '#7c3aed', '#1f2937', '#111827', '#000000'],
                description: 'Vibrant creative palette'
            }
        ],
        typography: {
            primary: 'Playfair Display, serif',
            secondary: 'Source Sans Pro, sans-serif',
            weights: ['300', '400', '600', '700', '900']
        },
        spacing: ['6px', '12px', '18px', '30px', '48px', '72px', '120px'],
        borderRadius: ['0px', '8px', '16px', '24px']
    },
    {
        id: 'tech-startup',
        name: 'Tech Startup',
        description: 'Modern tech aesthetic with innovation focus',
        icon: <Smartphone className="w-5 h-5" />,
        category: 'Tech',
        popularity: 8,
        characteristics: ['Modern gradients', 'Tech aesthetics', 'Innovation', 'Sleek design'],
        colorSchemes: [
            {
                name: 'Tech Blue',
                colors: ['#ffffff', '#eff6ff', '#3b82f6', '#1d4ed8', '#1e1b4b', '#0f172a', '#020617', '#000000'],
                description: 'Modern tech blue palette'
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
        id: 'ecommerce',
        name: 'E-commerce',
        description: 'Conversion-focused design for online stores',
        icon: <ShoppingBag className="w-5 h-5" />,
        category: 'Business',
        popularity: 8,
        characteristics: ['Clear CTAs', 'Product focus', 'Trust signals', 'Conversion optimized'],
        colorSchemes: [
            {
                name: 'Commerce Green',
                colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#22c55e', '#15803d', '#166534', '#14532d', '#052e16'],
                description: 'Trust-building green palette'
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
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Calming and trustworthy design for medical applications',
        icon: <Heart className="w-5 h-5" />,
        category: 'Healthcare',
        popularity: 8,
        characteristics: ['Calming colors', 'Accessible', 'Trust building', 'Clear information'],
        colorSchemes: [
            {
                name: 'Medical Blue',
                colors: ['#ffffff', '#f0f9ff', '#bae6fd', '#0ea5e9', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
                description: 'Calming medical blue palette'
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
    {
        id: 'gaming',
        name: 'Gaming',
        description: 'Dynamic and energetic design for gaming applications',
        icon: <Gamepad2 className="w-5 h-5" />,
        category: 'Gaming',
        popularity: 7,
        characteristics: ['Bold colors', 'Dynamic layouts', 'High energy', 'Immersive'],
        colorSchemes: [
            {
                name: 'Gaming Neon',
                colors: ['#0a0a0a', '#1a1a2e', '#16213e', '#00d4ff', '#ff0080', '#39ff14', '#ff6600', '#ffffff'],
                description: 'Electric neon gaming palette'
            }
        ],
        typography: {
            primary: 'Orbitron, monospace',
            secondary: 'Rajdhani, sans-serif',
            weights: ['400', '700', '900']
        },
        spacing: ['4px', '8px', '12px', '20px', '32px', '48px', '80px'],
        borderRadius: ['0px', '4px', '8px', '16px']
    },
    {
        id: 'news-media',
        name: 'News & Media',
        description: 'Content-focused design with excellent readability',
        icon: <Globe className="w-5 h-5" />,
        category: 'Media',
        popularity: 7,
        characteristics: ['Content focus', 'Readability', 'Information hierarchy', 'Clean layout'],
        colorSchemes: [
            {
                name: 'News Classic',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#495057', '#212529', '#000000', '#6c757d', '#adb5bd'],
                description: 'Classic news readability palette'
            }
        ],
        typography: {
            primary: 'Georgia, serif',
            secondary: 'system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['4px', '8px', '16px', '24px', '32px', '48px'],
        borderRadius: ['0px', '4px', '6px']
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
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                    <Palette className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Design Styles</h2>
                    <p className="text-sm text-gray-400">Choose your design direction</p>
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
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                        {category === 'all' ? 'All Styles' : category}
                    </button>
                ))}
            </div>

            <div className="grid gap-3 max-h-96 overflow-y-auto scrollbar-thin">
                {filteredStyles.map((style) => (
                    <div key={style.id} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <button
                            onClick={() => {
                                onStyleSelect(style);
                                setExpandedStyle(expandedStyle === style.id ? null : style.id);
                            }}
                            className={`w-full p-4 text-left transition-all ${
                                selectedStyleId === style.id
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30'
                                    : 'hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    selectedStyleId === style.id 
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                                        : 'bg-white/10 text-gray-400'
                                }`}>
                                    {style.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-white">{style.name}</h3>
                                        <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded">
                                            {style.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-gray-500">{style.popularity}/10</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300">{style.description}</p>
                                </div>
                                {selectedStyleId === style.id && (
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                )}
                            </div>
                        </button>

                        {expandedStyle === style.id && (
                            <div className="p-4 bg-black/30 border-t border-white/10 space-y-4">
                                {/* Characteristics */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Characteristics</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {style.characteristics.map((char, index) => (
                                            <span key={index} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Schemes */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Color Palette</h4>
                                    <div className="space-y-2">
                                        {style.colorSchemes.map((scheme, index) => (
                                            <div key={index} className="bg-black/40 rounded-lg p-3 border border-white/10">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-200">{scheme.name}</span>
                                                    <div className="flex gap-1">
                                                        {scheme.colors.slice(0, 8).map((color, colorIndex) => (
                                                            <div
                                                                key={colorIndex}
                                                                className="w-4 h-4 rounded border border-white/20"
                                                                style={{ backgroundColor: color }}
                                                                title={color}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-400">{scheme.description}</p>
                                            </div>
                                        ))}
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