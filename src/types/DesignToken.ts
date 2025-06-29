export type DesignTokens = {
    colors: string[];
    spacing: string[];
    fontSizes: string[];
    lineHeights: string[];
    fontWeights: string[];
    borderRadius: string[];
    boxShadow: string[];
};

export type FileAnalysis = {
    filePath: string;
    fileType: 'html' | 'css' | 'tsx' | 'jsx' | 'js' | 'ts';
    content: string;
    elements: ElementAnalysis[];
    dependencies: string[];
};

export type ElementAnalysis = {
    tagName: string;
    selector: string;
    className?: string;
    id?: string;
    styles: StyleProperty[];
    children: ElementAnalysis[];
    parent?: string;
    line?: number;
    column?: number;
};

export type StyleProperty = {
    property: string;
    value: string;
    source: 'inline' | 'class' | 'css' | 'computed';
    line?: number;
    column?: number;
};

export type ProjectViolation = {
    filePath: string;
    elementPath: string;
    selector: string;
    property: string;
    value: string;
    message: string;
    suggestedFix?: string;
    context: {
        parentElement?: string;
        childElements: string[];
        relatedFiles: string[];
        cascadingImpact: string[];
    };
    severity: 'error' | 'warning' | 'info';
    wcagRule?: string;
    line?: number;
    column?: number;
};

export type ProjectValidationResult = {
    violations: ProjectViolation[];
    fixedFiles: { [filePath: string]: string };
    summary: {
        totalFiles: number;
        filesWithIssues: number;
        totalViolations: number;
        errorCount: number;
        warningCount: number;
        infoCount: number;
    };
};