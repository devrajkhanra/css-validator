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
        boxShadow: <div className="w-4 h-4 bg-slate-400 rounded-sm shadow-sm"></div>
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
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors rounded-lg"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Settings className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Design Tokens</h2>
                        <p className="text-sm text-slate-600">WCAG compliant design system</p>
                    </div>
                </div>
                <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            
            {isOpen && (
                <div className="px-4 pb-4 space-y-6 max-h-96 overflow-y-auto">
                    <div className="grid gap-6">
                        {Object.entries(local).map(([key, values]) => (
                            <div key={key} className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="mt-1 text-indigo-600">
                                        {tokenIcons[key as keyof typeof tokenIcons]}
                                    </div>
                                    <div className="flex-1">
                                        <label className="font-medium text-slate-900 capitalize block">
                                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                        </label>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {tokenDescriptions[key as keyof typeof tokenDescriptions]}
                                        </p>
                                    </div>
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        {values.length} tokens
                                    </span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        className="w-full p-3 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
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
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Update Design Tokens
                    </button>
                </div>
            )}
        </div>
    );
};

export default TokenEditor;