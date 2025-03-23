import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  CircularProgress,
  Fade
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { loadBugs, saveBugs, getBugById, updateBug } from '../lib/bug-utils';
import Header from '../components/Header';
import BugForm from '../components/BugForm';

const EditBug = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBug = () => {
      try {
        const bugs = loadBugs();
        if (!id) {
          setError("Bug ID is missing");
          return;
        }
        
        const foundBug = getBugById(bugs, id);
        if (foundBug) {
          setBug(foundBug);
        } else {
          setError("Bug not found");
        }
      } catch (err) {
        console.error("Error fetching bug:", err);
        setError("Failed to load bug details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  const handleSubmit = (data) => {
    if (!bug) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate a slight delay as if it's saving to a server
      setTimeout(() => {
        const bugs = loadBugs();
        const updatedBug = { ...bug, ...data };
        const updatedBugs = updateBug(bugs, updatedBug);
        saveBugs(updatedBugs);
        
        enqueueSnackbar('Bug report updated successfully', { variant: 'success' });
        navigate(`/bugs/${bug.id}`);
      }, 600);
    } catch (error) {
      console.error("Error updating bug:", error);
      enqueueSnackbar('Failed to update bug report', { variant: 'error' });
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
                Edit Bug Report
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Update the details of the existing bug report.
              </Typography>
            </Box>
          </Fade>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress size={28} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                Loading bug details...
              </Typography>
            </Box>
          ) : error ? (
            <Paper 
              elevation={0} 
              variant="outlined" 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" color="error" gutterBottom>
                {error}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                The bug you're trying to edit could not be found or has been deleted.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/bugs")}
              >
                Return to bug list
              </Button>
            </Paper>
          ) : bug ? (
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
                  initialData={bug}
                  onSubmit={handleSubmit} 
                  isSubmitting={isSubmitting} 
                />
              </Paper>
            </Fade>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default EditBug;
