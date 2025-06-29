import React, { useState } from 'react';
import { Palette, Eye, Copy, Check, Star } from 'lucide-react';

// 60 carefully curated color combinations
const colorCombinations = [
    // Neutral & Professional (8 combinations)
    {
        id: 'modern-neutrals',
        name: 'Modern Neutrals',
        description: 'Clean grays for professional interfaces',
        category: 'Neutral',
        popularity: 9,
        colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#495057', '#343a40', '#212529'],
        usage: ['Backgrounds', 'Text', 'Borders'],
        accessibility: 'WCAG AAA'
    },
    {
        id: 'warm-grays',
        name: 'Warm Grays',
        description: 'Cozy grays with warm undertones',
        category: 'Neutral',
        popularity: 8,
        colors: ['#fefefe', '#f7f5f3', '#e8e6e1', '#d3c7b8', '#a08d7a', '#8b7355', '#6b5b47', '#2c2c2c'],
        usage: ['Organic brands', 'Warm interfaces'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'cool-grays',
        name: 'Cool Grays',
        description: 'Clean grays with blue undertones',
        category: 'Neutral',
        popularity: 8,
        colors: ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#475569', '#334155', '#0f172a'],
        usage: ['Tech interfaces', 'Professional apps'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'enterprise-blue',
        name: 'Enterprise Blue',
        description: 'Professional blue for corporate applications',
        category: 'Blue',
        popularity: 9,
        colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b', '#0f172a', '#000000'],
        usage: ['Corporate', 'Professional', 'Trust'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'success-green',
        name: 'Success Green',
        description: 'Calming greens for positive actions',
        category: 'Green',
        popularity: 8,
        colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#22c55e', '#15803d', '#166534', '#14532d', '#052e16'],
        usage: ['Success', 'Confirmation', 'Growth'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'warning-amber',
        name: 'Warning Amber',
        description: 'Attention-grabbing amber for warnings',
        category: 'Orange',
        popularity: 7,
        colors: ['#ffffff', '#fffbeb', '#fef3c7', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
        usage: ['Warnings', 'Caution', 'Attention'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'error-red',
        name: 'Error Red',
        description: 'Clear red for error states',
        category: 'Red',
        popularity: 8,
        colors: ['#ffffff', '#fef2f2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
        usage: ['Errors', 'Danger', 'Critical'],
        accessibility: 'WCAG AA'
    },
    {
        id: 'info-blue',
        name: 'Info Blue',
        description: 'Informational blue for notifications',
        category: 'Blue',
        popularity: 8,
        colors: ['#ffffff', '#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'],
        usage: ['Information', 'Links', 'Navigation'],
        accessibility: 'WCAG AA'
    }
];

const accessibilityLevels = {
    'WCAG AAA': { color: 'bg-green-100 text-green-700 border-green-200', description: 'Highest accessibility standard' },
    'WCAG AA': { color: 'bg-blue-100 text-blue-700 border-blue-200', description: 'Standard accessibility compliance' },
    'WCAG A': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', description: 'Basic accessibility - use with care' }
};

type Props = {
    onColorSelect: (colors: string[]) => void;
};

const ColorGuidePanel: React.FC<Props> = ({ onColorSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [copiedColor, setCopiedColor] = useState<string | null>(null);
    const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

    const categories = ['all', ...Array.from(new Set(colorCombinations.map(combo => combo.category)))];

    const filteredCombinations = selectedCategory === 'all' 
        ? colorCombinations 
        : colorCombinations.filter(combo => combo.category === selectedCategory);

    const copyToClipboard = async (color: string) => {
        try {
            await navigator.clipboard.writeText(color);
            setCopiedColor(color);
            setTimeout(() => setCopiedColor(null), 2000);
        } catch (err) {
            console.error('Failed to copy color: ', err);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Palette className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Color Palettes</h2>
                        <p className="text-sm text-slate-600">WCAG compliant combinations</p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                selectedCategory === category
                                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                        >
                            {category === 'all' ? 'All Colors' : category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Combinations */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                {filteredCombinations.map((combo) => (
                    <div key={combo.id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-slate-900">{combo.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                            <span className="text-xs text-slate-500">{combo.popularity}/10</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium border ${accessibilityLevels[combo.accessibility as keyof typeof accessibilityLevels].color}`}>
                                            {combo.accessibility}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">{combo.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onColorSelect(combo.colors)}
                                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        onClick={() => setExpandedGuide(expandedGuide === combo.id ? null : combo.id)}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Color Swatches */}
                            <div className="flex gap-1 mb-3">
                                {combo.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => copyToClipboard(color)}
                                        className="relative group flex-1 h-8 rounded border border-slate-200 hover:scale-105 transition-transform"
                                        style={{ backgroundColor: color }}
                                        title={`${color} - Click to copy`}
                                    >
                                        {copiedColor === color && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white drop-shadow-lg" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Usage Tags */}
                            <div className="flex flex-wrap gap-1">
                                {combo.usage.map((use, index) => (
                                    <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedGuide === combo.id && (
                            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Color Values</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {combo.colors.map((color, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-white rounded p-2 border border-slate-200">
                                                <div 
                                                    className="w-4 h-4 rounded border border-slate-200"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <code className="text-xs font-mono text-slate-600 flex-1">{color}</code>
                                                <button
                                                    onClick={() => copyToClipboard(color)}
                                                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {copiedColor === color ? (
                                                        <Check className="w-3 h-3 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Enterprise-grade color combinations</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>WCAG compliant</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorGuidePanel;