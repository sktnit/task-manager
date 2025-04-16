import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task } from '../types';

// Define the context props
interface TaskContextProps {
  tasks: Task[];
  filteredTasks: Task[];
  filter: 'All' | 'Completed' | 'Pending';
  setFilter: React.Dispatch<React.SetStateAction<'All' | 'Completed' | 'Pending'>>;
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// Create the context
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Hook to use context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');

  // Memoized task operations using functional updates
  const addTask = useCallback((text: string) => {
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, [setTasks]);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleComplete = useCallback((id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  // Derived filtered task list
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Final context value
  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    toggleComplete,
    setTasks
  }), [tasks, filteredTasks, filter, addTask, deleteTask, toggleComplete, setTasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
