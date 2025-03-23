import React from 'react';
import { Chip } from '@mui/material';

const PriorityBadge = ({ priority, className }) => {
  const getColorByPriority = () => {
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

  const getLabel = () => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <Chip 
      label={getLabel()} 
      color={getColorByPriority()} 
      size="small"
      sx={{ fontWeight: 'medium' }}
      className={className}
    />
  );
};

export default PriorityBadge;
