import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from './pages/Index';
import BugList from './pages/BugList';
import BugView from './pages/BugView';
import NewBug from './pages/NewBug';
import EditBug from './pages/EditBug';
import NotFound from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // blue color similar to the original
    },
    secondary: {
      main: '#8b5cf6', // purple color
    },
    error: {
      main: '#ef4444', // red for high priority
    },
    warning: {
      main: '#f97316', // orange for medium priority
    },
    success: {
      main: '#22c55e', // green for low priority
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bugs" element={<BugList />} />
            <Route path="/bugs/:id" element={<BugView />} />
            <Route path="/bugs/:id/edit" element={<EditBug />} />
            <Route path="/new" element={<NewBug />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
