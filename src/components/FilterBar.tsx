import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

const FilterBar: React.FC = () => {
  const { filter, setFilter } = useTasks();

  const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: 'All' | 'Completed' | 'Pending') => {
    if (newFilter !== null) setFilter(newFilter);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} aria-label="Task filter">
        <ToggleButton value="All" aria-label="All tasks">All</ToggleButton>
        <ToggleButton value="Completed" aria-label="Completed tasks">Completed</ToggleButton>
        <ToggleButton value="Pending" aria-label="Pending tasks">Pending</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterBar;
