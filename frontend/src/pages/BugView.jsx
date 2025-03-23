import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  Button,
  Fade
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { loadBugs, saveBugs, getBugById, deleteBug } from '../lib/bug-utils';
import Header from '../components/Header';
import BugDetail from '../components/BugDetail';

const BugView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleDelete = (bugId) => {
    try {
      const bugs = loadBugs();
      const updatedBugs = deleteBug(bugs, bugId);
      saveBugs(updatedBugs);
      enqueueSnackbar('Bug successfully deleted', { variant: 'success' });
      navigate("/bugs");
    } catch (err) {
      console.error("Error deleting bug:", err);
      enqueueSnackbar('Failed to delete bug', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress size={28} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Loading bug details...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h5" color="error" gutterBottom>
              {error}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The bug you're looking for could not be found or has been deleted.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/bugs")}
            >
              Return to bug list
            </Button>
          </Box>
        ) : bug ? (
          <Fade in={true} timeout={500}>
            <div>
              <BugDetail bug={bug} onDelete={handleDelete} />
            </div>
          </Fade>
        ) : null}
      </Container>
    </Box>
  );
};

export default BugView;
