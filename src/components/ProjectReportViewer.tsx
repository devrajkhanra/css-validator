import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Download, Wrench, Copy, Check, FileText, ChevronDown, ChevronRight, Info, AlertCircle, XCircle } from 'lucide-react';
import type { ProjectViolation, ProjectValidationResult } from '../types/DesignToken';

type Props = {
    result?: ProjectValidationResult;
    onFixErrors?: () => void;
};

const ProjectReportViewer: React.FC<Props> = ({ result, onFixErrors }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
    const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'error' | 'warning' | 'info'>('all');

    if (!result) {
        return (
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full">
                <div className="text-center py-12">
                    <div className="p-4 bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Upload a project folder to see validation results</p>
                </div>
            </div>
        );
    }

    const { violations, fixedFiles, summary } = result;

    const downloadFile = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadAllFixed = () => {
        Object.entries(fixedFiles).forEach(([filePath, content]) => {
            const fileName = filePath.split('/').pop() || 'fixed-file';
            downloadFile(content, `fixed-${fileName}`);
        });
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

    const toggleFileExpansion = (filePath: string) => {
        const newExpanded = new Set(expandedFiles);
        if (newExpanded.has(filePath)) {
            newExpanded.delete(filePath);
        } else {
            newExpanded.add(filePath);
        }
        setExpandedFiles(newExpanded);
    };

    const getSeverityIcon = (severity: ProjectViolation['severity']) => {
        switch (severity) {
            case 'error':
                return <XCircle className="w-5 h-5 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const getSeverityColor = (severity: ProjectViolation['severity']) => {
        switch (severity) {
            case 'error':
                return 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20';
            case 'warning':
                return 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20';
            case 'info':
                return 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20';
        }
    };

    const filteredViolations = selectedSeverity === 'all' 
        ? violations 
        : violations.filter(v => v.severity === selectedSeverity);

    const violationsByFile = filteredViolations.reduce((acc, violation) => {
        if (!acc[violation.filePath]) {
            acc[violation.filePath] = [];
        }
        acc[violation.filePath].push(violation);
        return acc;
    }, {} as { [filePath: string]: ProjectViolation[] });

    return (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Project Validation Results</h2>
                </div>
                <div className="flex items-center gap-2">
                    {summary.totalViolations > 0 && (
                        <>
                            <div className="flex items-center gap-1 text-xs">
                                <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full font-medium border border-red-500/30">
                                    {summary.errorCount} Errors
                                </span>
                                {summary.warningCount > 0 && (
                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full font-medium border border-yellow-500/30">
                                        {summary.warningCount} Warnings
                                    </span>
                                )}
                                {summary.infoCount > 0 && (
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium border border-blue-500/30">
                                        {summary.infoCount} Info
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onFixErrors}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-colors"
                            >
                                <Wrench className="w-4 h-4" />
                                Auto-fix All
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-white">{summary.totalFiles}</div>
                    <div className="text-xs text-gray-400">Total Files</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-red-400">{summary.filesWithIssues}</div>
                    <div className="text-xs text-gray-400">Files with Issues</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-orange-400">{summary.totalViolations}</div>
                    <div className="text-xs text-gray-400">Total Issues</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-green-400">{Object.keys(fixedFiles).length}</div>
                    <div className="text-xs text-gray-400">Fixable Files</div>
                </div>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-300">Filter by severity:</span>
                {(['all', 'error', 'warning', 'info'] as const).map(severity => (
                    <button
                        key={severity}
                        onClick={() => setSelectedSeverity(severity)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            selectedSeverity === severity
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                        {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                        {severity !== 'all' && (
                            <span className="ml-1">
                                ({severity === 'error' ? summary.errorCount : 
                                  severity === 'warning' ? summary.warningCount : summary.infoCount})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {summary.totalViolations === 0 ? (
                <div className="text-center py-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50"></div>
                        <div className="relative p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <p className="text-green-400 font-medium mb-2">Perfect compliance!</p>
                    <p className="text-gray-300 text-sm mb-4">Your project follows all design token guidelines</p>
                    <button
                        onClick={downloadAllFixed}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Project
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
                        {Object.entries(violationsByFile).map(([filePath, fileViolations]) => (
                            <div key={filePath} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                                {/* File Header */}
                                <button
                                    onClick={() => toggleFileExpansion(filePath)}
                                    className="w-full p-4 bg-black/30 hover:bg-black/40 flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <div className="text-left">
                                            <div className="font-medium text-white">{filePath}</div>
                                            <div className="text-sm text-gray-400">
                                                {fileViolations.length} issue{fileViolations.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {fileViolations.filter(v => v.severity === 'error').length > 0 && (
                                                <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">
                                                    {fileViolations.filter(v => v.severity === 'error').length}E
                                                </span>
                                            )}
                                            {fileViolations.filter(v => v.severity === 'warning').length > 0 && (
                                                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                                                    {fileViolations.filter(v => v.severity === 'warning').length}W
                                                </span>
                                            )}
                                            {fileViolations.filter(v => v.severity === 'info').length > 0 && (
                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                                                    {fileViolations.filter(v => v.severity === 'info').length}I
                                                </span>
                                            )}
                                        </div>
                                        {expandedFiles.has(filePath) ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {/* File Violations */}
                                {expandedFiles.has(filePath) && (
                                    <div className="p-4 space-y-3 bg-black/40">
                                        {fileViolations.map((violation, index) => (
                                            <div key={index} className={`border rounded-lg p-4 transition-all ${getSeverityColor(violation.severity)}`}>
                                                <div className="flex items-start gap-3">
                                                    {getSeverityIcon(violation.severity)}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <code className="text-sm font-mono px-2 py-1 rounded border bg-black/40 text-gray-300 border-white/20">
                                                                {violation.elementPath}
                                                            </code>
                                                            {violation.line && (
                                                                <span className="text-xs text-gray-500">
                                                                    Line {violation.line}
                                                                </span>
                                                            )}
                                                            {violation.wcagRule && (
                                                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                                                                    {violation.wcagRule}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-300 mb-2">
                                                            <span className="font-medium">{violation.property}:</span> 
                                                            <code className="ml-1 bg-red-500/20 text-red-300 px-1 rounded">{violation.value}</code>
                                                        </div>
                                                        <p className="text-sm text-gray-300 mb-3">
                                                            {violation.message}
                                                        </p>
                                                        
                                                        {/* Context Information */}
                                                        {violation.context.cascadingImpact.length > 0 && (
                                                            <div className="mb-3">
                                                                <span className="text-xs text-gray-500 block mb-1">Cascading Impact:</span>
                                                                <div className="text-xs text-gray-400 space-y-1">
                                                                    {violation.context.cascadingImpact.map((impact, i) => (
                                                                        <div key={i} className="bg-black/40 px-2 py-1 rounded">
                                                                            {impact}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {violation.suggestedFix && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-gray-500">Suggested fix:</span>
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
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {Object.keys(fixedFiles).length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-300">
                                    {Object.keys(fixedFiles).length} file{Object.keys(fixedFiles).length !== 1 ? 's' : ''} with auto-corrections available
                                </p>
                                <button
                                    onClick={downloadAllFixed}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download All Fixed Files
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectReportViewer;