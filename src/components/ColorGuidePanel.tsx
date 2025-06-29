import React, { useState } from 'react';
import { Palette, Eye, Copy, Check, ExternalLink, Star } from 'lucide-react';

// Inspired by Figma's color combinations and modern design systems
const colorCombinations = [
    {
        id: 'modern-neutrals',
        name: 'Modern Neutrals',
        description: 'Sophisticated grays with warm undertones',
        category: 'Neutral',
        popularity: 9,
        colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#495057', '#343a40', '#212529'],
        usage: ['Backgrounds', 'Text', 'Borders', 'Subtle elements'],
        accessibility: 'WCAG AAA',
        inspiration: 'Apple Design System, Tailwind CSS'
    },
    {
        id: 'ocean-blues',
        name: 'Ocean Blues',
        description: 'Calming blues inspired by ocean depths',
        category: 'Blue',
        popularity: 8,
        colors: ['#f0f9ff', '#e0f2fe', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985'],
        usage: ['Primary actions', 'Links', 'Trust elements', 'Professional themes'],
        accessibility: 'WCAG AA',
        inspiration: 'Figma, Linear, Notion'
    },
    {
        id: 'forest-greens',
        name: 'Forest Greens',
        description: 'Natural greens for growth and success',
        category: 'Green',
        popularity: 7,
        colors: ['#f0fdf4', '#dcfce7', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'],
        usage: ['Success states', 'CTAs', 'Nature themes', 'Health/wellness'],
        accessibility: 'WCAG AA',
        inspiration: 'Spotify, WhatsApp, Mint'
    },
    {
        id: 'sunset-oranges',
        name: 'Sunset Oranges',
        description: 'Warm oranges that energize and inspire',
        category: 'Orange',
        popularity: 6,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Warning states', 'Energy', 'Creativity', 'Food/lifestyle'],
        accessibility: 'WCAG AA',
        inspiration: 'Figma, SoundCloud, Firefox'
    },
    {
        id: 'royal-purples',
        name: 'Royal Purples',
        description: 'Luxurious purples for premium experiences',
        category: 'Purple',
        popularity: 8,
        colors: ['#faf5ff', '#f3e8ff', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6'],
        usage: ['Premium features', 'Creativity', 'Innovation', 'Luxury brands'],
        accessibility: 'WCAG AA',
        inspiration: 'Twitch, Discord, Figma'
    },
    {
        id: 'cherry-reds',
        name: 'Cherry Reds',
        description: 'Bold reds for attention and urgency',
        category: 'Red',
        popularity: 7,
        colors: ['#fef2f2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
        usage: ['Error states', 'Urgent actions', 'Love/passion', 'Alerts'],
        accessibility: 'WCAG AA',
        inspiration: 'YouTube, Pinterest, Netflix'
    },
    {
        id: 'golden-yellows',
        name: 'Golden Yellows',
        description: 'Optimistic yellows that capture attention',
        category: 'Yellow',
        popularity: 5,
        colors: ['#fefce8', '#fef3c7', '#fde68a', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e'],
        usage: ['Highlights', 'Warnings', 'Optimism', 'Energy'],
        accessibility: 'WCAG A',
        inspiration: 'Snapchat, McDonald\'s, DHL'
    },
    {
        id: 'cyberpunk-neons',
        name: 'Cyberpunk Neons',
        description: 'Electric neons for futuristic designs',
        category: 'Neon',
        popularity: 6,
        colors: ['#0a0a0a', '#1a1a2e', '#16213e', '#00d4ff', '#ff0080', '#39ff14', '#ff6600', '#ffffff'],
        usage: ['Gaming', 'Tech', 'Futuristic themes', 'Dark mode accents'],
        accessibility: 'WCAG A',
        inspiration: 'Gaming interfaces, Cyberpunk aesthetics'
    },
    {
        id: 'pastel-dreams',
        name: 'Pastel Dreams',
        description: 'Soft pastels for gentle, approachable designs',
        category: 'Pastel',
        popularity: 7,
        colors: ['#fef7ff', '#fce7f3', '#fbcfe8', '#f9a8d4', '#ec4899', '#db2777', '#be185d', '#9d174d'],
        usage: ['Feminine brands', 'Wellness', 'Children', 'Soft interfaces'],
        accessibility: 'WCAG A',
        inspiration: 'Dribbble, Behance, Instagram'
    },
    {
        id: 'earth-tones',
        name: 'Earth Tones',
        description: 'Natural browns and beiges for organic feel',
        category: 'Brown',
        popularity: 6,
        colors: ['#fefdfb', '#f7f3f0', '#e7ddd7', '#d6c2b6', '#a3896a', '#8b6f47', '#6b5b47', '#4a3f35'],
        usage: ['Natural brands', 'Coffee/food', 'Rustic themes', 'Organic products'],
        accessibility: 'WCAG AA',
        inspiration: 'Starbucks, Airbnb, Patagonia'
    }
];

const accessibilityLevels = {
    'WCAG AAA': { color: 'bg-green-100 text-green-800', description: 'Highest accessibility standard' },
    'WCAG AA': { color: 'bg-blue-100 text-blue-800', description: 'Standard accessibility compliance' },
    'WCAG A': { color: 'bg-yellow-100 text-yellow-800', description: 'Basic accessibility - use with care' }
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

    const copyAllColors = async (colors: string[]) => {
        try {
            const colorString = colors.join(', ');
            await navigator.clipboard.writeText(colorString);
            setCopiedColor('all-colors');
            setTimeout(() => setCopiedColor(null), 2000);
        } catch (err) {
            console.error('Failed to copy colors: ', err);
        }
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
                    <Palette className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Color Guide</h2>
                    <p className="text-sm text-gray-500">WCAG compliant color combinations</p>
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
                                ? 'bg-pink-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {category === 'all' ? 'All Colors' : category}
                    </button>
                ))}
            </div>

            {/* Color Combinations */}
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                {filteredCombinations.map((combo) => (
                    <div key={combo.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-800">{combo.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                            <span className="text-xs text-gray-500">{combo.popularity}/10</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${accessibilityLevels[combo.accessibility as keyof typeof accessibilityLevels].color}`}>
                                            {combo.accessibility}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{combo.description}</p>
                                    <p className="text-xs text-gray-500">Inspired by: {combo.inspiration}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onColorSelect(combo.colors)}
                                        className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        onClick={() => setExpandedGuide(expandedGuide === combo.id ? null : combo.id)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
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
                                        className="relative group flex-1 h-8 rounded border border-gray-300 hover:scale-105 transition-transform"
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
                                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedGuide === combo.id && (
                            <div className="p-4 bg-gray-50/50 border-t border-gray-200 space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Color Values</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {combo.colors.map((color, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-white rounded p-2 border border-gray-200">
                                                <div 
                                                    className="w-4 h-4 rounded border border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <code className="text-xs font-mono text-gray-700 flex-1">{color}</code>
                                                <button
                                                    onClick={() => copyToClipboard(color)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {copiedColor === color ? (
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Accessibility Info</h4>
                                    <div className="bg-white rounded p-3 border border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${accessibilityLevels[combo.accessibility as keyof typeof accessibilityLevels].color}`}>
                                                {combo.accessibility}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {accessibilityLevels[combo.accessibility as keyof typeof accessibilityLevels].description}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            These colors meet accessibility standards when used appropriately with sufficient contrast ratios.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => copyAllColors(combo.colors)}
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        {copiedColor === 'all-colors' ? (
                                            <Check className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                        Copy all colors
                                    </button>
                                    <button className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700">
                                        <ExternalLink className="w-3 h-3" />
                                        View on Figma
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Color combinations inspired by Figma Community</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span>WCAG compliant</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorGuidePanel;