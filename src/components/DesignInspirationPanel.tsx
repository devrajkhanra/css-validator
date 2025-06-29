import React, { useState, useEffect } from 'react';
import { Palette, TrendingUp, Lightbulb, ExternalLink, Star, Copy, Check } from 'lucide-react';
import { DesignInspirationSystem, type DesignSuggestion } from '../utils/designInspirationSystem';
import type { DesignTokens } from '../types/DesignToken';

type Props = {
    tokens: DesignTokens;
    onApplyTrend: (trendTokens: Partial<DesignTokens>) => void;
    projectType?: 'dashboard' | 'landing' | 'app' | 'portfolio' | 'ecommerce';
};

const DesignInspirationPanel: React.FC<Props> = ({ tokens, onApplyTrend, projectType = 'app' }) => {
    const [suggestions, setSuggestions] = useState<DesignSuggestion[]>([]);
    const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
    const [copiedExample, setCopiedExample] = useState<string | null>(null);
    const [inspirationSystem] = useState(new DesignInspirationSystem());

    useEffect(() => {
        const newSuggestions = inspirationSystem.analyzeProject(tokens, projectType);
        setSuggestions(newSuggestions.slice(0, 6)); // Show top 6 suggestions
    }, [tokens, projectType, inspirationSystem]);

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedExample(id);
            setTimeout(() => setCopiedExample(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const getApplicabilityColor = (applicability: number) => {
        if (applicability >= 0.8) return 'bg-green-100 text-green-800';
        if (applicability >= 0.6) return 'bg-yellow-100 text-yellow-800';
        return 'bg-blue-100 text-blue-800';
    };

    const getApplicabilityText = (applicability: number) => {
        if (applicability >= 0.8) return 'Highly Recommended';
        if (applicability >= 0.6) return 'Good Fit';
        return 'Consider';
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'color': return <Palette className="w-4 h-4" />;
            case 'typography': return <span className="w-4 h-4 font-bold text-sm">Aa</span>;
            case 'layout': return <div className="w-4 h-4 border border-current rounded"></div>;
            case 'interaction': return <TrendingUp className="w-4 h-4" />;
            default: return <Lightbulb className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Design Inspiration</h2>
                    <p className="text-sm text-gray-500">Trending patterns from Dribbble & Behance</p>
                </div>
            </div>

            {suggestions.length === 0 ? (
                <div className="text-center py-8">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Lightbulb className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Analyzing design trends...</p>
                </div>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                    {suggestions.map((suggestion, index) => (
                        <div 
                            key={suggestion.trend.id}
                            className={`border rounded-xl p-4 transition-all cursor-pointer ${
                                selectedTrend === suggestion.trend.id 
                                    ? 'border-purple-300 bg-purple-50/50' 
                                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                            }`}
                            onClick={() => setSelectedTrend(
                                selectedTrend === suggestion.trend.id ? null : suggestion.trend.id
                            )}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                                        {getCategoryIcon(suggestion.trend.category)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-gray-800">{suggestion.trend.name}</h3>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span className="text-xs text-gray-500">{suggestion.trend.popularity}/10</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{suggestion.trend.description}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getApplicabilityColor(suggestion.applicability)}`}>
                                                {getApplicabilityText(suggestion.applicability)}
                                            </span>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                {suggestion.trend.category}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                                {suggestion.trend.inspiration.source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onApplyTrend(suggestion.trend.tokens);
                                    }}
                                    className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>

                            {selectedTrend === suggestion.trend.id && (
                                <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Why this trend?</h4>
                                        <p className="text-sm text-gray-600">{suggestion.reasoning}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Implementation Examples</h4>
                                        <div className="space-y-2">
                                            {suggestion.trend.examples.map((example, exampleIndex) => (
                                                <div key={exampleIndex} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                                                    <code className="text-xs font-mono text-gray-700 flex-1">{example}</code>
                                                    <button
                                                        onClick={() => copyToClipboard(example, `${suggestion.trend.id}-${exampleIndex}`)}
                                                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                        title="Copy CSS"
                                                    >
                                                        {copiedExample === `${suggestion.trend.id}-${exampleIndex}` ? (
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
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Inspiration Keywords</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {suggestion.trend.inspiration.keywords.map((keyword, keywordIndex) => (
                                                <span key={keywordIndex} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className="text-xs text-gray-500">
                                            Style Guide: {suggestion.trend.inspiration.styleGuide}
                                        </span>
                                        <button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700">
                                            <ExternalLink className="w-3 h-3" />
                                            View on {suggestion.trend.inspiration.source}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Trends updated from design communities</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>Live inspiration feed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignInspirationPanel;