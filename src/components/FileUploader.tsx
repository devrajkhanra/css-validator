import React, { useState } from 'react';
import { Upload, Code } from 'lucide-react';

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
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Code className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">CSS Validator</h2>
            </div>
            
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging
                        ? 'border-indigo-400 bg-indigo-50/50'
                        : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/30'
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
                        <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                            <Upload className={`w-8 h-8 text-indigo-600 ${isUploading ? 'animate-bounce' : ''}`} />
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            {isUploading ? 'Processing...' : 'Drop your CSS file here'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            or click to browse files
                        </p>
                    </div>
                    
                    <div className="flex justify-center">
                        <span className="px-4 py-2 bg-white/50 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                            .css files only
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;