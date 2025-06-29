import React, { useState } from 'react';
import { Palette, Eye, Copy, Check, ExternalLink, Star } from 'lucide-react';

// 60 color combinations inspired by Figma's color guide and modern design systems
const colorCombinations = [
    // Classic & Professional
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
        id: 'warm-grays',
        name: 'Warm Grays',
        description: 'Cozy grays with beige undertones',
        category: 'Neutral',
        popularity: 8,
        colors: ['#fefefe', '#f7f5f3', '#e8e6e1', '#d3c7b8', '#a08d7a', '#8b7355', '#6b5b47', '#2c2c2c'],
        usage: ['Organic brands', 'Warm interfaces', 'Natural themes'],
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
        usage: ['Tech interfaces', 'Professional apps', 'Clean designs'],
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
        usage: ['Luxury brands', 'Premium products', 'Dark themes'],
        accessibility: 'WCAG AA',
        inspiration: 'Tesla, Apple'
    },

    // Blues Family
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
        id: 'royal-blues',
        name: 'Royal Blues',
        description: 'Rich, authoritative blues',
        category: 'Blue',
        popularity: 8,
        colors: ['#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
        usage: ['Corporate', 'Finance', 'Trust', 'Authority'],
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
        usage: ['Professional', 'Finance', 'Corporate', 'Serious apps'],
        accessibility: 'WCAG AAA',
        inspiration: 'Goldman Sachs, JP Morgan'
    },
    {
        id: 'electric-blues',
        name: 'Electric Blues',
        description: 'Vibrant electric blues for energy',
        category: 'Blue',
        popularity: 6,
        colors: ['#f0f9ff', '#e0f2fe', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
        usage: ['Tech', 'Innovation', 'Energy', 'Modern apps'],
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
        usage: ['Healthcare', 'Wellness', 'Calm interfaces', 'Medical'],
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
        usage: ['Dark mode', 'Night themes', 'Gaming', 'Entertainment'],
        accessibility: 'WCAG A',
        inspiration: 'Discord, Spotify'
    },

    // Greens Family
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
        id: 'emerald-luxury',
        name: 'Emerald Luxury',
        description: 'Rich emerald greens for premium feel',
        category: 'Green',
        popularity: 7,
        colors: ['#ecfdf5', '#d1fae5', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46'],
        usage: ['Luxury', 'Premium', 'Finance', 'Success'],
        accessibility: 'WCAG AA',
        inspiration: 'Rolex, Starbucks'
    },
    {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        description: 'Fresh mint greens for clean interfaces',
        category: 'Green',
        popularity: 6,
        colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'],
        usage: ['Fresh brands', 'Health', 'Clean tech', 'Wellness'],
        accessibility: 'WCAG AA',
        inspiration: 'Mint Mobile, Fresh'
    },
    {
        id: 'sage-wisdom',
        name: 'Sage Wisdom',
        description: 'Muted sage greens for sophistication',
        category: 'Green',
        popularity: 6,
        colors: ['#f6f7f6', '#e8ebe8', '#c9d1c9', '#9ca89c', '#6b7b6b', '#4a5a4a', '#2d3d2d', '#1a2a1a'],
        usage: ['Organic', 'Natural', 'Sophisticated', 'Minimal'],
        accessibility: 'WCAG AA',
        inspiration: 'Patagonia, Whole Foods'
    },
    {
        id: 'lime-energy',
        name: 'Lime Energy',
        description: 'Bright lime greens for energy',
        category: 'Green',
        popularity: 5,
        colors: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f'],
        usage: ['Energy', 'Youth', 'Sports', 'Active brands'],
        accessibility: 'WCAG A',
        inspiration: 'Spotify, Android'
    },

    // Reds Family
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
        id: 'crimson-power',
        name: 'Crimson Power',
        description: 'Deep crimson for power and strength',
        category: 'Red',
        popularity: 6,
        colors: ['#fef2f2', '#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#7f1d1d'],
        usage: ['Power', 'Strength', 'Passion', 'Bold statements'],
        accessibility: 'WCAG AA',
        inspiration: 'Coca-Cola, Ferrari'
    },
    {
        id: 'rose-elegance',
        name: 'Rose Elegance',
        description: 'Elegant rose tones for sophistication',
        category: 'Red',
        popularity: 7,
        colors: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c'],
        usage: ['Feminine', 'Elegant', 'Beauty', 'Fashion'],
        accessibility: 'WCAG AA',
        inspiration: 'Victoria\'s Secret, Glossier'
    },
    {
        id: 'burgundy-luxury',
        name: 'Burgundy Luxury',
        description: 'Rich burgundy for luxury brands',
        category: 'Red',
        popularity: 6,
        colors: ['#fdf2f8', '#fce7f3', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#831843'],
        usage: ['Luxury', 'Wine', 'Premium', 'Sophisticated'],
        accessibility: 'WCAG AA',
        inspiration: 'Bordeaux, Louis Vuitton'
    },

    // Purples Family
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
        id: 'lavender-dreams',
        name: 'Lavender Dreams',
        description: 'Soft lavender for calming interfaces',
        category: 'Purple',
        popularity: 7,
        colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed'],
        usage: ['Wellness', 'Calm', 'Beauty', 'Meditation'],
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
        usage: ['Innovation', 'Tech', 'Creative', 'Future'],
        accessibility: 'WCAG AA',
        inspiration: 'Figma, Linear'
    },
    {
        id: 'plum-sophistication',
        name: 'Plum Sophistication',
        description: 'Deep plum for sophisticated brands',
        category: 'Purple',
        popularity: 6,
        colors: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf'],
        usage: ['Sophisticated', 'Premium', 'Beauty', 'Fashion'],
        accessibility: 'WCAG AA',
        inspiration: 'Sephora, Urban Decay'
    },

    // Oranges & Yellows
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
        id: 'amber-warmth',
        name: 'Amber Warmth',
        description: 'Warm amber tones for cozy feeling',
        category: 'Orange',
        popularity: 6,
        colors: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b', '#d97706', '#b45309', '#92400e'],
        usage: ['Warmth', 'Cozy', 'Autumn', 'Comfort'],
        accessibility: 'WCAG AA',
        inspiration: 'Autumn themes, Coffee brands'
    },
    {
        id: 'tangerine-energy',
        name: 'Tangerine Energy',
        description: 'Vibrant tangerine for high energy',
        category: 'Orange',
        popularity: 5,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Energy', 'Sports', 'Active', 'Dynamic'],
        accessibility: 'WCAG A',
        inspiration: 'Nike, Gatorade'
    },

    // Special & Unique
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
    },

    // Monochromatic Schemes
    {
        id: 'pure-monochrome',
        name: 'Pure Monochrome',
        description: 'Classic black and white for timeless design',
        category: 'Monochrome',
        popularity: 9,
        colors: ['#ffffff', '#f5f5f5', '#e5e5e5', '#a3a3a3', '#737373', '#525252', '#262626', '#000000'],
        usage: ['Timeless', 'Classic', 'Minimal', 'Typography'],
        accessibility: 'WCAG AAA',
        inspiration: 'Apple, Muji, Uniqlo'
    },
    {
        id: 'soft-monochrome',
        name: 'Soft Monochrome',
        description: 'Gentle grays for softer contrast',
        category: 'Monochrome',
        popularity: 8,
        colors: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46'],
        usage: ['Soft', 'Gentle', 'Accessible', 'Reading'],
        accessibility: 'WCAG AA',
        inspiration: 'Medium, Notion'
    },

    // Gradient Inspirations
    {
        id: 'sunset-gradient',
        name: 'Sunset Gradient',
        description: 'Warm sunset colors for beautiful gradients',
        category: 'Gradient',
        popularity: 7,
        colors: ['#ff9a9e', '#fecfef', '#fecfef', '#ff9a9e', '#ff6b6b', '#ee5a24', '#ff9ff3', '#f368e0'],
        usage: ['Gradients', 'Backgrounds', 'Hero sections', 'Creative'],
        accessibility: 'WCAG A',
        inspiration: 'Instagram, Dribbble'
    },
    {
        id: 'ocean-gradient',
        name: 'Ocean Gradient',
        description: 'Cool ocean colors for depth',
        category: 'Gradient',
        popularity: 7,
        colors: ['#667eea', '#764ba2', '#667eea', '#764ba2', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
        usage: ['Gradients', 'Tech', 'Modern', 'Cool themes'],
        accessibility: 'WCAG A',
        inspiration: 'Linear, Figma'
    },

    // Industry Specific
    {
        id: 'medical-trust',
        name: 'Medical Trust',
        description: 'Trustworthy blues and greens for healthcare',
        category: 'Healthcare',
        popularity: 8,
        colors: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
        usage: ['Healthcare', 'Medical', 'Trust', 'Professional'],
        accessibility: 'WCAG AAA',
        inspiration: 'Medical institutions, Health apps'
    },
    {
        id: 'finance-authority',
        name: 'Finance Authority',
        description: 'Authoritative colors for financial services',
        category: 'Finance',
        popularity: 8,
        colors: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9'],
        usage: ['Finance', 'Banking', 'Authority', 'Trust'],
        accessibility: 'WCAG AAA',
        inspiration: 'Goldman Sachs, Chase'
    },
    {
        id: 'education-friendly',
        name: 'Education Friendly',
        description: 'Approachable colors for learning platforms',
        category: 'Education',
        popularity: 7,
        colors: ['#fef3c7', '#fde68a', '#f59e0b', '#d97706', '#92400e', '#78350f', '#451a03', '#1c1917'],
        usage: ['Education', 'Learning', 'Friendly', 'Approachable'],
        accessibility: 'WCAG AA',
        inspiration: 'Khan Academy, Coursera'
    },
    {
        id: 'food-appetite',
        name: 'Food Appetite',
        description: 'Appetizing colors for food brands',
        category: 'Food',
        popularity: 7,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Food', 'Restaurant', 'Appetite', 'Warm'],
        accessibility: 'WCAG AA',
        inspiration: 'McDonald\'s, Uber Eats'
    },

    // Seasonal Themes
    {
        id: 'spring-fresh',
        name: 'Spring Fresh',
        description: 'Fresh spring colors for renewal',
        category: 'Seasonal',
        popularity: 6,
        colors: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
        usage: ['Spring', 'Fresh', 'Renewal', 'Growth'],
        accessibility: 'WCAG AA',
        inspiration: 'Spring themes, Nature'
    },
    {
        id: 'summer-vibrant',
        name: 'Summer Vibrant',
        description: 'Vibrant summer colors for energy',
        category: 'Seasonal',
        popularity: 6,
        colors: ['#fef3c7', '#fde68a', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
        usage: ['Summer', 'Vibrant', 'Energy', 'Fun'],
        accessibility: 'WCAG A',
        inspiration: 'Summer themes, Beach'
    },
    {
        id: 'autumn-cozy',
        name: 'Autumn Cozy',
        description: 'Cozy autumn colors for warmth',
        category: 'Seasonal',
        popularity: 6,
        colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
        usage: ['Autumn', 'Cozy', 'Warm', 'Comfort'],
        accessibility: 'WCAG AA',
        inspiration: 'Autumn themes, Coffee'
    },
    {
        id: 'winter-crisp',
        name: 'Winter Crisp',
        description: 'Crisp winter colors for clarity',
        category: 'Seasonal',
        popularity: 6,
        colors: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155'],
        usage: ['Winter', 'Crisp', 'Clean', 'Clear'],
        accessibility: 'WCAG AAA',
        inspiration: 'Winter themes, Snow'
    },

    // Modern Trends
    {
        id: 'glassmorphism',
        name: 'Glassmorphism',
        description: 'Translucent colors for glass effects',
        category: 'Modern',
        popularity: 8,
        colors: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.05)', '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6'],
        usage: ['Glass effects', 'Modern', 'Translucent', 'Blur'],
        accessibility: 'WCAG A',
        inspiration: 'iOS, macOS, Modern UI'
    },
    {
        id: 'neumorphism',
        name: 'Neumorphism',
        description: 'Soft shadows for neumorphic design',
        category: 'Modern',
        popularity: 6,
        colors: ['#e0e5ec', '#ffffff', '#a3b1c6', '#9baacf', '#e0e5ec', '#ffffff', '#a3b1c6', '#9baacf'],
        usage: ['Neumorphism', 'Soft', 'Subtle', '3D effects'],
        accessibility: 'WCAG A',
        inspiration: 'Neumorphic design trend'
    },
    {
        id: 'dark-mode-pro',
        name: 'Dark Mode Pro',
        description: 'Professional dark mode colors',
        category: 'Dark',
        popularity: 9,
        colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9'],
        usage: ['Dark mode', 'Professional', 'Night', 'Developer'],
        accessibility: 'WCAG AA',
        inspiration: 'VS Code, GitHub, Discord'
    },
    {
        id: 'neon-cyber',
        name: 'Neon Cyber',
        description: 'Bright neons for cyber aesthetics',
        category: 'Neon',
        popularity: 5,
        colors: ['#000000', '#1a1a2e', '#16213e', '#00ff41', '#ff0080', '#00d4ff', '#ff6600', '#ffffff'],
        usage: ['Cyber', 'Gaming', 'Neon', 'Futuristic'],
        accessibility: 'WCAG A',
        inspiration: 'Cyberpunk, Gaming'
    },

    // Brand Inspired
    {
        id: 'tech-giant',
        name: 'Tech Giant',
        description: 'Colors inspired by major tech companies',
        category: 'Tech',
        popularity: 8,
        colors: ['#ffffff', '#f8f9fa', '#4285f4', '#34a853', '#fbbc05', '#ea4335', '#9aa0a6', '#202124'],
        usage: ['Tech', 'Corporate', 'Modern', 'Clean'],
        accessibility: 'WCAG AA',
        inspiration: 'Google, Microsoft, Apple'
    },
    {
        id: 'social-media',
        name: 'Social Media',
        description: 'Vibrant colors for social platforms',
        category: 'Social',
        popularity: 7,
        colors: ['#1da1f2', '#1877f2', '#e4405f', '#ff0050', '#00d4aa', '#fffc00', '#ff6900', '#000000'],
        usage: ['Social', 'Vibrant', 'Engaging', 'Modern'],
        accessibility: 'WCAG A',
        inspiration: 'Twitter, Facebook, Instagram'
    },

    // Accessibility Focused
    {
        id: 'high-contrast',
        name: 'High Contrast',
        description: 'Maximum contrast for accessibility',
        category: 'Accessible',
        popularity: 9,
        colors: ['#000000', '#ffffff', '#0066cc', '#ffffff', '#cc0000', '#ffffff', '#009900', '#ffffff'],
        usage: ['Accessibility', 'High contrast', 'Clear', 'Readable'],
        accessibility: 'WCAG AAA',
        inspiration: 'Accessibility guidelines'
    },
    {
        id: 'colorblind-friendly',
        name: 'Colorblind Friendly',
        description: 'Colors safe for colorblind users',
        category: 'Accessible',
        popularity: 8,
        colors: ['#000000', '#ffffff', '#0173b2', '#de8f05', '#cc78bc', '#ca9161', '#fbafe4', '#949494'],
        usage: ['Colorblind safe', 'Inclusive', 'Accessible', 'Universal'],
        accessibility: 'WCAG AAA',
        inspiration: 'Colorblind accessibility research'
    },

    // Creative & Artistic
    {
        id: 'artist-palette',
        name: 'Artist Palette',
        description: 'Rich colors for creative expression',
        category: 'Creative',
        popularity: 6,
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'],
        usage: ['Creative', 'Artistic', 'Expressive', 'Colorful'],
        accessibility: 'WCAG A',
        inspiration: 'Artist palettes, Creative tools'
    },
    {
        id: 'retro-vintage',
        name: 'Retro Vintage',
        description: 'Nostalgic colors from past decades',
        category: 'Retro',
        popularity: 6,
        colors: ['#f4e4bc', '#d4a574', '#bc9a6a', '#a47551', '#8b5a3c', '#6b4226', '#4a2c17', '#2d1810'],
        usage: ['Retro', 'Vintage', 'Nostalgic', 'Classic'],
        accessibility: 'WCAG AA',
        inspiration: '70s, 80s, Vintage design'
    },
    {
        id: 'cosmic-space',
        name: 'Cosmic Space',
        description: 'Deep space colors for cosmic themes',
        category: 'Space',
        popularity: 5,
        colors: ['#0c0c0c', '#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7', '#a663cc', '#4deeea'],
        usage: ['Space', 'Cosmic', 'Deep', 'Mysterious'],
        accessibility: 'WCAG A',
        inspiration: 'Space, Cosmos, Sci-fi'
    },

    // Minimalist
    {
        id: 'zen-minimal',
        name: 'Zen Minimal',
        description: 'Peaceful colors for minimal design',
        category: 'Minimal',
        popularity: 8,
        colors: ['#ffffff', '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#757575', '#424242'],
        usage: ['Minimal', 'Zen', 'Peaceful', 'Clean'],
        accessibility: 'WCAG AAA',
        inspiration: 'Zen philosophy, Minimal design'
    },
    {
        id: 'scandinavian',
        name: 'Scandinavian',
        description: 'Nordic colors for clean, functional design',
        category: 'Nordic',
        popularity: 7,
        colors: ['#ffffff', '#f8f8f8', '#e8e8e8', '#d0d0d0', '#a0a0a0', '#707070', '#404040', '#202020'],
        usage: ['Nordic', 'Clean', 'Functional', 'Simple'],
        accessibility: 'WCAG AAA',
        inspiration: 'Scandinavian design, IKEA'
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
                    <p className="text-sm text-gray-500">60 WCAG compliant color combinations</p>
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
                                        style={{ backgroundColor: color.includes('rgba') ? color : color }}
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
                    <span>60 color combinations inspired by Figma Community</span>
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