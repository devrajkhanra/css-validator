export const defaultTokens = {
    // WCAG AA compliant colors with contrast ratios
    colors: [
        // Pure colors
        '#ffffff', '#000000',
        
        // Grays (WCAG AA compliant)
        '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
        
        // Primary blues (WCAG AA compliant)
        '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1',
        
        // Success greens (WCAG AA compliant)
        '#e8f5e8', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20',
        
        // Warning oranges/yellows (WCAG AA compliant)
        '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00',
        
        // Error reds (WCAG AA compliant)
        '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c',
        
        // Purple/Indigo (WCAG AA compliant)
        '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c',
        
        // Teal/Cyan (WCAG AA compliant)
        '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40'
    ],
    
    // Comprehensive spacing scale following 8px grid system (in px for base reference)
    spacing: [
        '0', '2px', '4px', '6px', '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px',
        '36px', '40px', '44px', '48px', '56px', '64px', '72px', '80px', '96px', '112px', '128px', '144px', '160px', 
        '176px', '192px', '208px', '224px', '240px', '256px', '288px', '320px', '384px', '448px', '512px'
    ],
    
    // WCAG compliant font sizes (minimum 16px for body text) - in px for base reference
    fontSizes: [
        '12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px', '40px', '44px', '48px',
        '56px', '64px', '72px', '80px', '96px'
    ],
    
    // Line heights for accessibility (unitless preferred)
    lineHeights: [
        '1', '1.1', '1.2', '1.25', '1.3', '1.4', '1.5', '1.6', '1.75', '2', '2.25', '2.5'
    ],
    
    // Font weights
    fontWeights: [
        '100', '200', '300', '400', '500', '600', '700', '800', '900'
    ],
    
    // Border radius values (in px for base reference)
    borderRadius: [
        '0', '2px', '4px', '6px', '8px', '12px', '16px', '20px', '24px', '32px', '9999px'
    ],
    
    // Shadow values for depth
    boxShadow: [
        'none',
        '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
    ]
};