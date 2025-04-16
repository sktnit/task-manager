import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import {
  Box,
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const TaskList: React.FC = () => {
  const { tasks, setTasks, filter, toggleComplete, deleteTask } = useTasks();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "Completed":
        return tasks.filter((task) => task.completed);
      case "Pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const isDraggable = filter === "All";

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);

    setTasks(reordered);
  };

  return (
    <DragDropContext onDragEnd={isDraggable ? handleDragEnd : () => {}}>
      <Droppable
        droppableId="taskList"
        type="group"
        isDropDisabled={!isDraggable}
      >
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              maxWidth: "600px",
              margin: "0 auto",
              p: 0,
              overflowY: "auto",
              maxHeight: "80vh",
            }}
          >
            {(isDraggable ? tasks : filteredTasks).map((task, index) =>
              isDraggable ? (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 1,
                        backgroundColor: "background.paper",
                        borderRadius: "4px",
                        p: 0,
                        transition: "all 0.2s ease", // 👈 smooth movement
                      }}
                    >
                      <TaskCard
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                      />
                    </ListItem>
                  )}
                </Draggable>
              ) : (
                <ListItem key={task.id} sx={{ mb: 1 }}>
                  <TaskCard
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                  />
                </ListItem>
              )
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const TaskCard: React.FC<{
  task: { id: number; text: string; completed: boolean };
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}> = ({ task, toggleComplete, deleteTask }) => (
  <Card sx={{ width: "100%" }}>
    <CardContent
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <ListItemText primary={task.text} />
      </Box>
      <IconButton edge="end" onClick={() => deleteTask(task.id)}>
        <Delete />
      </IconButton>
    </CardContent>
  </Card>
);

export default TaskList;
