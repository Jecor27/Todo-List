import { useState, useReducer } from "react";
import "./App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
let nextId = 3;
const initialState = [
  { id: 0, title: "Create Mockup", completed: true },
  { id: 1, title: "Create Static Layout", completed: false },
  { id: 2, title: "Add Interactivity", completed: false },
];

function reducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        {
          id: action.id,
          title: action.title,
          completed: false,
        },
        ...tasks,
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  function handleAddTask(title) {
    dispatch({
      type: "added",
      id: nextId++,
      title: title,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <div>
      <h1>My TO-DO List</h1>
      <div className="textColor">
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
      </div>
    </div>
  );
}
