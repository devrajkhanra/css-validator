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
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="text-center py-12">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Upload a project folder to see validation results</p>
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
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getSeverityColor = (severity: ProjectViolation['severity']) => {
        switch (severity) {
            case 'error':
                return 'bg-red-50/50 border-red-200/50 hover:bg-red-50';
            case 'warning':
                return 'bg-yellow-50/50 border-yellow-200/50 hover:bg-yellow-50';
            case 'info':
                return 'bg-blue-50/50 border-blue-200/50 hover:bg-blue-50';
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
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 flex flex-col h-full max-h-[800px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Project Validation Results</h2>
                <div className="flex items-center gap-2">
                    {summary.totalViolations > 0 && (
                        <>
                            <div className="flex items-center gap-1 text-xs">
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                                    {summary.errorCount} Errors
                                </span>
                                {summary.warningCount > 0 && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                                        {summary.warningCount} Warnings
                                    </span>
                                )}
                                {summary.infoCount > 0 && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                        {summary.infoCount} Info
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onFixErrors}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
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
                <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-800">{summary.totalFiles}</div>
                    <div className="text-xs text-gray-600">Total Files</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{summary.filesWithIssues}</div>
                    <div className="text-xs text-gray-600">Files with Issues</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600">{summary.totalViolations}</div>
                    <div className="text-xs text-gray-600">Total Issues</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{Object.keys(fixedFiles).length}</div>
                    <div className="text-xs text-gray-600">Fixable Files</div>
                </div>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Filter by severity:</span>
                {(['all', 'error', 'warning', 'info'] as const).map(severity => (
                    <button
                        key={severity}
                        onClick={() => setSelectedSeverity(severity)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            selectedSeverity === severity
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-green-700 font-medium mb-2">Perfect compliance!</p>
                    <p className="text-gray-600 text-sm mb-4">Your project follows all design token guidelines</p>
                    <button
                        onClick={downloadAllFixed}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Project
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
                        {Object.entries(violationsByFile).map(([filePath, fileViolations]) => (
                            <div key={filePath} className="border border-gray-200 rounded-xl overflow-hidden">
                                {/* File Header */}
                                <button
                                    onClick={() => toggleFileExpansion(filePath)}
                                    className="w-full p-4 bg-gray-50/50 hover:bg-gray-100/50 flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-gray-500" />
                                        <div className="text-left">
                                            <div className="font-medium text-gray-800">{filePath}</div>
                                            <div className="text-sm text-gray-500">
                                                {fileViolations.length} issue{fileViolations.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {fileViolations.filter(v => v.severity === 'error').length > 0 && (
                                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                    {fileViolations.filter(v => v.severity === 'error').length}E
                                                </span>
                                            )}
                                            {fileViolations.filter(v => v.severity === 'warning').length > 0 && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                    {fileViolations.filter(v => v.severity === 'warning').length}W
                                                </span>
                                            )}
                                            {fileViolations.filter(v => v.severity === 'info').length > 0 && (
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
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
                                    <div className="p-4 space-y-3 bg-white/30">
                                        {fileViolations.map((violation, index) => (
                                            <div key={index} className={`border rounded-lg p-4 transition-all ${getSeverityColor(violation.severity)}`}>
                                                <div className="flex items-start gap-3">
                                                    {getSeverityIcon(violation.severity)}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <code className="text-sm font-mono px-2 py-1 rounded border bg-white text-gray-700 border-gray-200">
                                                                {violation.elementPath}
                                                            </code>
                                                            {violation.line && (
                                                                <span className="text-xs text-gray-500">
                                                                    Line {violation.line}
                                                                </span>
                                                            )}
                                                            {violation.wcagRule && (
                                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                                    {violation.wcagRule}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-600 mb-2">
                                                            <span className="font-medium">{violation.property}:</span> 
                                                            <code className="ml-1 bg-gray-100 px-1 rounded">{violation.value}</code>
                                                        </div>
                                                        <p className="text-sm text-gray-700 mb-3">
                                                            {violation.message}
                                                        </p>
                                                        
                                                        {/* Context Information */}
                                                        {violation.context.cascadingImpact.length > 0 && (
                                                            <div className="mb-3">
                                                                <span className="text-xs text-gray-500 block mb-1">Cascading Impact:</span>
                                                                <div className="text-xs text-gray-600 space-y-1">
                                                                    {violation.context.cascadingImpact.map((impact, i) => (
                                                                        <div key={i} className="bg-gray-100 px-2 py-1 rounded">
                                                                            {impact}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

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
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {Object.keys(fixedFiles).length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    {Object.keys(fixedFiles).length} file{Object.keys(fixedFiles).length !== 1 ? 's' : ''} with auto-corrections available
                                </p>
                                <button
                                    onClick={downloadAllFixed}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
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