import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Upload,
  Code,
} from '@mui/icons-material';

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
    <Paper elevation={1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1, bgcolor: 'primary.100', borderRadius: 1 }}>
            <Code color="primary" />
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary">
              CSS Validator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload CSS file for validation
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Box
          component="div"
          sx={{
            position: 'relative',
            border: 2,
            borderStyle: 'dashed',
            borderColor: isDragging ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            transition: 'all 0.2s',
            bgcolor: isDragging ? 'primary.50' : 'transparent',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.50',
            },
          }}
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
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
            onChange={handleInputChange}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'primary.100', borderRadius: '50%' }}>
              {isUploading ? (
                <CircularProgress size={32} color="primary" />
              ) : (
                <Upload fontSize="large" color="primary" />
              )}
            </Box>

            <Box>
              <Typography variant="h6" color="text.primary">
                {isUploading ? 'Processing...' : 'Drop your CSS file here'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                or click to browse files
              </Typography>
            </Box>

            <Chip
              label=".css files only"
              size="small"
              variant="outlined"
              sx={{ bgcolor: 'grey.100' }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FileUploader;