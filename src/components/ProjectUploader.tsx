import React, { useState } from 'react';
import { FolderOpen, Upload, FileText, Code2, Layers } from 'lucide-react';

type Props = {
    onUpload: (files: { [filePath: string]: string }) => void;
};

const ProjectUploader: React.FC<Props> = ({ onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFiles = async (fileList: FileList) => {
        setIsUploading(true);
        const files: { [filePath: string]: string } = {};
        const fileNames: string[] = [];

        const readFile = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsText(file);
            });
        };

        try {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const content = await readFile(file);
                const filePath = file.webkitRelativePath || file.name;
                files[filePath] = content;
                fileNames.push(filePath);
            }

            setUploadedFiles(fileNames);
            onUpload(files);
        } catch (error) {
            console.error('Error reading files:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'html':
                return <FileText className="w-4 h-4 text-orange-500" />;
            case 'css':
                return <Code2 className="w-4 h-4 text-blue-500" />;
            case 'tsx':
            case 'jsx':
                return <Layers className="w-4 h-4 text-cyan-500" />;
            case 'js':
            case 'ts':
                return <Code2 className="w-4 h-4 text-yellow-500" />;
            default:
                return <FileText className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <FolderOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">Project Validator</h2>
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
                    multiple
                    webkitdirectory=""
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
                            {isUploading ? 'Analyzing project...' : 'Drop your project folder here'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            or click to browse folders
                        </p>
                    </div>
                    
                    <div className="flex justify-center flex-wrap gap-2">
                        {['HTML', 'CSS', 'JSX', 'TSX', 'JS', 'TS'].map(type => (
                            <span key={type} className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {uploadedFiles.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Uploaded Files ({uploadedFiles.length})
                    </h3>
                    <div className="max-h-32 overflow-y-auto scrollbar-thin space-y-1">
                        {uploadedFiles.map((fileName, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 rounded px-2 py-1">
                                {getFileIcon(fileName)}
                                <span className="truncate">{fileName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectUploader;