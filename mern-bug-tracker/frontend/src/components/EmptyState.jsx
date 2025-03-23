import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { BugReport, Search, Warning } from '@mui/icons-material';

const EmptyState = ({ 
  type = "bugs", 
  title, 
  description, 
}) => {
  const renderContent = () => {
    switch (type) {
      case "bugs":
        return {
          icon: <BugReport sx={{ fontSize: 48, color: 'primary.main', opacity: 0.8 }} />,
          title: title || "No bugs reported yet",
          description: description || "Create your first bug report to get started with tracking issues.",
          action: (
            <Button component={Link} to="/new" variant="contained" color="primary">
              Report a bug
            </Button>
          )
        };
      case "search":
        return {
          icon: <Search sx={{ fontSize: 48, color: 'text.secondary' }} />,
          title: title || "No results found",
          description: description || "Try adjusting your search or filter criteria to find what you're looking for.",
          action: null
        };
      case "error":
        return {
          icon: <Warning sx={{ fontSize: 48, color: 'error.main' }} />,
          title: title || "Something went wrong",
          description: description || "An error occurred while trying to load this data. Please try again.",
          action: (
            <Button variant="outlined" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          )
        };
      default:
        return {
          icon: <BugReport sx={{ fontSize: 48, color: 'primary.main', opacity: 0.8 }} />,
          title: title || "No content available",
          description: description || "There is no content available to display right now.",
          action: null
        };
    }
  };

  const content = renderContent();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        p: 4,
        bgcolor: 'transparent',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'primary.light', 
          opacity: 0.1, 
          borderRadius: '50%', 
          p: 2, 
          mb: 2 
        }}
      >
        {content.icon}
      </Box>
      <Typography variant="h5" component="h3" gutterBottom>
        {content.title}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ mb: 3, maxWidth: 'md' }}
      >
        {content.description}
      </Typography>
      {content.action}
    </Paper>
  );
};

export default EmptyState;
