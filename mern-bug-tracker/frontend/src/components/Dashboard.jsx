import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader,
  Typography, 
  Grid,
  Box,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CheckCircle, 
  Timer, 
  Warning, 
  Refresh
} from '@mui/icons-material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { getStatusCounts, getPriorityCounts } from '../lib/bug-utils';

const AnimatedCard = styled(Card)(({ theme, delay = 0 }) => ({
  animation: 'fadeIn 0.3s ease-out forwards',
  animationDelay: `${delay}ms`,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.light,
    boxShadow: theme.shadows[2]
  }
}));

const StatCard = ({ title, value, description, icon, trend, to, delay = 0 }) => {
  const content = (
    <AnimatedCard delay={delay}>
      <CardHeader 
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="medium">{title}</Typography>
            {icon}
          </Box>
        }
        sx={{ paddingBottom: 1 }}
      />
      <CardContent>
        <Typography variant="h4" fontWeight="bold">{value}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        {trend && (
          <Box mt={1} display="flex" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {trend.value.toFixed(0)}% {trend.label}
            </Typography>
          </Box>
        )}
      </CardContent>
    </AnimatedCard>
  );

  return to ? <Link to={to} style={{ textDecoration: 'none' }}>{content}</Link> : content;
};

const Dashboard = ({ bugs }) => {
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  
  useEffect(() => {
    const statusCounts = getStatusCounts(bugs);
    const priorityCounts = getPriorityCounts(bugs);
    
    setStatusData([
      { name: 'Open', value: statusCounts.open || 0 },
      { name: 'In Progress', value: statusCounts['in-progress'] || 0 },
      { name: 'In Review', value: statusCounts['in-review'] || 0 },
      { name: 'Resolved', value: statusCounts.resolved || 0 },
    ]);
    
    setPriorityData([
      { name: 'Low', value: priorityCounts.low || 0 },
      { name: 'Medium', value: priorityCounts.medium || 0 },
      { name: 'High', value: priorityCounts.high || 0 },
      { name: 'Critical', value: priorityCounts.critical || 0 },
    ]);
  }, [bugs]);

  const openCount = bugs.filter(bug => bug.status === 'open').length;
  const inProgressCount = bugs.filter(bug => bug.status === 'in-progress').length;
  const resolvedCount = bugs.filter(bug => bug.status === 'resolved').length;
  const criticalCount = bugs.filter(bug => bug.priority === 'critical').length;
  
  const COLORS = ['#ef4444', '#3b82f6', '#8b5cf6', '#22c55e'];
  const PRIORITY_COLORS = ['#22c55e', '#f59e0b', '#f97316', '#ef4444'];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Open Issues"
          value={openCount}
          description="Awaiting review"
          icon={<Warning fontSize="small" color="error" />}
          trend={{ value: (openCount/bugs.length)*100, label: "of total" }}
          to="/bugs?status=open"
          delay={100}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="In Progress"
          value={inProgressCount}
          description="Currently being fixed"
          icon={<Refresh fontSize="small" color="primary" sx={{ animation: 'spin 2s linear infinite' }} />}
          trend={{ value: (inProgressCount/bugs.length)*100, label: "of total" }}
          to="/bugs?status=in-progress"
          delay={200}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Resolved"
          value={resolvedCount}
          description="Issues fixed"
          icon={<CheckCircle fontSize="small" color="success" />}
          trend={{ value: (resolvedCount/bugs.length)*100, label: "of total" }}
          to="/bugs?status=resolved"
          delay={300}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Critical Issues"
          value={criticalCount}
          description="Highest priority"
          icon={<Warning fontSize="small" color="error" />}
          trend={{ value: (criticalCount/bugs.length)*100, label: "of total" }}
          to="/bugs?priority=critical"
          delay={400}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <AnimatedCard sx={{ overflow: 'hidden' }} delay={500}>
          <CardHeader 
            title="Bugs by Status" 
            subheader="Distribution of bugs across different statuses"
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            subheaderTypographyProps={{ variant: 'body2' }}
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ p: 0 }}>
            <Box height={240}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </AnimatedCard>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <AnimatedCard sx={{ overflow: 'hidden' }} delay={600}>
          <CardHeader 
            title="Bugs by Priority" 
            subheader="Distribution of bugs across priority levels"
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            subheaderTypographyProps={{ variant: 'body2' }}
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ p: 0 }}>
            <Box height={240}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priorityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </AnimatedCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;