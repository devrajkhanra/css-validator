import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import TokenEditor from './components/TokenEditor';
import FileUploader from './components/FileUploader';
import ReportViewer from './components/ReportViewer';
import { defaultTokens } from './utils/defaultTokens';
import type { DesignTokens } from './types/DesignToken';
import { validateCSS, type Violation } from './utils/cssValidator';

function App() {
    const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);
    const [violations, setViolations] = useState<Violation[]>([]);
    const [css, setCSS] = useState('');
    const [isTokenEditorOpen, setIsTokenEditorOpen] = useState(false);

    const runValidation = async (code: string) => {
        setCSS(code);
        const result = await validateCSS(code, tokens);
        setViolations(result);
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
                        Ensure your CSS follows your design system guidelines with intelligent validation and real-time feedback
                    </p>
                </header>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <TokenEditor
                            tokens={tokens}
                            onChange={setTokens}
                            isOpen={isTokenEditorOpen}
                            onToggle={() => setIsTokenEditorOpen(!isTokenEditorOpen)}
                        />
                        <FileUploader onUpload={runValidation} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <ReportViewer violations={violations} css={css} />
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-sm text-gray-500 mt-16">
                    <p>Built with React, TypeScript & Tailwind CSS</p>
                </footer>
            </div>
        </div>
    );
}

export default App;