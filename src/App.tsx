import { useState } from 'react';
import { CheckCircle, Table as Tabs } from 'lucide-react';
import TokenEditor from './components/TokenEditor';
import FileUploader from './components/FileUploader';
import ProjectUploader from './components/ProjectUploader';
import ReportViewer from './components/ReportViewer';
import ProjectReportViewer from './components/ProjectReportViewer';
import DesignInspirationPanel from './components/DesignInspirationPanel';
import { defaultTokens } from './utils/defaultTokens';
import type { DesignTokens, ProjectValidationResult } from './types/DesignToken';
import { validateCSS, type ValidationResult } from './utils/cssValidator';
import { validateProject } from './utils/projectValidator';

function App() {
    const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);
    const [validationResult, setValidationResult] = useState<ValidationResult>({ violations: [], fixedCSS: '' });
    const [projectResult, setProjectResult] = useState<ProjectValidationResult | undefined>();
    const [css, setCSS] = useState('');
    const [isTokenEditorOpen, setIsTokenEditorOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'single' | 'project'>('single');

    const runSingleFileValidation = async (code: string) => {
        setCSS(code);
        const result = await validateCSS(code, tokens);
        setValidationResult(result);
    };

    const runProjectValidation = async (files: { [filePath: string]: string }) => {
        const result = await validateProject(files, tokens);
        setProjectResult(result);
    };

    const handleFixSingleFileErrors = () => {
        if (validationResult.fixedCSS && validationResult.fixedCSS !== css) {
            runSingleFileValidation(validationResult.fixedCSS);
        }
    };

    const handleFixProjectErrors = () => {
        if (projectResult?.fixedFiles) {
            // In a real implementation, you might want to show a preview or apply fixes
            console.log('Fixed files:', projectResult.fixedFiles);
        }
    };

    const handleApplyTrend = (trendTokens: Partial<DesignTokens>) => {
        const updatedTokens = { ...tokens };
        
        // Merge trend tokens with existing tokens
        Object.entries(trendTokens).forEach(([key, values]) => {
            if (values && Array.isArray(values)) {
                const tokenKey = key as keyof DesignTokens;
                // Add new tokens while keeping existing ones
                const existingTokens = updatedTokens[tokenKey] || [];
                const newTokens = values.filter(token => !existingTokens.includes(token));
                updatedTokens[tokenKey] = [...existingTokens, ...newTokens];
            }
        });
        
        setTokens(updatedTokens);
        
        // Re-validate if there's existing content
        if (css) {
            runSingleFileValidation(css);
        }
        if (projectResult) {
            // Re-validate project if needed
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                            Design Token Validator
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        WCAG compliance validation with AI-powered design inspiration from Dribbble & Behance
                    </p>
                </header>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('single')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeTab === 'single'
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-white/50'
                                }`}
                            >
                                Single File Validation
                            </button>
                            <button
                                onClick={() => setActiveTab('project')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeTab === 'project'
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-white/50'
                                }`}
                            >
                                Project Validation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <TokenEditor
                            tokens={tokens}
                            onChange={setTokens}
                            isOpen={isTokenEditorOpen}
                            onToggle={() => setIsTokenEditorOpen(!isTokenEditorOpen)}
                        />
                        
                        {activeTab === 'single' ? (
                            <FileUploader onUpload={runSingleFileValidation} />
                        ) : (
                            <ProjectUploader onUpload={runProjectValidation} />
                        )}

                        {/* Design Inspiration Panel */}
                        <DesignInspirationPanel 
                            tokens={tokens}
                            onApplyTrend={handleApplyTrend}
                            projectType="app"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6 h-full">
                        {activeTab === 'single' ? (
                            <ReportViewer 
                                violations={validationResult.violations} 
                                css={css}
                                fixedCSS={validationResult.fixedCSS}
                                onFixErrors={handleFixSingleFileErrors}
                            />
                        ) : (
                            <ProjectReportViewer 
                                result={projectResult}
                                onFixErrors={handleFixProjectErrors}
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-sm text-gray-500 mt-16">
                    <p>Built with React, TypeScript & Tailwind CSS • WCAG AA Compliant • AI-Powered Design Inspiration</p>
                </footer>
            </div>
        </div>
    );
}

export default App;