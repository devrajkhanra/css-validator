import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Chip,
  Alert,
  Stack,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Download,
  Build,
  ContentCopy,
  Check,
  ElectricBolt,
} from '@mui/icons-material';

type Violation = {
  selector: string;
  property: string;
  value: string;
  message: string;
  suggestedFix?: string;
  confidence?: number;
  reasoning?: string;
  modernUnit?: string;
  line?: number;
  column?: number;
};

type Props = {
  violations: Violation[];
  css?: string;
  fixedCSS?: string;
  onFixErrors?: () => void;
};

const ReportViewer: React.FC<Props> = ({ violations, css, fixedCSS, onFixErrors }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const downloadCSS = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'default';
    if (confidence >= 0.8) return 'success';
    if (confidence >= 0.5) return 'warning';
    return 'error';
  };

  const getConfidenceText = (confidence?: number) => {
    if (!confidence) return 'Unknown';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };

  if (!css) {
    return (
      <Paper elevation={1} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: '50%', width: 64, height: 64, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle sx={{ fontSize: 32, color: 'grey.400' }} />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Upload a CSS file to see validation results
          </Typography>
        </Box>
      </Paper>
    );
  }

  const errorCount = violations.length;
  const highConfidenceCount = violations.filter(v => (v.confidence || 0) >= 0.8).length;

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
              <CheckCircle color="success" />
            </Box>
            <Box>
              <Typography variant="h6" color="text.primary">
                Validation Results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Design token compliance report
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            {violations.length > 0 && (
              <>
                <Chip
                  label={`${errorCount} Issues`}
                  color="error"
                  size="small"
                />
                {highConfidenceCount > 0 && (
                  <Chip
                    label={`${highConfidenceCount} High Confidence`}
                    color="success"
                    size="small"
                  />
                )}
              </>
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          {fixedCSS && onFixErrors && (
            <Button
              variant="contained"
              startIcon={<Build />}
              onClick={onFixErrors}
              size="small"
            >
              Auto Fix Errors
            </Button>
          )}
          {css && (
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => downloadCSS(css, 'original.css')}
              size="small"
            >
              Download Original
            </Button>
          )}
          {fixedCSS && (
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => downloadCSS(fixedCSS, 'fixed.css')}
              size="small"
            >
              Download Fixed
            </Button>
          )}
        </Stack>
      </Box>

      {violations.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: '50%', width: 64, height: 64, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h6" color="success.main" sx={{ mb: 1 }}>
              Perfect compliance!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your CSS follows all design token guidelines
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<Download />}
              onClick={() => downloadCSS(css, 'validated-styles.css')}
            >
              Download CSS
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {violations.map((violation, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Warning color="warning" sx={{ mt: 0.5, flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 0.5 }}>
                          {violation.selector}
                        </Typography>
                        {violation.line && (
                          <Typography variant="caption" color="text.secondary">
                            Line {violation.line}
                          </Typography>
                        )}
                        {violation.confidence && (
                          <Chip
                            label={`${getConfidenceText(violation.confidence)} Confidence`}
                            color={getConfidenceColor(violation.confidence)}
                            size="small"
                          />
                        )}
                        {violation.modernUnit && (
                          <Chip
                            label={`Modern ${violation.modernUnit}`}
                            color="info"
                            size="small"
                            icon={<ElectricBolt sx={{ fontSize: 14 }} />}
                          />
                        )}
                      </Stack>

                      <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                        <strong>{violation.property}:</strong>
                        <Typography component="span" sx={{ ml: 1, bgcolor: 'error.light', color: 'error.main', px: 0.5, borderRadius: 0.25 }}>
                          {violation.value}
                        </Typography>
                        {violation.suggestedFix && (
                          <>
                            <Typography component="span" sx={{ mx: 1, color: 'text.secondary' }}>→</Typography>
                            <Typography component="span" sx={{ bgcolor: 'success.light', color: 'success.main', px: 0.5, borderRadius: 0.25 }}>
                              {violation.suggestedFix}
                            </Typography>
                          </>
                        )}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {violation.message}
                      </Typography>

                      {violation.reasoning && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography variant="body2">
                            {violation.reasoning}
                          </Typography>
                        </Alert>
                      )}

                      {violation.suggestedFix && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Copy fix:
                          </Typography>
                          <Typography variant="caption" component="code" sx={{ bgcolor: 'success.light', color: 'success.main', px: 1, py: 0.5, borderRadius: 0.5 }}>
                            {violation.property}: {violation.suggestedFix}
                          </Typography>
                          <Button
                            size="small"
                            onClick={() => copyToClipboard(`${violation.property}: ${violation.suggestedFix};`, index)}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                          >
                            {copiedIndex === index ? (
                              <Check color="success" sx={{ fontSize: 16 }} />
                            ) : (
                              <ContentCopy sx={{ fontSize: 16 }} />
                            )}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {fixedCSS && fixedCSS !== css && (
            <>
              <Divider />
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Fixed CSS available with {violations.filter(v => v.suggestedFix).length} auto-corrections
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Download />}
                  onClick={() => downloadCSS(fixedCSS, 'fixed-styles.css')}
                  size="small"
                >
                  Download Fixed CSS
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ReportViewer;