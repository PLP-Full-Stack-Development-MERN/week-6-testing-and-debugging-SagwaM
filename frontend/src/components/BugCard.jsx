import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatTimeElapsed } from '../lib/bug-utils';

const BugCard = ({ bug, animationDelay = 0 }) => {
  const { id, title, description, status, priority, createdAt, updatedAt, reportedBy, assignedTo } = bug;

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        },
        animation: 'fadeIn 0.3s ease-out forwards',
        animationDelay: `${animationDelay}ms`
      }}
    >
      <CardActionArea component={Link} to={`/bugs/${id}`} sx={{ height: '100%' }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <StatusBadge status={status} />
            <PriorityBadge priority={priority} />
          </Box>
          
          <Typography variant="h6" component="h3" noWrap gutterBottom>
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2
          }}>
            {description}
          </Typography>
          
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Reported by: <Box component="span" fontWeight="medium">{reportedBy}</Box>
          </Typography>
          
          {assignedTo && (
            <Typography variant="caption" color="text.secondary" display="block">
              Assigned to: <Box component="span" fontWeight="medium">{assignedTo}</Box>
            </Typography>
          )}
        </CardContent>
        
        <Divider />
        
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Created {formatTimeElapsed(createdAt)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Updated {formatTimeElapsed(updatedAt)}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default BugCard;
