import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Link, Container, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 6,
            borderRadius: 2,
            textAlign: 'center',
            animation: 'scale-in 0.3s ease-out',
            maxWidth: '90%'
          }}
        >
          <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Oops! Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </Typography>
          <Link href="/" 
            variant="contained" 
            color="primary" 
            sx={{ 
              display: 'inline-block', 
              mt: 2,
              textDecoration: 'none',
              bgcolor: 'primary.main',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Return to Home
          </Link>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;
