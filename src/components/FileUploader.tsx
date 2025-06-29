import React, { useState } from 'react';
import { Upload, Code, Zap } from 'lucide-react';

type Props = {
    onUpload: (css: string) => void;
};

const FileUploader: React.FC<Props> = ({ onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleFile = async (file: File) => {
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result?.toString() || '';
            onUpload(text);
            setIsUploading(false);
        };
        reader.readAsText(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'text/css' || file.name.endsWith('.css'))) {
            handleFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                    <Code className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">CSS Validator</h2>
            </div>
            
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging
                        ? 'border-cyan-400/50 bg-cyan-500/10'
                        : 'border-white/20 hover:border-cyan-400/30 hover:bg-cyan-500/5'
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".css"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleInputChange}
                />
                
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50"></div>
                            <div className="relative p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                                {isUploading ? (
                                    <Zap className="w-8 h-8 text-white animate-pulse" />
                                ) : (
                                    <Upload className="w-8 h-8 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-lg font-medium text-white">
                            {isUploading ? 'Processing...' : 'Drop your CSS file here'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            or click to browse files
                        </p>
                    </div>
                    
                    <div className="flex justify-center">
                        <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium text-gray-300 border border-white/20">
                            .css files only
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;