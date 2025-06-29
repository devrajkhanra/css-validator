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
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Code className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">CSS Validator</h2>
                        <p className="text-sm text-slate-600">Upload CSS file for validation</p>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                        isDragging
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
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
                            <div className="p-4 bg-blue-100 rounded-full">
                                {isUploading ? (
                                    <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
                                ) : (
                                    <Upload className="w-8 h-8 text-blue-600" />
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-lg font-medium text-slate-900">
                                {isUploading ? 'Processing...' : 'Drop your CSS file here'}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                                or click to browse files
                            </p>
                        </div>
                        
                        <div className="flex justify-center">
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                                .css files only
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;