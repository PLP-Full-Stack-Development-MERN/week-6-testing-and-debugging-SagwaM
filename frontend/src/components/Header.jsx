import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  useScrollTrigger,
  Container,
  Hidden
} from '@mui/material';
import { 
  BugReport as BugIcon, 
  Add as PlusIcon, 
  List as ListIcon, 
  BarChart as BarChartIcon 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AppBar 
      position="fixed" 
      color="inherit" 
      elevation={trigger ? 1 : 0}
      sx={{
        bgcolor: trigger ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s',
        py: trigger ? 0.5 : 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button 
            component={Link} 
            to="/" 
            color="primary"
            startIcon={<BugIcon />}
            sx={{ 
              textTransform: 'none', 
              mr: 3
            }}
          >
            <Typography variant="h6" fontWeight="600" noWrap>
              Bug Harmony
            </Typography>
          </Button>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Hidden mdDown>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/"
                color={isActive('/') ? 'primary' : 'inherit'}
                startIcon={<BarChartIcon />}
                sx={{ 
                  bgcolor: isActive('/') ? 'primary.light' : 'transparent',
                  '&:hover': { bgcolor: isActive('/') ? 'primary.light' : 'action.hover' }
                }}
              >
                Dashboard
              </Button>
              
              <Button
                component={Link}
                to="/bugs"
                color={isActive('/bugs') ? 'primary' : 'inherit'}
                startIcon={<ListIcon />}
                sx={{ 
                  bgcolor: isActive('/bugs') ? 'primary.light' : 'transparent',
                  '&:hover': { bgcolor: isActive('/bugs') ? 'primary.light' : 'action.hover' }
                }}
              >
                Bug List
              </Button>
              
              <Button
                component={Link}
                to="/new"
                variant="contained"
                color="primary"
                startIcon={<PlusIcon />}
                sx={{ ml: 1 }}
              >
                New Bug
              </Button>
            </Box>
          </Hidden>
          
          <Hidden mdUp>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                to="/bugs"
                color="inherit"
                edge="end"
              >
                <ListIcon />
              </IconButton>
              
              <IconButton
                component={Link}
                to="/new"
                color="primary"
                edge="end"
              >
                <PlusIcon />
              </IconButton>
            </Box>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
