import React, { useState } from 'react';
import { Settings, Palette, Type, Square, Layers, Zap, Radius } from 'lucide-react';
import type { DesignTokens } from '../types/DesignToken';

type Props = {
    tokens: DesignTokens;
    onChange: (tokens: DesignTokens) => void;
    isOpen: boolean;
    onToggle: () => void;
};

const TokenEditor: React.FC<Props> = ({ tokens, onChange, isOpen, onToggle }) => {
    const [local, setLocal] = useState(tokens);

    const update = () => onChange(local);

    const tokenIcons = {
        colors: <Palette className="w-4 h-4" />,
        spacing: <Square className="w-4 h-4" />,
        fontSizes: <Type className="w-4 h-4" />,
        lineHeights: <Layers className="w-4 h-4" />,
        fontWeights: <Zap className="w-4 h-4" />,
        borderRadius: <Radius className="w-4 h-4" />,
        boxShadow: <div className="w-4 h-4 bg-gray-400 rounded-sm shadow-sm"></div>
    };

    const tokenDescriptions = {
        colors: 'WCAG AA compliant colors with proper contrast ratios',
        spacing: 'Consistent spacing scale following 8px grid system',
        fontSizes: 'Typography scale with minimum 16px for body text',
        lineHeights: 'Line heights for optimal readability',
        fontWeights: 'Font weight scale for typography hierarchy',
        borderRadius: 'Border radius values for consistent rounded corners',
        boxShadow: 'Shadow system for depth and elevation'
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
            <button
                onClick={onToggle}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/30 transition-colors rounded-2xl"
            >
                <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Design Tokens</h2>
                        <p className="text-sm text-gray-500">WCAG compliant design system</p>
                    </div>
                </div>
                <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            
            {isOpen && (
                <div className="px-6 pb-6 space-y-6 max-h-96 overflow-y-auto scrollbar-thin">
                    <div className="grid gap-6">
                        {Object.entries(local).map(([key, values]) => (
                            <div key={key} className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="mt-1">
                                        {tokenIcons[key as keyof typeof tokenIcons]}
                                    </div>
                                    <div className="flex-1">
                                        <label className="font-medium text-gray-700 capitalize block">
                                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {tokenDescriptions[key as keyof typeof tokenDescriptions]}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                        {values.length} tokens
                                    </span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        className="w-full p-4 border border-gray-200 rounded-xl text-sm font-mono bg-gray-50/50 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all resize-none scrollbar-thin"
                                        rows={4}
                                        value={values.join('\n')}
                                        onChange={(e) =>
                                            setLocal({
                                                ...local,
                                                [key]: e.target.value.split('\n').map((v) => v.trim()).filter(Boolean),
                                            })
                                        }
                                        placeholder={`Enter ${key} values (one per line)...`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button
                        onClick={update}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                        Update Design Tokens
                    </button>
                </div>
            )}
        </div>
    );
};

export default TokenEditor;