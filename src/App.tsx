import { useState } from 'react';
import { CheckCircle, Zap, Cpu, Layers, Sparkles } from 'lucide-react';
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
            // Re-validate project if needed
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

            <div className="relative z-10 px-6 py-8 max-w-[1800px] mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur-lg opacity-75"></div>
                            <div className="relative p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl">
                                <Cpu className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <div className="text-left">
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Design Token AI
                            </h1>
                            <p className="text-xl text-gray-300 mt-2">
                                WCAG Compliance • AI-Powered Design • Real-time Validation
                            </p>
                        </div>
                    </div>
                    
                    {/* Tech Stats */}
                    <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">60+</div>
                            <div className="text-sm text-gray-400">Color Palettes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">20+</div>
                            <div className="text-sm text-gray-400">Design Styles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-400">AI</div>
                            <div className="text-sm text-gray-400">Powered</div>
                        </div>
                    </div>
                </header>

                {/* Project Type Selector */}
                <div className="flex justify-center mb-8">
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
                        <div className="flex gap-2">
                            {(['app', 'dashboard', 'landing', 'portfolio', 'ecommerce'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setProjectType(type)}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
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
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('single')}
                                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all ${
                                    activeTab === 'single'
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Zap className="w-5 h-5" />
                                Single File Validation
                            </button>
                            <button
                                onClick={() => setActiveTab('project')}
                                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all ${
                                    activeTab === 'project'
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Layers className="w-5 h-5" />
                                Project Validation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid xl:grid-cols-4 gap-8">
                    {/* Left Column - Design System */}
                    <div className="xl:col-span-1 space-y-6">
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

                    {/* Middle Column - Upload & Inspiration */}
                    <div className="xl:col-span-1 space-y-6">
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

                    {/* Right Column - Results */}
                    <div className="xl:col-span-2">
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
                <footer className="text-center mt-16 pt-8 border-t border-white/10">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-300">Powered by AI • Built with React & TypeScript</span>
                        <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                        WCAG AAA Compliant • Real-time Validation • Modern Design Trends
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;