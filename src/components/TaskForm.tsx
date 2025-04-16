import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Box, Button, TextField } from '@mui/material';

const TaskForm: React.FC = () => {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim());
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, my: 2 }}>
      <TextField
        fullWidth
        label="Enter a task"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
