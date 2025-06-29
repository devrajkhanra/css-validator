import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, Globe, ShoppingBag, User, Briefcase, Camera, Gamepad2, Heart } from 'lucide-react';

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
};

const designStyles: DesignStyle[] = [
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Clean, simple, and focused on content with plenty of white space',
        icon: <Monitor className="w-5 h-5" />,
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
        id: 'modern-corporate',
        name: 'Modern Corporate',
        description: 'Professional and trustworthy with sophisticated color palettes',
        icon: <Briefcase className="w-5 h-5" />,
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
        id: 'creative-portfolio',
        name: 'Creative Portfolio',
        description: 'Bold and expressive with unique layouts and vibrant colors',
        icon: <Camera className="w-5 h-5" />,
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
        id: 'e-commerce',
        name: 'E-commerce',
        description: 'Conversion-focused with clear CTAs and product-centric design',
        icon: <ShoppingBag className="w-5 h-5" />,
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
    {
        id: 'tech-startup',
        name: 'Tech Startup',
        description: 'Innovative and forward-thinking with modern gradients and tech aesthetics',
        icon: <Smartphone className="w-5 h-5" />,
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
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Calming and trustworthy with accessible design and soothing colors',
        icon: <Heart className="w-5 h-5" />,
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
    {
        id: 'gaming',
        name: 'Gaming',
        description: 'Dynamic and energetic with bold colors and immersive experiences',
        icon: <Gamepad2 className="w-5 h-5" />,
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
        id: 'news-media',
        name: 'News & Media',
        description: 'Content-focused with excellent readability and information hierarchy',
        icon: <Globe className="w-5 h-5" />,
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
    }
];

type Props = {
    onStyleSelect: (style: DesignStyle) => void;
    selectedStyleId?: string;
};

const DesignStyleSelector: React.FC<Props> = ({ onStyleSelect, selectedStyleId }) => {
    const [expandedStyle, setExpandedStyle] = useState<string | null>(null);

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                    <Palette className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Design Style</h2>
                    <p className="text-sm text-gray-500">Choose your project's design direction</p>
                </div>
            </div>

            <div className="grid gap-3 max-h-96 overflow-y-auto scrollbar-thin">
                {designStyles.map((style) => (
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
                                    <h3 className="font-medium text-gray-800">{style.name}</h3>
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
                                                                style={{ backgroundColor: color }}
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