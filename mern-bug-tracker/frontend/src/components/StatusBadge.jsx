import React from 'react';
import { Chip } from '@mui/material';

const StatusBadge = ({ status, className }) => {
  const getColorByStatus = () => {
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

  const getStatusLabel = () => {
    return status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Chip 
      label={getStatusLabel()} 
      color={getColorByStatus()} 
      size="small"
      sx={{ fontWeight: 'medium' }}
      className={className}
    />
  );
};

export default StatusBadge;
