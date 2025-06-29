import { useState } from 'react';
import { CheckCircle, Zap, Cpu, Layers, Sparkles, BarChart3, Settings, Users, Activity } from 'lucide-react';
import TokenEditor from './components/TokenEditor';
import FileUploader from './components/FileUploader';
import ProjectUploader from './components/ProjectUploader';
import ReportViewer from './components/ReportViewer';
import ProjectReportViewer from './components/ProjectReportViewer';
import DesignInspirationPanel from './components/DesignInspirationPanel';
import DesignStyleSelector, { type DesignStyle } from './components/DesignStyleSelector';
import ColorGuidePanel from './components/ColorGuidePanel';
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
    const [selectedDesignStyle, setSelectedDesignStyle] = useState<string | undefined>();
    const [projectType, setProjectType] = useState<'dashboard' | 'landing' | 'app' | 'portfolio' | 'ecommerce'>('app');

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
            console.log('Fixed files:', projectResult.fixedFiles);
        }
    };

    const handleApplyTrend = (trendTokens: Partial<DesignTokens>) => {
        const updatedTokens = { ...tokens };
        
        // Merge trend tokens with existing tokens
        Object.entries(trendTokens).forEach(([key, values]) => {
            if (values && Array.isArray(values)) {
                const tokenKey = key as keyof DesignTokens;
                // Replace existing tokens with new ones for immediate effect
                updatedTokens[tokenKey] = values;
            }
        });
        
        setTokens(updatedTokens);
        
        // Re-validate if there's existing content
        if (css) {
            runSingleFileValidation(css);
        }
        if (projectResult) {
            // Re-validate project with new tokens
            const files = Object.keys(projectResult.fixedFiles).reduce((acc, filePath) => {
                acc[filePath] = projectResult.fixedFiles[filePath];
                return acc;
            }, {} as { [filePath: string]: string });
            if (Object.keys(files).length > 0) {
                runProjectValidation(files);
            }
        }
    };

    const handleStyleSelect = (style: DesignStyle) => {
        setSelectedDesignStyle(style.id);
        
        // Apply the style's design tokens immediately
        const styleTokens: Partial<DesignTokens> = {
            colors: style.colorSchemes.flatMap(scheme => scheme.colors),
            spacing: style.spacing,
            borderRadius: style.borderRadius,
            fontWeights: style.typography.weights
        };
        
        handleApplyTrend(styleTokens);
    };

    const handleColorSelect = (colors: string[]) => {
        const updatedTokens = { ...tokens };
        // Replace colors for immediate visual effect
        updatedTokens.colors = colors;
        setTokens(updatedTokens);
        
        // Re-validate if there's existing content
        if (css) {
            runSingleFileValidation(css);
        }
        if (projectResult) {
            // Re-validate project with new colors
            const files = Object.keys(projectResult.fixedFiles).reduce((acc, filePath) => {
                acc[filePath] = projectResult.fixedFiles[filePath];
                return acc;
            }, {} as { [filePath: string]: string });
            if (Object.keys(files).length > 0) {
                runProjectValidation(files);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10">
                {/* Dashboard Header */}
                <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                    <div className="max-w-[1800px] mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-lg opacity-75"></div>
                                    <div className="relative p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl">
                                        <Cpu className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Design Token AI Dashboard
                                    </h1>
                                    <p className="text-sm text-gray-400">
                                        WCAG Compliance • AI-Powered Design • Real-time Validation
                                    </p>
                                </div>
                            </div>
                            
                            {/* Dashboard Stats */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-sm">
                                    <Activity className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300">Live</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-cyan-400" />
                                    <span className="text-gray-300">60+ Palettes</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <BarChart3 className="w-4 h-4 text-purple-400" />
                                    <span className="text-gray-300">20+ Styles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Navigation */}
                <nav className="border-b border-white/10 bg-black/10 backdrop-blur-xl">
                    <div className="max-w-[1800px] mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Project Type Selector */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400">Project Type:</span>
                                <div className="flex gap-2">
                                    {(['app', 'dashboard', 'landing', 'portfolio', 'ecommerce'] as const).map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setProjectType(type)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize text-sm ${
                                                projectType === type
                                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Validation Mode Tabs */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab('single')}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all text-sm ${
                                        activeTab === 'single'
                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Zap className="w-4 h-4" />
                                    Single File
                                </button>
                                <button
                                    onClick={() => setActiveTab('project')}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all text-sm ${
                                        activeTab === 'project'
                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Layers className="w-4 h-4" />
                                    Full Project
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Dashboard Main Content */}
                <main className="max-w-[1800px] mx-auto px-6 py-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left Sidebar - Design System Controls */}
                        <div className="col-span-12 lg:col-span-3 space-y-6">
                            <DesignStyleSelector 
                                onStyleSelect={handleStyleSelect}
                                selectedStyleId={selectedDesignStyle}
                            />
                            
                            <ColorGuidePanel onColorSelect={handleColorSelect} />
                            
                            <TokenEditor
                                tokens={tokens}
                                onChange={setTokens}
                                isOpen={isTokenEditorOpen}
                                onToggle={() => setIsTokenEditorOpen(!isTokenEditorOpen)}
                            />
                        </div>

                        {/* Center Content - Upload & AI Inspiration */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            {activeTab === 'single' ? (
                                <FileUploader onUpload={runSingleFileValidation} />
                            ) : (
                                <ProjectUploader onUpload={runProjectValidation} />
                            )}

                            <DesignInspirationPanel 
                                tokens={tokens}
                                onApplyTrend={handleApplyTrend}
                                projectType={projectType}
                            />
                        </div>

                        {/* Right Content - Validation Results */}
                        <div className="col-span-12 lg:col-span-5">
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
                </main>

                {/* Dashboard Footer */}
                <footer className="border-t border-white/10 bg-black/10 backdrop-blur-xl mt-16">
                    <div className="max-w-[1800px] mx-auto px-6 py-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                <span className="text-gray-300">Powered by AI • Built with React & TypeScript</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span>WCAG AAA Compliant</span>
                                <span>•</span>
                                <span>Real-time Validation</span>
                                <span>•</span>
                                <span>Modern Design Trends</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;