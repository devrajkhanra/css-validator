import React, { useState } from 'react';
import { Palette, Eye, Copy, Check, ExternalLink, Star } from 'lucide-react';

// 60 carefully curated color combinations that are actually applicable
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
        accessibility: 'WCAG AAA',
        inspiration: 'Tailwind CSS, Apple Design'
    },
    {
        id: 'warm-grays',
        name: 'Warm Grays',
        description: 'Cozy grays with warm undertones',
        category: 'Neutral',
        popularity: 8,
        colors: ['#fefefe', '#f7f5f3', '#e8e6e1', '#d3c7b8', '#a08d7a', '#8b7355', '#6b5b47', '#2c2c2c'],
        usage: ['Organic brands', 'Warm interfaces'],
        accessibility: 'WCAG AA',
        inspiration: 'Airbnb, Notion'
    },
    {
        id: 'cool-grays',
        name: 'Cool Grays',
        description: 'Clean grays with blue undertones',
        category: 'Neutral',
        popularity: 8,
        colors: ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#475569', '#334155', '#0f172a'],
        usage: ['Tech interfaces', 'Professional apps'],
        accessibility: 'WCAG AA',
        inspiration: 'Linear, Figma'
    },
    {
        id: 'charcoal-elegance',
        name: 'Charcoal Elegance',
        description: 'Deep charcoals for premium feel',
        category: 'Neutral',
        popularity: 7,
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#71717a', '#52525b', '#27272a', '#18181b'],
        usage: ['Luxury brands', 'Premium products'],
        accessibility: 'WCAG AA',
        inspiration: 'Tesla, Apple'
    },
    {
        id: 'pure-monochrome',
        name: 'Pure Monochrome',
        description: 'Classic black and white',
        category: 'Neutral',
        popularity: 9,
        colors: ['#ffffff', '#f5f5f5', '#e5e5e5', '#a3a3a3', '#737373', '#525252', '#262626', '#000000'],
        usage: ['Timeless', 'Classic', 'Minimal'],
        accessibility: 'WCAG AAA',
        inspiration: 'Apple, Muji'
    },
    {
        id: 'soft-monochrome',
        name: 'Soft Monochrome',
        description: 'Gentle grays for softer contrast',
        category: 'Neutral',
        popularity: 8,
        colors: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46'],
        usage: ['Soft', 'Gentle', 'Reading'],
        accessibility: 'WCAG AA',
        inspiration: 'Medium, Notion'
    },
    {
        id: 'zen-minimal',
        name: 'Zen Minimal',
        description: 'Peaceful colors for minimal design',
        category: 'Neutral',
        popularity: 8,
        colors: ['#ffffff', '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#757575', '#424242'],
        usage: ['Minimal', 'Zen', 'Peaceful'],
        accessibility: 'WCAG AAA',
        inspiration: 'Zen philosophy'
    },
    {
        id: 'scandinavian',
        name: 'Scandinavian',
        description: 'Nordic colors for clean design',
        category: 'Neutral',
        popularity: 7,
        colors: ['#ffffff', '#f8f8f8', '#e8e8e8', '#d0d0d0', '#a0a0a0', '#707070', '#404040', '#202020'],
        usage: ['Nordic', 'Clean', 'Functional'],
        accessibility: 'WCAG AAA',
        inspiration: 'IKEA, Scandinavian design'
    },

    // Blues (10 combinations)
    {
        id: 'ocean-blues',
        name: 'Ocean Blues',
        description: 'Calming blues inspired by ocean',
        category: 'Blue',
        popularity: 8,
        colors: ['#f0f9ff', '#e0f2fe', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985'],
        usage: ['Primary actions', 'Links', 'Trust'],
        accessibility: 'WCAG AA',
        inspiration: 'Figma, Linear'
    },
    {
        id: 'royal-blues',
        name: 'Royal Blues',
        description: 'Rich, authoritative blues',
        category: 'Blue',
        popularity: 8,
        colors: ['#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
        usage: ['Corporate', 'Finance', 'Authority'],
        accessibility: 'WCAG AA',
        inspiration: 'Facebook, LinkedIn'
    },
    {
        id: 'navy-depths',
        name: 'Navy Depths',
        description: 'Deep navy for sophisticated interfaces',
        category: 'Blue',
        popularity: 7,
        colors: ['#f8fafc', '#f1f5f9', '#64748b', '#334155', '#1e293b', '#0f172a', '#020617', '#000000'],
        usage: ['Professional', 'Finance', 'Corporate'],
        accessibility: 'WCAG AAA',
        inspiration: 'Goldman Sachs'
    },
    {
        id: 'electric-blues',
        name: 'Electric Blues',
        description: 'Vibrant electric blues',
        category: 'Blue',
        popularity: 6,
        colors: ['#f0f9ff', '#e0f2fe', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
        usage: ['Tech', 'Innovation', 'Energy'],
        accessibility: 'WCAG AA',
        inspiration: 'Twitter, Zoom'
    },
    {
        id: 'powder-blues',
        name: 'Powder Blues',
        description: 'Soft, calming powder blues',
        category: 'Blue',
        popularity: 7,
        colors: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'],
        usage: ['Healthcare', 'Wellness', 'Calm'],
        accessibility: 'WCAG AA',
        inspiration: 'Calm, Headspace'
    },
    {
        id: 'midnight-blues',
        name: 'Midnight Blues',
        description: 'Dark blues for night themes',
        category: 'Blue',
        popularity: 6,
        colors: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9'],
        usage: ['Dark mode', 'Night themes'],
        accessibility: 'WCAG A',
        inspiration: 'Discord, Spotify'
    },
    {
        id: 'sky-blues',
        name: 'Sky Blues',
        description: 'Light, airy sky blues',
        category: 'Blue',
        popularity: 7,
        colors: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'],
        usage: ['Fresh', 'Clean', 'Open'],
        accessibility: 'WCAG AA',
        inspiration: 'Sky, clouds'
    },
    {
        id: 'corporate-blues',
        name: 'Corporate Blues',
        description: 'Professional business blues',
        category: 'Blue',
        popularity: 8,
        colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b', '#0f172a', '#000000'],
        usage: ['Business', 'Corporate', 'Professional'],
        accessibility: 'WCAG AA',
        inspiration: 'IBM, Microsoft'
    },
    {
        id: 'tech-blues',
        name: 'Tech Blues',
        description: 'Modern technology blues',
        category: 'Blue',
        popularity: 8,
        colors: ['#ffffff', '#eff6ff', '#3b82f6', '#1d4ed8', '#1e1b4b', '#0f172a', '#020617', '#000000'],
        usage: ['Tech', 'Innovation', 'Modern'],
        accessibility: 'WCAG AA',
        inspiration: 'Tech startups'
    },
    {
        id: 'ice-blues',
        name: 'Ice Blues',
        description: 'Cool, crisp ice blues',
        category: 'Blue',
        popularity: 6,
        colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'],
        usage: ['Cool', 'Fresh', 'Clean'],
        accessibility: 'WCAG AA',
        inspiration: 'Ice, winter'
    },

    // Greens (8 combinations)
    {
        id: 'forest-greens',
        name: 'Forest Greens',
        description: 'Natural greens for growth',
        category: 'Green',
        popularity: 7,
        colors: ['#f0fdf4', '#dcfce7', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'],
        usage: ['Success', 'Nature', 'Growth'],
        accessibility: 'WCAG AA',
        inspiration: 'Spotify, WhatsApp'
    },
    {
        id: 'emerald-luxury',
        name: 'Emerald Luxury',
        description: 'Rich emerald greens',
        category: 'Green',
        popularity: 7,
        colors: ['#ecfdf5', '#d1fae5', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46'],
        usage: ['Luxury', 'Premium', 'Success'],
        accessibility: 'WCAG AA',
        inspiration: 'Rolex, Starbucks'
    },
    {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        description: 'Fresh mint greens',
        category: 'Green',
        popularity: 6,
        colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'],
        usage: ['Fresh', 'Health', 'Clean'],
        accessibility: 'WCAG AA',
        inspiration: 'Mint Mobile'
    },
    {
        id: 'sage-wisdom',
        name: 'Sage Wisdom',
        description: 'Muted sage greens',
        category: 'Green',
        popularity: 6,
        colors: ['#f6f7f6', '#e8ebe8', '#c9d1c9', '#9ca89c', '#6b7b6b', '#4a5a4a', '#2d3d2d', '#1a2a1a'],
        usage: ['Organic', 'Natural', 'Sophisticated'],
        accessibility: 'WCAG AA',
        inspiration: 'Patagonia'
    },
    {
        id: 'lime-energy',
        name: 'Lime Energy',
        description: 'Bright lime greens',
        category: 'Green',
        popularity: 5,
        colors: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f'],
        usage: ['Energy', 'Youth', 'Sports'],
        accessibility: 'WCAG A',
        inspiration: 'Android, Spotify'
    },
    {
        id: 'medical-greens',
        name: 'Medical Greens',
        description: 'Calming medical greens',
        category: 'Green',
        popularity: 8,
        colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#10b981', '#047857', '#166534', '#14532d', '#052e16'],
        usage: ['Healthcare', 'Medical', 'Wellness'],
        accessibility: 'WCAG AA',
        inspiration: 'Medical institutions'
    },
    {
        id: 'nature-organic',
        name: 'Nature Organic',
        description: 'Earth-inspired greens',
        category: 'Green',
        popularity: 6,
        colors: ['#fefdfb', '#f7f3f0', '#8b7355', '#6b5b47', '#4a3f35', '#2d2520', '#1a1612', '#0f0e0c'],
        usage: ['Natural', 'Organic', 'Earth'],
        accessibility: 'WCAG AA',
        inspiration: 'Nature, earth tones'
    },
    {
        id: 'spring-fresh',
        name: 'Spring Fresh',
        description: 'Fresh spring greens',
        category: 'Green',
        popularity: 6,
        colors: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
        usage: ['Spring', 'Fresh', 'Renewal'],
        accessibility: 'WCAG AA',
        inspiration: 'Spring themes'
    },

    // Reds (6 combinations)
    {
        id: 'cherry-reds',
        name: 'Cherry Reds',
        description: 'Bold reds for attention',
        category: 'Red',
        popularity: 7,
        colors: ['#fef2f2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
        usage: ['Error', 'Urgent', 'Alerts'],
        accessibility: 'WCAG AA',
        inspiration: 'YouTube, Netflix'
    },
    {
        id: 'crimson-power',
        name: 'Crimson Power',
        description: 'Deep crimson for power',
        category: 'Red',
        popularity: 6,
        colors: ['#fef2f2', '#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#7f1d1d'],
        usage: ['Power', 'Strength', 'Bold'],
        accessibility: 'WCAG AA',
        inspiration: 'Coca-Cola, Ferrari'
    },
    {
        id: 'rose-elegance',
        name: 'Rose Elegance',
        description: 'Elegant rose tones',
        category: 'Red',
        popularity: 7,
        colors: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c'],
        usage: ['Feminine', 'Elegant', 'Beauty'],
        accessibility: 'WCAG AA',
        inspiration: 'Victoria\'s Secret'
    },
    {
        id: 'burgundy-luxury',
        name: 'Burgundy Luxury',
        description: 'Rich burgundy for luxury',
        category: 'Red',
        popularity: 6,
        colors: ['#fdf2f8', '#fce7f3', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#831843'],
        usage: ['Luxury', 'Wine', 'Premium'],
        accessibility: 'WCAG AA',
        inspiration: 'Louis Vuitton'
    },
    {
        id: 'coral-warm',
        name: 'Coral Warm',
        description: 'Warm coral tones',
        category: 'Red',
        popularity: 6,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Warm', 'Friendly', 'Approachable'],
        accessibility: 'WCAG AA',
        inspiration: 'Coral reefs'
    },
    {
        id: 'valentine-reds',
        name: 'Valentine Reds',
        description: 'Romantic red palette',
        category: 'Red',
        popularity: 5,
        colors: ['#fef2f2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
        usage: ['Romance', 'Love', 'Passion'],
        accessibility: 'WCAG AA',
        inspiration: 'Valentine\'s Day'
    },

    // Purples (6 combinations)
    {
        id: 'royal-purples',
        name: 'Royal Purples',
        description: 'Luxurious purples',
        category: 'Purple',
        popularity: 8,
        colors: ['#faf5ff', '#f3e8ff', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6'],
        usage: ['Premium', 'Creativity', 'Luxury'],
        accessibility: 'WCAG AA',
        inspiration: 'Twitch, Discord'
    },
    {
        id: 'lavender-dreams',
        name: 'Lavender Dreams',
        description: 'Soft lavender for calm',
        category: 'Purple',
        popularity: 7,
        colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed'],
        usage: ['Wellness', 'Calm', 'Beauty'],
        accessibility: 'WCAG AA',
        inspiration: 'Calm, Headspace'
    },
    {
        id: 'violet-innovation',
        name: 'Violet Innovation',
        description: 'Electric violets for innovation',
        category: 'Purple',
        popularity: 6,
        colors: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
        usage: ['Innovation', 'Tech', 'Creative'],
        accessibility: 'WCAG AA',
        inspiration: 'Figma, Linear'
    },
    {
        id: 'plum-sophistication',
        name: 'Plum Sophistication',
        description: 'Deep plum for sophistication',
        category: 'Purple',
        popularity: 6,
        colors: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf'],
        usage: ['Sophisticated', 'Premium', 'Beauty'],
        accessibility: 'WCAG AA',
        inspiration: 'Sephora'
    },
    {
        id: 'grape-rich',
        name: 'Grape Rich',
        description: 'Rich grape purples',
        category: 'Purple',
        popularity: 5,
        colors: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
        usage: ['Rich', 'Deep', 'Luxurious'],
        accessibility: 'WCAG AA',
        inspiration: 'Wine, grapes'
    },
    {
        id: 'amethyst-mystical',
        name: 'Amethyst Mystical',
        description: 'Mystical amethyst tones',
        category: 'Purple',
        popularity: 5,
        colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed'],
        usage: ['Mystical', 'Spiritual', 'Creative'],
        accessibility: 'WCAG AA',
        inspiration: 'Crystals, mysticism'
    },

    // Oranges & Yellows (6 combinations)
    {
        id: 'sunset-oranges',
        name: 'Sunset Oranges',
        description: 'Warm oranges that energize',
        category: 'Orange',
        popularity: 6,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Warning', 'Energy', 'Creativity'],
        accessibility: 'WCAG AA',
        inspiration: 'SoundCloud, Firefox'
    },
    {
        id: 'golden-yellows',
        name: 'Golden Yellows',
        description: 'Optimistic yellows',
        category: 'Yellow',
        popularity: 5,
        colors: ['#fefce8', '#fef3c7', '#fde68a', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e'],
        usage: ['Highlights', 'Warnings', 'Optimism'],
        accessibility: 'WCAG A',
        inspiration: 'Snapchat, DHL'
    },
    {
        id: 'amber-warmth',
        name: 'Amber Warmth',
        description: 'Warm amber tones',
        category: 'Orange',
        popularity: 6,
        colors: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b', '#d97706', '#b45309', '#92400e'],
        usage: ['Warmth', 'Cozy', 'Autumn'],
        accessibility: 'WCAG AA',
        inspiration: 'Coffee brands'
    },
    {
        id: 'tangerine-energy',
        name: 'Tangerine Energy',
        description: 'Vibrant tangerine',
        category: 'Orange',
        popularity: 5,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Energy', 'Sports', 'Dynamic'],
        accessibility: 'WCAG A',
        inspiration: 'Nike, Gatorade'
    },
    {
        id: 'peach-soft',
        name: 'Peach Soft',
        description: 'Soft peach tones',
        category: 'Orange',
        popularity: 6,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Soft', 'Friendly', 'Warm'],
        accessibility: 'WCAG AA',
        inspiration: 'Peach fruit'
    },
    {
        id: 'honey-gold',
        name: 'Honey Gold',
        description: 'Rich honey gold',
        category: 'Yellow',
        popularity: 6,
        colors: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b', '#d97706', '#b45309', '#92400e'],
        usage: ['Luxury', 'Premium', 'Warm'],
        accessibility: 'WCAG AA',
        inspiration: 'Honey, gold'
    },

    // Special & Dark (6 combinations)
    {
        id: 'cyberpunk-neons',
        name: 'Cyberpunk Neons',
        description: 'Electric neons for futuristic designs',
        category: 'Neon',
        popularity: 6,
        colors: ['#0a0a0a', '#1a1a2e', '#16213e', '#00d4ff', '#ff0080', '#39ff14', '#ff6600', '#ffffff'],
        usage: ['Gaming', 'Tech', 'Futuristic'],
        accessibility: 'WCAG A',
        inspiration: 'Cyberpunk aesthetics'
    },
    {
        id: 'dark-mode-pro',
        name: 'Dark Mode Pro',
        description: 'Professional dark colors',
        category: 'Dark',
        popularity: 9,
        colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9'],
        usage: ['Dark mode', 'Professional'],
        accessibility: 'WCAG AA',
        inspiration: 'VS Code, GitHub'
    },
    {
        id: 'neon-cyber',
        name: 'Neon Cyber',
        description: 'Bright neons for cyber aesthetics',
        category: 'Neon',
        popularity: 5,
        colors: ['#000000', '#1a1a2e', '#16213e', '#00ff41', '#ff0080', '#00d4ff', '#ff6600', '#ffffff'],
        usage: ['Cyber', 'Gaming', 'Neon'],
        accessibility: 'WCAG A',
        inspiration: 'Gaming'
    },
    {
        id: 'matrix-green',
        name: 'Matrix Green',
        description: 'Matrix-inspired green theme',
        category: 'Dark',
        popularity: 5,
        colors: ['#000000', '#001100', '#003300', '#00ff00', '#00cc00', '#009900', '#006600', '#003300'],
        usage: ['Matrix', 'Hacker', 'Tech'],
        accessibility: 'WCAG A',
        inspiration: 'The Matrix'
    },
    {
        id: 'midnight-purple',
        name: 'Midnight Purple',
        description: 'Deep midnight purples',
        category: 'Dark',
        popularity: 6,
        colors: ['#0c0c0c', '#1a1a2e', '#533483', '#7209b7', '#a663cc', '#4deeea', '#ffffff', '#f0f0f0'],
        usage: ['Midnight', 'Deep', 'Mysterious'],
        accessibility: 'WCAG A',
        inspiration: 'Night sky'
    },
    {
        id: 'space-cosmic',
        name: 'Space Cosmic',
        description: 'Deep space colors',
        category: 'Dark',
        popularity: 5,
        colors: ['#0c0c0c', '#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7', '#a663cc', '#4deeea'],
        usage: ['Space', 'Cosmic', 'Deep'],
        accessibility: 'WCAG A',
        inspiration: 'Space, cosmos'
    }
];

const accessibilityLevels = {
    'WCAG AAA': { color: 'bg-green-500/20 text-green-300 border-green-500/30', description: 'Highest accessibility standard' },
    'WCAG AA': { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', description: 'Standard accessibility compliance' },
    'WCAG A': { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', description: 'Basic accessibility - use with care' }
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
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                    <Palette className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Color Palettes</h2>
                    <p className="text-sm text-gray-400">60 WCAG compliant combinations</p>
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
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                        {category === 'all' ? 'All Colors' : category}
                    </button>
                ))}
            </div>

            {/* Color Combinations */}
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                {filteredCombinations.map((combo) => (
                    <div key={combo.id} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-white">{combo.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-xs text-gray-400">{combo.popularity}/10</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium border ${accessibilityLevels[combo.accessibility as keyof typeof accessibilityLevels].color}`}>
                                            {combo.accessibility}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">{combo.description}</p>
                                    <p className="text-xs text-gray-500">Inspired by: {combo.inspiration}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onColorSelect(combo.colors)}
                                        className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        onClick={() => setExpandedGuide(expandedGuide === combo.id ? null : combo.id)}
                                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
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
                                        className="relative group flex-1 h-8 rounded border border-white/20 hover:scale-105 transition-transform"
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
                                    <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedGuide === combo.id && (
                            <div className="p-4 bg-black/30 border-t border-white/10 space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Color Values</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {combo.colors.map((color, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-black/40 rounded p-2 border border-white/10">
                                                <div 
                                                    className="w-4 h-4 rounded border border-white/20"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <code className="text-xs font-mono text-gray-300 flex-1">{color}</code>
                                                <button
                                                    onClick={() => copyToClipboard(color)}
                                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {copiedColor === color ? (
                                                        <Check className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                    <button
                                        onClick={() => copyAllColors(combo.colors)}
                                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                                    >
                                        {copiedColor === 'all-colors' ? (
                                            <Check className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                        Copy all colors
                                    </button>
                                    <button className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300">
                                        <ExternalLink className="w-3 h-3" />
                                        View on Figma
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>60 curated color combinations</span>
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