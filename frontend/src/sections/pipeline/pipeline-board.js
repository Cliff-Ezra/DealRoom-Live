import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const tasks = [
  {
    id: 1,
    title: "Door Repairs",
    details: "Fix broken door knob",
    property: "Kololo Villas",
    unit: "Unit 1",
    category: "Repairs",
    dueDate: new Date("2023-07-23"),
    status: "In Progress",
  },
  {
    id: 2,
    title: "Plumbing",
    details: "Fix leaking faucet",
    property: "Ntinda Apartments",
    unit: "Unit 2",
    category: "Maintenance",
    dueDate: new Date("2020-08-10"),
    status: "In Progress",
  },
  {
    id: 3,
    title: "Painting",
    details: "Repaint hallway",
    property: "Najjera Gardens",
    unit: "Unit 3",
    category: "Repairs",
    dueDate: new Date("2023-06-30"),
    status: "In Progress",
  },
  {
    id: 4,
    title: "Gardening",
    details: "Mow lawn",
    property: "Muyenga Heights",
    unit: "Unit 4",
    category: "Maintenance",
    dueDate: new Date("2023-07-15"),
    status: "In Progress",
  },
  {
    id: 5,
    title: "Cleaning",
    details: "Clean common area",
    property: "Bukoto Flats",
    unit: "Unit 5",
    category: "Maintenance",
    dueDate: new Date("2022-07-01"),
    status: "In Progress",
  },
];

function KanbanBoard() {
  const [inProgressTasks, setInProgressTasks] = useState(
    tasks.filter((task) => task.status === "In Progress")
  );
  const [pastDueTasks, setPastDueTasks] = useState(
    tasks.filter((task) => task.status === "Past Due")
  );
  const [doneTasks, setDoneTasks] = useState(tasks.filter((task) => task.status === "Done"));
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder tasks within the same column
      const column =
        source.droppableId === "inProgress"
          ? inProgressTasks
          : source.droppableId === "pastDue"
          ? pastDueTasks
          : doneTasks;
      const newColumn = [...column];
      const [removedTask] = newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, removedTask);

      if (source.droppableId === "inProgress") {
        setInProgressTasks(newColumn);
      } else if (source.droppableId === "pastDue") {
        setPastDueTasks(newColumn);
      } else {
        setDoneTasks(newColumn);
      }
    } else {
      // Move tasks between columns
      const sourceColumn =
        source.droppableId === "inProgress"
          ? inProgressTasks
          : source.droppableId === "pastDue"
          ? pastDueTasks
          : doneTasks;
      const destinationColumn =
        destination.droppableId === "inProgress"
          ? inProgressTasks
          : destination.droppableId === "pastDue"
          ? pastDueTasks
          : doneTasks;
      const newSourceColumn = [...sourceColumn];
      const newDestinationColumn = [...destinationColumn];
      const [removedTask] = newSourceColumn.splice(source.index, 1);

      // Check if task is allowed to move to Past Due column
      if (destination.droppableId === "pastDue" && removedTask.dueDate > new Date()) {
        return;
      }

      // Update task status based on destination column
      removedTask.status =
        destination.droppableId === "inProgress"
          ? "In Progress"
          : destination.droppableId === "pastDue"
          ? "Past Due"
          : "Done";

      newDestinationColumn.splice(destination.index, 0, removedTask);

      if (source.droppableId === "inProgress") {
        setInProgressTasks(newSourceColumn);
      } else if (source.droppableId === "pastDue") {
        setPastDueTasks(newSourceColumn);
      } else {
        setDoneTasks(newSourceColumn);
      }

      if (destination.droppableId === "inProgress") {
        setInProgressTasks(newDestinationColumn);
      } else if (destination.droppableId === "pastDue") {
        setPastDueTasks(newDestinationColumn);
      } else {
        setDoneTasks(newDestinationColumn);
      }
    }
  };
  if (!winReady) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ paddingBottom: 2 }}>
          <h2>In Progress</h2>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {inProgressTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardContent>
                          <Typography variant="h5">{task.title}</Typography>
                          <Typography variant="body1">{task.dueDate.toDateString()}</Typography>
                          <Typography variant="body1">{task.property}</Typography>
                          <Typography variant="body1">{task.category}</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={4}>
          <h2>Past Due</h2>
          <Droppable droppableId="pastDue">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {pastDueTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ bgcolor: "rgb(240 68 56)" }}
                      >
                        <CardContent>
                          <Typography variant="h5">{task.title}</Typography>
                          <Typography variant="body1">{task.dueDate.toDateString()}</Typography>
                          <Typography variant="body1">{task.property}</Typography>
                          <Typography variant="body1">{task.category}</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={4}>
          <h2>Done</h2>
          <Droppable droppableId="done">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {doneTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ bgcolor: "rgb(19 185 129)" }}
                      >
                        <CardContent>
                          <Typography variant="h5">{task.title}</Typography>
                          <Typography variant="body1">{task.dueDate.toDateString()}</Typography>
                          <Typography variant="body1">{task.property}</Typography>
                          <Typography variant="body1">{task.category}</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default KanbanBoard;
