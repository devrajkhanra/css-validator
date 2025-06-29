import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, Globe, ShoppingBag, Briefcase, Camera, Gamepad2, Heart, Moon, Layers, Grid, Coffee, Zap } from 'lucide-react';

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
        id: 'modern-enterprise',
        name: 'Modern Enterprise',
        description: 'Contemporary enterprise design with clean aesthetics',
        icon: <Grid className="w-5 h-5" />,
        category: 'Enterprise',
        popularity: 9,
        characteristics: ['Clean', 'Scalable', 'Accessible', 'Professional'],
        colorSchemes: [
            {
                name: 'Enterprise Gray',
                colors: ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#475569', '#334155', '#1e293b'],
                description: 'Modern enterprise palette'
            }
        ],
        typography: {
            primary: 'Inter, system-ui, sans-serif',
            secondary: 'Roboto, system-ui, sans-serif',
            weights: ['400', '500', '600', '700']
        },
        spacing: ['4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px'],
        borderRadius: ['6px', '8px', '12px', '16px']
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
    }
];

type Props = {
    onStyleSelect: (style: DesignStyle) => void;
    selectedStyleId?: string;
    onApplyToProject?: () => void;
    hasUploadedProject?: boolean;
};

const DesignStyleSelector: React.FC<Props> = ({ 
    onStyleSelect, 
    selectedStyleId, 
    onApplyToProject,
    hasUploadedProject = false 
}) => {
    const [expandedStyle, setExpandedStyle] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(designStyles.map(style => style.category)))];
    const filteredStyles = selectedCategory === 'all' 
        ? designStyles 
        : designStyles.filter(style => style.category === selectedCategory);

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Palette className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Design Styles</h2>
                        <p className="text-sm text-slate-600">Choose your design direction</p>
                    </div>
                </div>

                {/* Apply to Project Button */}
                {hasUploadedProject && selectedStyleId && (
                    <button
                        onClick={onApplyToProject}
                        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        Apply Style to Uploaded Project
                    </button>
                )}

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                selectedCategory === category
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                        >
                            {category === 'all' ? 'All Styles' : category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {filteredStyles.map((style) => (
                    <div key={style.id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => {
                                onStyleSelect(style);
                                setExpandedStyle(expandedStyle === style.id ? null : style.id);
                            }}
                            className={`w-full p-4 text-left transition-all ${
                                selectedStyleId === style.id
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    selectedStyleId === style.id 
                                        ? 'bg-blue-100 text-blue-600' 
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {style.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-slate-900">{style.name}</h3>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {style.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-slate-500">{style.popularity}/10</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600">{style.description}</p>
                                </div>
                                {selectedStyleId === style.id && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </div>
                        </button>

                        {expandedStyle === style.id && (
                            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                                {/* Characteristics */}
                                <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Characteristics</h4>
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
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Color Palette</h4>
                                    <div className="space-y-2">
                                        {style.colorSchemes.map((scheme, index) => (
                                            <div key={index} className="bg-white rounded-lg p-3 border border-slate-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-slate-700">{scheme.name}</span>
                                                    <div className="flex gap-1">
                                                        {scheme.colors.slice(0, 8).map((color, colorIndex) => (
                                                            <div
                                                                key={colorIndex}
                                                                className="w-4 h-4 rounded border border-slate-200"
                                                                style={{ backgroundColor: color }}
                                                                title={color}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500">{scheme.description}</p>
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