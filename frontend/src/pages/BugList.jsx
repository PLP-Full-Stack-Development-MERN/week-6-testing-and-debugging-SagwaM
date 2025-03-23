
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Collapse,
  Fade
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as PlusIcon, 
  Tune as TuneIcon
} from '@mui/icons-material';
import { loadBugs, filterBugs, sortBugs } from '../lib/bug-utils';
import Header from '../components/Header';
import BugCard from '../components/BugCard';
import EmptyState from '../components/EmptyState';

const BugList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    // Get initial filter values from URL if present
    const status = searchParams.get("status") || "all";
    const priority = searchParams.get("priority") || "all";
    const search = searchParams.get("search") || "";
    
    if (status !== "all") setStatusFilter(status);
    if (priority !== "all") setPriorityFilter(priority);
    if (search) setSearchTerm(search);
    
    // Load bugs
    const loadedBugs = loadBugs();
    setBugs(loadedBugs);
    setIsLoading(false);
  }, [searchParams]);

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (priorityFilter !== "all") params.set("priority", priorityFilter);
    if (searchTerm) params.set("search", searchTerm);
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams();
  };

  const handleFilterChange = (type, value) => {
    if (type === "status") {
      setStatusFilter(value);
    } else {
      setPriorityFilter(value);
    }
    
    // Update URL params on each filter change
    setTimeout(updateSearchParams, 0);
  };

  const handleSortChange = (field) => {
    const newSortField = field;
    if (sortField === newSortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(newSortField);
      setSortDirection("desc");
    }
  };

  // Filter and sort bugs
  const filteredBugs = filterBugs(bugs, searchTerm, statusFilter, priorityFilter);
  const sortedBugs = sortBugs(filteredBugs, sortField, sortDirection);

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
            mb: 3 
          }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              All Bug Reports
            </Typography>
            
            <Button 
              component={Link} 
              to="/new" 
              variant="contained" 
              color="primary" 
              startIcon={<PlusIcon />}
            >
              New Bug
            </Button>
          </Box>
        </Fade>

        <Fade in={true} timeout={600}>
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box 
              component="form" 
              onSubmit={handleSearch} 
              sx={{ display: 'flex', gap: 1 }}
            >
              <TextField
                fullWidth
                placeholder="Search bugs..."
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton 
                color={isFilterVisible ? "primary" : "default"}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
              >
                <TuneIcon />
              </IconButton>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Box>

            <Collapse in={isFilterVisible}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  borderRadius: 1, 
                  mt: 1, 
                  animation: 'fadeIn 0.3s'
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="in-review">In Review</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={priorityFilter}
                        onChange={(e) => handleFilterChange("priority", e.target.value)}
                        label="Priority"
                      >
                        <MenuItem value="all">All Priorities</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortField}
                        onChange={(e) => handleSortChange(e.target.value)}
                        label="Sort By"
                      >
                        <MenuItem value="none">No Sorting</MenuItem>
                        <MenuItem value="updatedAt">Last Updated</MenuItem>
                        <MenuItem value="createdAt">Created Date</MenuItem>
                        <MenuItem value="priority">Priority</MenuItem>
                        <MenuItem value="status">Status</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Sort Direction</InputLabel>
                      <Select
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                        label="Sort Direction"
                      >
                        <MenuItem value="desc">Descending</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Box>
        </Fade>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Loading bugs...
            </Typography>
          </Box>
        ) : sortedBugs.length > 0 ? (
          <Fade in={true} timeout={700}>
            <Grid container spacing={3}>
              {sortedBugs.map((bug, index) => (
                <Grid item xs={12} md={6} lg={4} key={bug.id}>
                  <BugCard 
                    bug={bug} 
                    animationDelay={index * 50} 
                  />
                </Grid>
              ))}
            </Grid>
          </Fade>
        ) : (
          <EmptyState 
            type={bugs.length === 0 ? "bugs" : "search"} 
            title={bugs.length === 0 ? "No bugs reported yet" : "No matching bugs found"}
            description={bugs.length === 0 
              ? "Get started by creating your first bug report" 
              : "Try adjusting your filters or search term to find what you're looking for"}
          />
        )}
      </Container>
    </Box>
  );
};

export default BugList;
