import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [title, setText] = useState("");
  return (
    <>
      <input
        placeholder="Add task"
        value={title}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          onAddTask(title);
        }}
      >
        Add
      </button>
    </>
  );
}
