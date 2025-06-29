import { useState } from 'react';
import { CheckCircle, Zap, Cpu, Layers, Settings, Users, Activity, FileText, Palette } from 'lucide-react';
import TokenEditor from './components/TokenEditor';
import FileUploader from './components/FileUploader';
import ProjectUploader from './components/ProjectUploader';
import ReportViewer from './components/ReportViewer';
import ProjectReportViewer from './components/ProjectReportViewer';
import DesignStyleModal from './components/DesignStyleModal';
import ColorGuidePanel from './components/ColorGuidePanel';
import { defaultTokens } from './utils/defaultTokens';
import type { DesignTokens, ProjectValidationResult } from './types/DesignToken';
import type { DesignStyle } from './components/DesignStyleModal';
import { validateCSS, type ValidationResult } from './utils/cssValidator';
import { validateProject } from './utils/projectValidator';

function App() {
    const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);
    const [validationResult, setValidationResult] = useState<ValidationResult>({ violations: [], fixedCSS: '' });
    const [projectResult, setProjectResult] = useState<ProjectValidationResult | undefined>();
    const [css, setCSS] = useState('');
    const [isTokenEditorOpen, setIsTokenEditorOpen] = useState(false);
    const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'single' | 'project'>('single');
    const [selectedDesignStyle, setSelectedDesignStyle] = useState<string | undefined>();
    const [projectType, setProjectType] = useState<'dashboard' | 'landing' | 'app' | 'portfolio' | 'ecommerce'>('app');
    const [uploadedFiles, setUploadedFiles] = useState<{ [filePath: string]: string }>({});

    const runSingleFileValidation = async (code: string) => {
        setCSS(code);
        const result = await validateCSS(code, tokens);
        setValidationResult(result);
    };

    const runProjectValidation = async (files: { [filePath: string]: string }) => {
        setUploadedFiles(files);
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

    const handleStyleSelect = (style: DesignStyle) => {
        setSelectedDesignStyle(style.id);
        
        // Apply the style's design tokens immediately
        const styleTokens: Partial<DesignTokens> = {
            colors: style.colorSchemes.flatMap(scheme => scheme.colors),
            spacing: style.spacing,
            borderRadius: style.borderRadius,
            fontWeights: style.typography.weights
        };
        
        const updatedTokens = { ...tokens };
        Object.entries(styleTokens).forEach(([key, values]) => {
            if (values && Array.isArray(values)) {
                const tokenKey = key as keyof DesignTokens;
                updatedTokens[tokenKey] = values;
            }
        });
        
        setTokens(updatedTokens);
        
        // Re-validate with new tokens
        if (css) {
            runSingleFileValidation(css);
        }
        if (Object.keys(uploadedFiles).length > 0) {
            runProjectValidation(uploadedFiles);
        }
    };

    const handleApplyStyleToProject = () => {
        if (Object.keys(uploadedFiles).length > 0) {
            runProjectValidation(uploadedFiles);
        }
    };

    const handleColorSelect = (colors: string[]) => {
        const updatedTokens = { ...tokens };
        updatedTokens.colors = colors;
        setTokens(updatedTokens);
        
        // Re-validate with new colors
        if (css) {
            runSingleFileValidation(css);
        }
        if (Object.keys(uploadedFiles).length > 0) {
            runProjectValidation(uploadedFiles);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Cpu className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">
                                    Design System Validator
                                </h1>
                                <p className="text-sm text-slate-600">
                                    Enterprise WCAG Compliance & Design Token Management
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Activity className="w-4 h-4 text-green-500" />
                                <span>Active</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span>60+ Palettes</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Palette className="w-4 h-4 text-purple-500" />
                                <span>6 Styles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* Project Type Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">Project Type:</span>
                            <div className="flex gap-1">
                                {(['app', 'dashboard', 'landing', 'portfolio', 'ecommerce'] as const).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setProjectType(type)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                                            projectType === type
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Validation Mode Tabs */}
                        <div className="flex gap-1">
                            <button
                                onClick={() => setActiveTab('single')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'single'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <FileText className="w-4 h-4" />
                                Single File
                            </button>
                            <button
                                onClick={() => setActiveTab('project')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'project'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <Layers className="w-4 h-4" />
                                Full Project
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Design System Controls */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        {/* Design Styles Button */}
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <div className="p-4">
                                <button
                                    onClick={() => setIsStyleModalOpen(true)}
                                    className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Palette className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-slate-900">Design Styles</h3>
                                        <p className="text-sm text-slate-600">
                                            {selectedDesignStyle ? 'Style selected' : 'Choose your design direction'}
                                        </p>
                                    </div>
                                    {selectedDesignStyle && (
                                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                                    )}
                                </button>
                                
                                {/* Apply to Project Button */}
                                {Object.keys(uploadedFiles).length > 0 && selectedDesignStyle && (
                                    <button
                                        onClick={handleApplyStyleToProject}
                                        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" />
                                        Apply Style to Uploaded Project
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <ColorGuidePanel onColorSelect={handleColorSelect} />
                        
                        <TokenEditor
                            tokens={tokens}
                            onChange={setTokens}
                            isOpen={isTokenEditorOpen}
                            onToggle={() => setIsTokenEditorOpen(!isTokenEditorOpen)}
                        />
                    </div>

                    {/* Center Content - Upload */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        {activeTab === 'single' ? (
                            <FileUploader onUpload={runSingleFileValidation} />
                        ) : (
                            <ProjectUploader onUpload={runProjectValidation} />
                        )}
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

            {/* Design Style Modal */}
            <DesignStyleModal
                isOpen={isStyleModalOpen}
                onClose={() => setIsStyleModalOpen(false)}
                onStyleSelect={handleStyleSelect}
                selectedStyleId={selectedDesignStyle}
                onApplyToProject={handleApplyStyleToProject}
                hasUploadedProject={Object.keys(uploadedFiles).length > 0}
                projectType={projectType}
            />

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-slate-600">Enterprise Design System Validation</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <span>WCAG AAA Compliant</span>
                            <span>•</span>
                            <span>Real-time Validation</span>
                            <span>•</span>
                            <span>Enterprise Ready</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;