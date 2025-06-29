import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

type Violation = {
    selector: string;
    property: string;
    value: string;
    message: string;
};

type Props = {
    violations: Violation[];
    css?: string;
};

const ReportViewer: React.FC<Props> = ({ violations, css }) => {
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

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Validation Results</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    violations.length === 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {violations.length === 0 ? 'All Good!' : `${violations.length} Issues`}
                </div>
            </div>

            {violations.length === 0 ? (
                <div className="text-center py-8">
                    <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-green-700 font-medium mb-2">Perfect compliance!</p>
                    <p className="text-gray-600 text-sm">Your CSS follows all design token guidelines</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {violations.map((violation, index) => (
                        <div key={index} className="bg-red-50/50 border border-red-200/50 rounded-xl p-4 hover:bg-red-50 transition-colors">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <code className="text-sm font-mono bg-white px-2 py-1 rounded text-red-700 border">
                                            {violation.selector}
                                        </code>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">{violation.property}:</span> 
                                        <code className="ml-1 bg-gray-100 px-1 rounded">{violation.value}</code>
                                    </div>
                                    <p className="text-sm text-red-700">{violation.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportViewer;