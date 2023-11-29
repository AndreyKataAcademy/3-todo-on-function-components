import { useState } from "react";

export default function NewTaskForm({ onAddTask }) {
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  return (
    <form
      className="new-todo-form"
      onKeyDown={event => {
        if (event.key !== "Enter" || name.length < 2 || (seconds === "" && minutes === "")) return;
        onAddTask({ name, minutes, seconds });
      }}
    >
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={event => {
          if (event.target.value >= 0) setMinutes(event.target.value);
        }}
        type="number"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={event => {
          if (event.target.value >= 0) setSeconds(event.target.value);
        }}
        type="number"
      />
    </form>
  );
}
