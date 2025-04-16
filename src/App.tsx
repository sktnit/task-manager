import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
const App: React.FC = () => {
  return (
    <TaskProvider>
      <Box display="flex" justifyContent="flex-end" sx={{mt:2, mr:2}}>
        <ThemeToggle />
      </Box>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Task Manager
          </Typography>

          <Box my={2}>
            <TaskForm />
            <FilterBar />
            <TaskList />
          </Box>
        </Paper>
      </Container>
    </TaskProvider>
  );
};

export default App;
