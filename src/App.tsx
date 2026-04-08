import {
  Container,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Paper,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  Computer,
  Palette,
  ViewModule,
  Assessment,
  People,
  ElectricBolt,
} from '@mui/icons-material';
import TokenEditor from './components/TokenEditor';
import FileUploader from './components/FileUploader';
import ProjectUploader from './components/ProjectUploader';
import ReportViewer from './components/ReportViewer';
import ProjectReportViewer from './components/ProjectReportViewer';
import DesignStyleModal from './components/DesignStyleModal';
import ColorGuidePanel from './components/ColorGuidePanel';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
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
  } = useAppState();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 1 }}>
              <Computer sx={{ color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h6" color="text.primary">
                Design System Validator
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enterprise WCAG Compliance & Design Token Management
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Chip
              icon={<Assessment color="success" />}
              label="Active"
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<People color="primary" />}
              label="60+ Palettes"
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<Palette color="secondary" />}
              label="6 Styles"
              size="small"
              variant="outlined"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Project Type:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['app', 'dashboard', 'landing', 'portfolio', 'ecommerce'] as const).map(type => (
                <Button
                  key={type}
                  variant={projectType === type ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setProjectType(type)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {type}
                </Button>
              ))}
            </Box>
          </Box>

          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab
              icon={<Assessment />}
              label="Single File"
              value="single"
              iconPosition="start"
            />
            <Tab
              icon={<ViewModule />}
              label="Full Project"
              value="project"
              iconPosition="start"
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
          {/* Left Sidebar - Design System Controls */}
          <Box sx={{ gridColumn: { lg: 'span 1' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Design Styles Button */}
              <Paper elevation={1} sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Palette />}
                  onClick={() => setIsStyleModalOpen(true)}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                    bgcolor: 'primary.50',
                    borderColor: 'primary.200',
                    '&:hover': {
                      bgcolor: 'primary.100',
                    },
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Design Styles
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDesignStyle ? 'Style selected' : 'Choose your design direction'}
                  </Typography>
                  {selectedDesignStyle && (
                    <CheckCircle color="success" sx={{ ml: 'auto' }} />
                  )}
                </Button>

                {/* Apply to Project Button */}
                {Object.keys(uploadedFiles).length > 0 && selectedDesignStyle && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ElectricBolt />}
                    onClick={handleApplyStyleToProject}
                    sx={{ mt: 2 }}
                  >
                    Apply Style to Uploaded Project
                  </Button>
                )}
              </Paper>

              <ColorGuidePanel onColorSelect={handleColorSelect} />

              <TokenEditor
                tokens={tokens}
                onChange={setTokens}
                isOpen={isTokenEditorOpen}
                onToggle={() => setIsTokenEditorOpen(!isTokenEditorOpen)}
              />
            </Box>
          </Box>

          {/* Center Content - Upload */}
          <Box sx={{ gridColumn: { lg: 'span 1' } }}>
            {activeTab === 'single' ? (
              <FileUploader onUpload={runSingleFileValidation} />
            ) : (
              <ProjectUploader onUpload={runProjectValidation} />
            )}
          </Box>

          {/* Right Content - Validation Results */}
          <Box sx={{ gridColumn: { lg: 'span 1' } }}>
            {activeTab === 'single' ? (
              <ReportViewer
                violations={validationResult.violations}
                css={css}
                fixedCSS={validationResult.fixedCSS}
                onFixErrors={handleFixSingleFileErrors}
              />
            ) : (
              <ProjectReportViewer
                result={projectResult}
                onFixErrors={handleFixProjectErrors}
              />
            )}
          </Box>
        </Box>
      </Container>

      {/* Design Style Modal */}
      <DesignStyleModal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        onStyleSelect={handleStyleSelect}
        selectedStyleId={selectedDesignStyle}
        onApplyToProject={handleApplyStyleToProject}
        hasUploadedProject={Object.keys(uploadedFiles).length > 0}
        projectType={projectType}
      />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 2,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircle color="success" />
              <Typography variant="body2" color="text.secondary">
                Enterprise Design System Validation
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, typography: 'body2', color: 'text.secondary' }}>
              <span>WCAG AAA Compliant</span>
              <span>•</span>
              <span>Real-time Validation</span>
              <span>•</span>
              <span>Enterprise Ready</span>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;