import { v4 as uuidv4 } from 'uuid';

// Load bugs from local storage
export const loadBugs = () => {
  try {
    const bugs = localStorage.getItem('bugs');
    return bugs ? JSON.parse(bugs) : [];
  } catch (error) {
    console.error('Error loading bugs from localStorage:', error);
    return [];
  }
};

// Save bugs to local storage
export const saveBugs = (bugs) => {
  try {
    localStorage.setItem('bugs', JSON.stringify(bugs));
  } catch (error) {
    console.error('Error saving bugs to localStorage:', error);
  }
};

// Create a new bug
export const createBug = (data) => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    status: data.status || 'open',
    priority: data.priority || 'medium',
    createdAt: now,
    updatedAt: now,
    reportedBy: data.reportedBy || 'Anonymous',
    assignedTo: data.assignedTo || '',
    steps: data.steps || '',
    environment: data.environment || '',
    related: data.related || [],
  };
};

// Get bug by ID
export const getBugById = (bugs, id) => {
  return bugs.find((bug) => bug.id === id) || null;
};

// Update a bug
export const updateBug = (bugs, updatedBug) => {
  return bugs.map((bug) => 
    bug.id === updatedBug.id 
      ? { ...bug, ...updatedBug, updatedAt: new Date().toISOString() } 
      : bug
  );
};

// Delete a bug
export const deleteBug = (bugs, id) => {
  return bugs.filter((bug) => bug.id !== id);
};

// Filter bugs
export const filterBugs = (bugs, searchTerm, statusFilter, priorityFilter) => {
  return bugs.filter((bug) => {
    const matchesSearch = searchTerm
      ? bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter && statusFilter !== 'all'
      ? bug.status === statusFilter
      : true;
    
    const matchesPriority = priorityFilter && priorityFilter !== 'all'
      ? bug.priority === priorityFilter
      : true;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
};

// Sort bugs
export const sortBugs = (bugs, sortField, sortDirection) => {
  if (sortField === 'none') return bugs;
  
  return [...bugs].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'priority') {
      const priorityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortField === 'status') {
      const statusOrder = { 'open': 0, 'in-progress': 1, 'in-review': 2, 'resolved': 3 };
      comparison = statusOrder[a.status] - statusOrder[b.status];
    } else if (typeof a[sortField] === 'string') {
      comparison = a[sortField].localeCompare(b[sortField]);
    } else {
      comparison = a[sortField] > b[sortField] ? 1 : -1;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

// Get status counts
export const getStatusCounts = (bugs) => {
  return bugs.reduce((counts, bug) => {
    counts[bug.status] = (counts[bug.status] || 0) + 1;
    return counts;
  }, {});
};

// Get priority counts
export const getPriorityCounts = (bugs) => {
  return bugs.reduce((counts, bug) => {
    counts[bug.priority] = (counts[bug.priority] || 0) + 1;
    return counts;
  }, {});
};

// Get color for priority (for Material UI)
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
    case 'critical':
      return 'error';
    default:
      return 'default';
  }
};

// Get color for status (for Material UI)
export const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'error';
    case 'in-progress':
      return 'primary';
    case 'in-review':
      return 'secondary';
    case 'resolved':
      return 'success';
    default:
      return 'default';
  }
};

// Format time elapsed since a date
export const formatTimeElapsed = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Failed to calculate time elapsed:', error);
    return 'Unknown time';
  }
};
