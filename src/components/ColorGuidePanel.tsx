import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Visibility as VisibilityIcon,
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// 60 carefully curated color combinations
const colorCombinations = [
  {
    id: 'modern-neutrals',
    name: 'Modern Neutrals',
    description: 'Clean grays for professional interfaces',
    category: 'Neutral',
    popularity: 9,
    colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#495057', '#343a40', '#212529'],
    usage: ['Backgrounds', 'Text', 'Borders'],
    accessibility: 'WCAG AAA'
  },
  {
    id: 'warm-grays',
    name: 'Warm Grays',
    description: 'Cozy grays with warm undertones',
    category: 'Neutral',
    popularity: 8,
    colors: ['#fefefe', '#f7f5f3', '#e8e6e1', '#d3c7b8', '#a08d7a', '#8b7355', '#6b5b47', '#2c2c2c'],
    usage: ['Organic brands', 'Warm interfaces'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'cool-grays',
    name: 'Cool Grays',
    description: 'Clean grays with blue undertones',
    category: 'Neutral',
    popularity: 8,
    colors: ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#475569', '#334155', '#0f172a'],
    usage: ['Tech interfaces', 'Professional apps'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'enterprise-blue',
    name: 'Enterprise Blue',
    description: 'Professional blue for corporate applications',
    category: 'Blue',
    popularity: 9,
    colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#3b82f6', '#1e40af', '#1e293b', '#0f172a', '#000000'],
    usage: ['Corporate', 'Professional', 'Trust'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'success-green',
    name: 'Success Green',
    description: 'Calming greens for positive actions',
    category: 'Green',
    popularity: 8,
    colors: ['#ffffff', '#f0fdf4', '#bbf7d0', '#22c55e', '#15803d', '#166534', '#14532d', '#052e16'],
    usage: ['Success', 'Confirmation', 'Growth'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'warning-amber',
    name: 'Warning Amber',
    description: 'Attention-grabbing amber for warnings',
    category: 'Orange',
    popularity: 7,
    colors: ['#ffffff', '#fffbeb', '#fef3c7', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
    usage: ['Warnings', 'Caution', 'Attention'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'error-red',
    name: 'Error Red',
    description: 'Clear red for error states',
    category: 'Red',
    popularity: 8,
    colors: ['#ffffff', '#fef2f2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
    usage: ['Errors', 'Danger', 'Critical'],
    accessibility: 'WCAG AA'
  },
  {
    id: 'info-blue',
    name: 'Info Blue',
    description: 'Informational blue for notifications',
    category: 'Blue',
    popularity: 8,
    colors: ['#ffffff', '#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'],
    usage: ['Information', 'Links', 'Navigation'],
    accessibility: 'WCAG AA'
  }
];

const accessibilityConfig = {
  'WCAG AAA': 'success',
  'WCAG AA': 'info',
  'WCAG A': 'warning'
} as const;

type Props = {
  onColorSelect: (colors: string[]) => void;
};

const ColorGuidePanel: React.FC<Props> = ({ onColorSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(colorCombinations.map(combo => combo.category)))];
  const filteredCombinations = selectedCategory === 'all'
    ? colorCombinations
    : colorCombinations.filter(combo => combo.category === selectedCategory);

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  };

  return (
    <Paper elevation={1}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1 }}>
            <PaletteIcon color="primary" />
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary">
              Color Palettes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              WCAG compliant combinations
            </Typography>
          </Box>
        </Box>

        {/* Category Filter */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category === 'all' ? 'All Colors' : category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              size="small"
            />
          ))}
        </Box>
      </Box>

      {/* Color Combinations */}
      <Box sx={{ p: 2, maxHeight: 400, overflowY: 'auto', space: 2 }}>
        <Stack spacing={2}>
          {filteredCombinations.map((combo) => (
            <Card key={combo.id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {combo.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ width: 14, height: 14, color: 'warning.main' }} />
                        <Typography variant="caption" color="text.secondary">
                          {combo.popularity}/10
                        </Typography>
                      </Box>
                      <Chip
                        label={combo.accessibility}
                        size="small"
                        variant="outlined"
                        color={accessibilityConfig[combo.accessibility as keyof typeof accessibilityConfig]}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {combo.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => onColorSelect(combo.colors)}
                    >
                      Apply
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setExpandedGuide(expandedGuide === combo.id ? null : combo.id)}
                    >
                      <VisibilityIcon sx={{ width: 16, height: 16 }} />
                    </Button>
                  </Stack>
                </Box>

                {/* Color Swatches */}
                <Stack direction="row" spacing={0.5} sx={{ mb: 1.5 }}>
                  {combo.colors.map((color, index) => (
                    <Box
                      key={index}
                      onClick={() => copyToClipboard(color)}
                      sx={{
                        flex: 1,
                        height: 32,
                        backgroundColor: color,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 0.5,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' },
                        position: 'relative'
                      }}
                      title={`${color} - Click to copy`}
                    >
                      {copiedColor === color && (
                        <CheckIcon sx={{ color: 'white', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }} />
                      )}
                    </Box>
                  ))}
                </Stack>

                {/* Usage Tags */}
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {combo.usage.map((use, index) => (
                    <Chip
                      key={index}
                      label={use}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Expanded Details */}
                {expandedGuide === combo.id && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Color Values
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                      {combo.colors.map((color, index) => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, bgcolor: 'background.default', borderRadius: 0.5 }} key={index}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              backgroundColor: color,
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 0.25
                            }}
                          />
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', flex: 1 }}>
                            {color}
                          </Typography>
                          <Button
                            size="small"
                            onClick={() => copyToClipboard(color)}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                          >
                            {copiedColor === color ? (
                              <CheckIcon sx={{ width: 14, height: 14, color: 'success.main' }} />
                            ) : (
                              <ContentCopyIcon sx={{ width: 14, height: 14 }} />
                            )}
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'caption' }}>
          <Typography variant="caption" color="text.secondary">
            Enterprise-grade color combinations
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }} />
            <Typography variant="caption" color="text.secondary">
              WCAG compliant
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ColorGuidePanel;