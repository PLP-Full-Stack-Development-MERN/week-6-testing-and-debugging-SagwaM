import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper,
  CircularProgress,
  Fade 
} from '@mui/material';
import { Add as PlusIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { loadBugs, saveBugs } from '../lib/bug-utils';
import { initialBugs } from '../types/bug';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import BugCard from '../components/BugCard';
import EmptyState from '../components/EmptyState';

const Index = () => {
  const [bugs, setBugs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load bugs from local storage or use initial data if empty
    const storedBugs = loadBugs();
    if (storedBugs.length > 0) {
      setBugs(storedBugs);
    } else {
      // Use initial data for demo purposes
      setBugs(initialBugs);
      saveBugs(initialBugs);
    }
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: 12, 
          pb: 8, 
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Fade in={true} timeout={500}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 2, 
            mb: 4 
          }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Bug Harmony Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track, manage and resolve issues with elegance
              </Typography>
            </Box>
            
            <Button 
              component={Link} 
              to="/new" 
              variant="contained" 
              color="primary" 
              startIcon={<PlusIcon />}
              size="large"
            >
              Report New Bug
            </Button>
          </Box>
        </Fade>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Loading dashboard...
            </Typography>
          </Box>
        ) : (
          <>
            <Dashboard bugs={bugs} />
            
            <Box sx={{ 
              mb: 3, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Typography variant="h5" component="h2" fontWeight="medium">
                Recent Issues
              </Typography>
              <Button 
                component={Link} 
                to="/bugs" 
                variant="text" 
                color="primary" 
                endIcon={<ChevronRightIcon />}
                size="small"
              >
                View all
              </Button>
            </Box>
            
            {bugs.length > 0 ? (
              <Grid container spacing={3}>
                {bugs.slice(0, 3).map((bug, index) => (
                  <Grid item xs={12} md={6} lg={4} key={bug.id}>
                    <BugCard bug={bug} animationDelay={index * 100} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState type="bugs" />
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Index;
