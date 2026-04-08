import { useState } from 'react';
import { defaultTokens } from '../utils/defaultTokens';
import type { DesignTokens, ProjectValidationResult } from '../types/DesignToken';
import type { DesignStyle } from '../components/DesignStyleModal';
import { validateCSS, type ValidationResult } from '../utils/cssValidator';
import { validateProject } from '../utils/projectValidator';

export const useAppState = () => {
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

  return {
    tokens,
    setTokens,
    validationResult,
    projectResult,
    css,
    isTokenEditorOpen,
    setIsTokenEditorOpen,
    isStyleModalOpen,
    setIsStyleModalOpen,
    activeTab,
    setActiveTab,
    selectedDesignStyle,
    projectType,
    setProjectType,
    uploadedFiles,
    runSingleFileValidation,
    runProjectValidation,
    handleFixSingleFileErrors,
    handleFixProjectErrors,
    handleStyleSelect,
    handleApplyStyleToProject,
    handleColorSelect,
  };
};