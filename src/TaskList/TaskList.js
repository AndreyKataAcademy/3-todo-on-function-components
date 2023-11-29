import Task from "../Task/Task";

function TaskList({
  filtered,
  onDoneTask,
  onDeleteTask,
  onControlTimer,
  onCompleteEditTask,
  onEditTask,
  onChangeName,
  taskList,
}) {
  return (
    <ul className="todo-list">
      {filtered === "all" &&
        taskList.map((task, index) => (
          <Task
            task={task}
            taskIndex={index}
            onDoneTask={onDoneTask}
            onDeleteTask={onDeleteTask}
            onControlTimer={onControlTimer}
            onCompleteEditTask={onCompleteEditTask}
            onEditTask={onEditTask}
            onChangeName={onChangeName}
            key={index}
          />
        ))}
      {filtered === "active" &&
        taskList
          .filter(task => !task.isDone)
          .map((task, index) => (
            <Task
              task={task}
              taskIndex={index}
              onDoneTask={onDoneTask}
              onDeleteTask={onDeleteTask}
              onControlTimer={onControlTimer}
              onCompleteEditTask={onCompleteEditTask}
              onEditTask={onEditTask}
              onChangeName={onChangeName}
              key={`${task.name}${task.timeCreated}}`}
            />
          ))}
      {filtered === "completed" &&
        taskList
          .filter(task => task.isDone)
          .map((task, index) => (
            <Task
              task={task}
              taskIndex={index}
              onDoneTask={onDoneTask}
              onDeleteTask={onDeleteTask}
              onControlTimer={onControlTimer}
              onCompleteEditTask={onCompleteEditTask}
              onEditTask={onEditTask}
              onChangeName={onChangeName}
              key={index}
            />
          ))}
    </ul>
  );
}
export default TaskList;
