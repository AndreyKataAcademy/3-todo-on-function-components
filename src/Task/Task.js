import { formatDistanceToNow } from "date-fns";
import React from "react";

function Task({
  task,
  taskIndex,
  onDoneTask,
  onDeleteTask,
  onChangeName,
  onCompleteEditTask,
  onControlTimer,
  onEditTask,
}) {
  const { id, name, isDone, timeCreated, timer, isEdition } = task;
  console.log(taskIndex);
  return (
    <li className={`${isDone ? "completed" : ""} ${isEdition ? "editing" : ""}`}>
      <div className="view">
        <input checked={isDone} className="toggle" type="checkbox" onChange={() => onDoneTask(id)} />
        <label>
          <span className="title">{name}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => onControlTimer("play", taskIndex)}></button>
            <button className="icon icon-pause" onClick={() => onControlTimer("pause", taskIndex)}></button>
            {timeFormatter(Math.round(timer))}
          </span>
          <span className="description">{formatDistanceToNow(timeCreated)}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEditTask(taskIndex)}></button>
        <button
          onClick={() => {
            onDeleteTask(taskIndex);
          }}
          className="icon icon-destroy"
        ></button>
      </div>
      {isEdition && (
        <input
          type="text"
          className="edit"
          onKeyDown={event => {
            if (!(event.key === "Enter")) return;
            onChangeName(event, taskIndex);
            onCompleteEditTask(taskIndex);
          }}
        />
      )}
    </li>
  );
}

export default Task;

function timeFormatter(timer) {
  if (timer >= 60) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  }
  if (timer < 60 && timer > 0) {
    const seconds = timer % 60;
    return `00:${seconds > 9 ? seconds : `0${seconds}`}`;
  }
  if (timer <= 0) {
    return "00:00";
  }
}
