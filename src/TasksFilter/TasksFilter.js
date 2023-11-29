import React from "react";

function TasksFilter({
  filtered,
  onChangeFilter,
  countCopmletedTasks,
  countNotCompletedTasks,
  onDeleteCompletedTasks,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {countNotCompletedTasks > 0 ? `${countNotCompletedTasks} items left` : "All tasks completed"}
      </span>
      <ul className="filters">
        <li>
          <button
            disabled={filtered === "all"}
            className={filtered === "all" ? "selected" : ""}
            onClick={() => onChangeFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            disabled={filtered === "active"}
            className={filtered === "active" ? "selected" : ""}
            onClick={() => onChangeFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            disabled={filtered === "completed"}
            className={filtered === "completed" ? "selected" : ""}
            onClick={() => onChangeFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      {countCopmletedTasks > 0 ? (
        <button className="clear-completed" onClick={onDeleteCompletedTasks}>
          Clear {countCopmletedTasks} completed tasks
        </button>
      ) : (
        "No tasks for removing"
      )}
    </footer>
  );
}
export default TasksFilter;
