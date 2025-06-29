import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Download, Wrench, Copy, Check } from 'lucide-react';

type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
    suggestedFix?: string;
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

    if (!css) {
        return (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="text-center py-12">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Upload a CSS file to see validation results</p>
                </div>
            </div>
        );
    }

    const errorCount = violations.length;
    const warningCount = violations.filter(v => v.property === 'color contrast').length;
    const criticalCount = errorCount - warningCount;

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 flex flex-col h-full max-h-[800px]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Validation Results</h2>
                <div className="flex items-center gap-2">
                    {violations.length > 0 && (
                        <>
                            <div className="flex items-center gap-1 text-xs">
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                                    {criticalCount} Errors
                                </span>
                                {warningCount > 0 && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                                        {warningCount} Warnings
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onFixErrors}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Wrench className="w-4 h-4" />
                                Auto-fix
                            </button>
                        </>
                    )}
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        violations.length === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {violations.length === 0 ? 'All Good!' : `${violations.length} Issues`}
                    </div>
                </div>
            </div>

            {violations.length === 0 ? (
                <div className="text-center py-8">
                    <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-green-700 font-medium mb-2">Perfect compliance!</p>
                    <p className="text-gray-600 text-sm mb-4">Your CSS follows all design token guidelines</p>
                    <button
                        onClick={() => downloadCSS(css, 'validated-styles.css')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download CSS
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
                        {violations.map((violation, index) => (
                            <div key={index} className={`border rounded-xl p-4 hover:shadow-sm transition-all ${
                                violation.property === 'color contrast' 
                                    ? 'bg-yellow-50/50 border-yellow-200/50 hover:bg-yellow-50' 
                                    : 'bg-red-50/50 border-red-200/50 hover:bg-red-50'
                            }`}>
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                        violation.property === 'color contrast' ? 'text-yellow-500' : 'text-red-500'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <code className={`text-sm font-mono px-2 py-1 rounded border ${
                                                violation.property === 'color contrast' 
                                                    ? 'bg-white text-yellow-700 border-yellow-200' 
                                                    : 'bg-white text-red-700 border-red-200'
                                            }`}>
                                                {violation.selector}
                                            </code>
                                            {violation.line && (
                                                <span className="text-xs text-gray-500">
                                                    Line {violation.line}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">{violation.property}:</span> 
                                            <code className="ml-1 bg-gray-100 px-1 rounded">{violation.value}</code>
                                        </div>
                                        <p className={`text-sm mb-3 ${
                                            violation.property === 'color contrast' ? 'text-yellow-700' : 'text-red-700'
                                        }`}>
                                            {violation.message}
                                        </p>
                                        {violation.suggestedFix && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">Suggested fix:</span>
                                                <code className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded border border-green-200">
                                                    {violation.property}: {violation.suggestedFix}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(`${violation.property}: ${violation.suggestedFix};`, index)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                    title="Copy suggested fix"
                                                >
                                                    {copiedIndex === index ? (
                                                        <Check className="w-3 h-3 text-green-600" />
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
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Fixed CSS available with {violations.filter(v => v.suggestedFix).length} auto-corrections
                                </p>
                                <button
                                    onClick={() => downloadCSS(fixedCSS, 'fixed-styles.css')}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
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