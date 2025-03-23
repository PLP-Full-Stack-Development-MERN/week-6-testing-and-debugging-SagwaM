import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Fade
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { loadBugs, saveBugs, createBug } from '../lib/bug-utils';
import Header from '../components/Header';
import BugForm from '../components/BugForm';

const NewBug = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate a slight delay as if it's saving to a server
      setTimeout(() => {
        const bugs = loadBugs();
        const newBug = createBug(data);
        const updatedBugs = [newBug, ...bugs];
        saveBugs(updatedBugs);
        
        enqueueSnackbar('Bug report created successfully', { variant: 'success' });
        navigate(`/bugs/${newBug.id}`);
      }, 600);
    } catch (error) {
      console.error("Error creating bug:", error);
      enqueueSnackbar('Failed to create bug report', { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Fade in={true} timeout={500}>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
              >
                Back
              </Button>
              
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Report New Bug
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Fill out the form below with details about the bug you've encountered.
              </Typography>
            </Box>
          </Fade>
          
          <Fade in={true} timeout={700}>
            <Paper 
              elevation={0} 
              variant="outlined" 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 1
                }
              }}
            >
              <BugForm 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
              />
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default NewBug;
