import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Download, Wrench, Copy, Check, Info, Zap } from 'lucide-react';

type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
    suggestedFix?: string;
    confidence?: number;
    reasoning?: string;
    modernUnit?: string;
    line?: number;
    column?: number;
};

type Props = {
    violations: Violation[];
    css?: string;
    fixedCSS?: string;
    onFixErrors?: () => void;
};

const ReportViewer: React.FC<Props> = ({ violations, css, fixedCSS, onFixErrors }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const downloadCSS = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const getConfidenceColor = (confidence?: number) => {
        if (!confidence) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        if (confidence >= 0.8) return 'bg-green-500/20 text-green-300 border-green-500/30';
        if (confidence >= 0.5) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        return 'bg-red-500/20 text-red-300 border-red-500/30';
    };

    const getConfidenceText = (confidence?: number) => {
        if (!confidence) return 'Unknown';
        if (confidence >= 0.8) return 'High';
        if (confidence >= 0.5) return 'Medium';
        return 'Low';
    };

    if (!css) {
        return (
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full">
                <div className="text-center py-12">
                    <div className="p-4 bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Upload a CSS file to see validation results</p>
                </div>
            </div>
        );
    }

    const errorCount = violations.length;
    const highConfidenceCount = violations.filter(v => (v.confidence || 0) >= 0.8).length;

    return (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Validation Results</h2>
                </div>
                <div className="flex items-center gap-2">
                    {violations.length > 0 && (
                        <>
                            <div className="flex items-center gap-1 text-xs">
                                <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full font-medium border border-red-500/30">
                                    {errorCount} Issues
                                </span>
                                {highConfidenceCount > 0 && (
                                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium border border-green-500/30">
                                        {highConfidenceCount} High Confidence
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onFixErrors}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-colors"
                            >
                                <Wrench className="w-4 h-4" />
                                Auto-fix
                            </button>
                        </>
                    )}
                </div>
            </div>

            {violations.length === 0 ? (
                <div className="text-center py-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50"></div>
                        <div className="relative p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <p className="text-green-400 font-medium mb-2">Perfect compliance!</p>
                    <p className="text-gray-300 text-sm mb-4">Your CSS follows all design token guidelines</p>
                    <button
                        onClick={() => downloadCSS(css, 'validated-styles.css')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download CSS
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
                        {violations.map((violation, index) => (
                            <div key={index} className="border rounded-xl p-4 bg-black/30 border-white/10 hover:bg-black/40 hover:border-white/20 transition-all">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <code className="text-sm font-mono px-2 py-1 rounded border bg-black/40 text-gray-300 border-white/20">
                                                {violation.selector}
                                            </code>
                                            {violation.line && (
                                                <span className="text-xs text-gray-500">
                                                    Line {violation.line}
                                                </span>
                                            )}
                                            {violation.confidence && (
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getConfidenceColor(violation.confidence)}`}>
                                                    {getConfidenceText(violation.confidence)} Confidence
                                                </span>
                                            )}
                                            {violation.modernUnit && (
                                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded flex items-center gap-1 border border-blue-500/30">
                                                    <Zap className="w-3 h-3" />
                                                    Modern {violation.modernUnit}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="text-sm text-gray-300 mb-2">
                                            <span className="font-medium">{violation.property}:</span> 
                                            <code className="ml-1 bg-red-500/20 text-red-300 px-1 rounded">{violation.value}</code>
                                            {violation.suggestedFix && (
                                                <>
                                                    <span className="mx-2 text-gray-500">→</span>
                                                    <code className="bg-green-500/20 text-green-300 px-1 rounded">{violation.suggestedFix}</code>
                                                </>
                                            )}
                                        </div>
                                        
                                        <p className="text-sm text-gray-300 mb-3">
                                            {violation.message}
                                        </p>
                                        
                                        {violation.reasoning && (
                                            <div className="mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="flex items-start gap-2">
                                                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                                    <p className="text-xs text-blue-300">{violation.reasoning}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {violation.suggestedFix && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">Copy fix:</span>
                                                <code className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30">
                                                    {violation.property}: {violation.suggestedFix}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(`${violation.property}: ${violation.suggestedFix};`, index)}
                                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                                    title="Copy suggested fix"
                                                >
                                                    {copiedIndex === index ? (
                                                        <Check className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {fixedCSS && fixedCSS !== css && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-300">
                                    Fixed CSS available with {violations.filter(v => v.suggestedFix).length} auto-corrections
                                </p>
                                <button
                                    onClick={() => downloadCSS(fixedCSS, 'fixed-styles.css')}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Fixed CSS
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportViewer;