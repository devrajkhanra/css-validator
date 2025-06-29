import React, { useState, useEffect } from 'react';
import { X, Palette, Monitor, Smartphone, Globe, ShoppingBag, Briefcase, Camera, Gamepad2, Heart, Moon, Layers, Grid, Coffee, Zap, Check, ChevronRight, Info } from 'lucide-react';

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
    projectTypes: string[];
    wcagCompliant: boolean;
};

const designStyles: DesignStyle[] = [
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Clean, simple design with plenty of white space and subtle interactions',
        icon: <Monitor className="w-5 h-5" />,
        category: 'Modern',
        popularity: 9,
        projectTypes: ['dashboard', 'app', 'portfolio'],
        wcagCompliant: true,
        characteristics: ['Clean layouts', 'White space', 'Simple typography', 'Subtle colors', 'High contrast'],
        colorSchemes: [
            {
                name: 'Pure Minimal',
                colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#495057', '#343a40', '#212529'],
                description: 'Clean grayscale palette with excellent contrast ratios'
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
        description: 'Professional design for business applications with trust-building elements',
        icon: <Briefcase className="w-5 h-5" />,
        category: 'Business',
        popularity: 8,
        projectTypes: ['dashboard', 'app', 'ecommerce'],
        wcagCompliant: true,
        characteristics: ['Professional', 'Trustworthy', 'Clean hierarchy', 'Business colors', 'Accessible'],
        colorSchemes: [
            {
                name: 'Corporate Blue',
                colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b', '#0f172a', '#000000'],
                description: 'Professional blue palette for corporate applications'
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
        description: 'Contemporary enterprise design with clean aesthetics and scalable components',
        icon: <Grid className="w-5 h-5" />,
        category: 'Enterprise',
        popularity: 9,
        projectTypes: ['dashboard', 'app'],
        wcagCompliant: true,
        characteristics: ['Clean', 'Scalable', 'Accessible', 'Professional', 'Consistent'],
        colorSchemes: [
            {
                name: 'Enterprise Gray',
                colors: ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#475569', '#334155', '#1e293b'],
                description: 'Modern enterprise palette with excellent accessibility'
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
        description: 'Modern tech aesthetic with innovation focus and dynamic elements',
        icon: <Smartphone className="w-5 h-5" />,
        category: 'Tech',
        popularity: 8,
        projectTypes: ['app', 'landing', 'portfolio'],
        wcagCompliant: true,
        characteristics: ['Modern gradients', 'Tech aesthetics', 'Innovation', 'Sleek design', 'Dynamic'],
        colorSchemes: [
            {
                name: 'Tech Blue',
                colors: ['#ffffff', '#eff6ff', '#3b82f6', '#1d4ed8', '#1e1b4b', '#0f172a', '#020617', '#000000'],
                description: 'Modern tech blue palette with gradient support'
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
        description: 'Calming and trustworthy design for medical applications with accessibility focus',
        icon: <Heart className="w-5 h-5" />,
        category: 'Healthcare',
        popularity: 8,
        projectTypes: ['app', 'dashboard'],
        wcagCompliant: true,
        characteristics: ['Calming colors', 'Accessible', 'Trust building', 'Clear information', 'Safe'],
        colorSchemes: [
            {
                name: 'Medical Blue',
                colors: ['#ffffff', '#f0f9ff', '#bae6fd', '#0ea5e9', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
                description: 'Calming medical blue palette with high contrast'
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
        description: 'Conversion-focused design for online stores with clear call-to-actions',
        icon: <ShoppingBag className="w-5 h-5" />,
        category: 'Business',
        popularity: 8,
        projectTypes: ['ecommerce', 'landing'],
        wcagCompliant: true,
        characteristics: ['Clear CTAs', 'Product focus', 'Trust signals', 'Conversion optimized', 'Sales-driven'],
        colorSchemes: [
            {
                name: 'Commerce Green',
                colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#22c55e', '#15803d', '#166534', '#14532d', '#052e16'],
                description: 'Trust-building green palette for commerce'
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
    isOpen: boolean;
    onClose: () => void;
    onStyleSelect: (style: DesignStyle) => void;
    selectedStyleId?: string;
    onApplyToProject?: () => void;
    hasUploadedProject?: boolean;
    projectType?: 'dashboard' | 'landing' | 'app' | 'portfolio' | 'ecommerce';
};

const DesignStyleModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onStyleSelect, 
    selectedStyleId, 
    onApplyToProject,
    hasUploadedProject = false,
    projectType = 'app'
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [expandedStyle, setExpandedStyle] = useState<string | null>(null);

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const categories = ['all', ...Array.from(new Set(designStyles.map(style => style.category)))];
    const filteredStyles = selectedCategory === 'all' 
        ? designStyles 
        : designStyles.filter(style => style.category === selectedCategory);

    // Filter styles by project type compatibility
    const compatibleStyles = filteredStyles.filter(style => 
        style.projectTypes.includes(projectType)
    );

    const handleStyleSelect = (style: DesignStyle) => {
        onStyleSelect(style);
        setExpandedStyle(expandedStyle === style.id ? null : style.id);
    };

    const handleApplyAndClose = () => {
        if (onApplyToProject) {
            onApplyToProject();
        }
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Palette className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
                                Design Style Library
                            </h2>
                            <p className="text-sm text-slate-600">
                                Choose a design style for your {projectType} project
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {hasUploadedProject && selectedStyleId && (
                            <button
                                onClick={handleApplyAndClose}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Zap className="w-4 h-4" />
                                Apply & Close
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Project Type Info */}
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">
                                Showing styles optimized for <span className="capitalize font-semibold">{projectType}</span> projects
                            </p>
                            <p className="text-xs text-blue-700">
                                {compatibleStyles.length} compatible styles available • All styles are WCAG compliant
                            </p>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                }`}
                            >
                                {category === 'all' ? 'All Categories' : category}
                                <span className="ml-2 text-xs opacity-75">
                                    ({category === 'all' ? compatibleStyles.length : compatibleStyles.filter(s => s.category === category).length})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Styles Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {compatibleStyles.map((style) => (
                            <div 
                                key={style.id} 
                                className={`border rounded-xl overflow-hidden transition-all hover:shadow-lg ${
                                    selectedStyleId === style.id
                                        ? 'border-blue-300 bg-blue-50 shadow-md'
                                        : 'border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                {/* Style Header */}
                                <button
                                    onClick={() => handleStyleSelect(style)}
                                    className="w-full p-6 text-left transition-all hover:bg-slate-50"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${
                                                selectedStyleId === style.id 
                                                    ? 'bg-blue-100 text-blue-600' 
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {style.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-slate-900">
                                                        {style.name}
                                                    </h3>
                                                    {selectedStyleId === style.id && (
                                                        <Check className="w-5 h-5 text-blue-600" />
                                                    )}
                                                    {style.wcagCompliant && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                            WCAG AA
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600 mb-3">
                                                    {style.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="px-2 py-1 bg-slate-100 rounded">
                                                        {style.category}
                                                    </span>
                                                    <span className="px-2 py-1 bg-slate-100 rounded">
                                                        {style.popularity}/10 Popular
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
                                            expandedStyle === style.id ? 'rotate-90' : ''
                                        }`} />
                                    </div>

                                    {/* Color Preview */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Color Palette</h4>
                                        <div className="flex gap-1">
                                            {style.colorSchemes[0].colors.slice(0, 8).map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="w-8 h-8 rounded border border-slate-200 shadow-sm"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Characteristics */}
                                    <div className="flex flex-wrap gap-2">
                                        {style.characteristics.slice(0, 4).map((char, index) => (
                                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                {char}
                                            </span>
                                        ))}
                                        {style.characteristics.length > 4 && (
                                            <span className="text-xs text-slate-500">
                                                +{style.characteristics.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </button>

                                {/* Expanded Details */}
                                {expandedStyle === style.id && (
                                    <div className="px-6 pb-6 bg-slate-50 border-t border-slate-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                            {/* Typography */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-700 mb-3">Typography</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-slate-500">Primary:</span>
                                                        <code className="ml-2 text-slate-700 bg-white px-2 py-1 rounded text-xs">
                                                            {style.typography.primary}
                                                        </code>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Weights:</span>
                                                        <div className="flex gap-1 mt-1">
                                                            {style.typography.weights.map((weight, index) => (
                                                                <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                                                                    {weight}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Spacing & Radius */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-700 mb-3">Spacing & Radius</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-slate-500">Spacing Scale:</span>
                                                        <div className="flex gap-1 mt-1 flex-wrap">
                                                            {style.spacing.slice(0, 6).map((space, index) => (
                                                                <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                                                                    {space}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Border Radius:</span>
                                                        <div className="flex gap-1 mt-1">
                                                            {style.borderRadius.map((radius, index) => (
                                                                <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                                                                    {radius}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* All Characteristics */}
                                        <div className="mt-6">
                                            <h4 className="text-sm font-semibold text-slate-700 mb-3">All Characteristics</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {style.characteristics.map((char, index) => (
                                                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                        {char}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {compatibleStyles.length === 0 && (
                        <div className="text-center py-12">
                            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Palette className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 mb-2">No compatible styles found</p>
                            <p className="text-sm text-slate-500">
                                Try selecting a different category or project type
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                            {selectedStyleId ? (
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Style selected: <strong>{designStyles.find(s => s.id === selectedStyleId)?.name}</strong>
                                </span>
                            ) : (
                                'Select a design style to continue'
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Cancel
                            </button>
                            {hasUploadedProject && selectedStyleId && (
                                <button
                                    onClick={handleApplyAndClose}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Apply Style to Project
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignStyleModal;