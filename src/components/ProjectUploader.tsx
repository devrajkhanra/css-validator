import React, { useState } from 'react';
import { FolderOpen, Upload, FileText, Code2, Layers, Zap } from 'lucide-react';

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
                return <FileText className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <FolderOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Project Validator</h2>
                        <p className="text-sm text-slate-600">Upload project folder for validation</p>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                        isDragging
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50'
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
                            <div className="p-4 bg-purple-100 rounded-full">
                                {isUploading ? (
                                    <Zap className="w-8 h-8 text-purple-600 animate-pulse" />
                                ) : (
                                    <Upload className="w-8 h-8 text-purple-600" />
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-lg font-medium text-slate-900">
                                {isUploading ? 'Analyzing project...' : 'Drop your project folder here'}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                                or click to browse folders
                            </p>
                        </div>
                        
                        <div className="flex justify-center flex-wrap gap-2">
                            {['HTML', 'CSS', 'JSX', 'TSX', 'JS', 'TS'].map(type => (
                                <span key={type} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-slate-700 mb-3">
                            Uploaded Files ({uploadedFiles.length})
                        </h3>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                            {uploadedFiles.map((fileName, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded px-2 py-1">
                                    {getFileIcon(fileName)}
                                    <span className="truncate">{fileName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectUploader;