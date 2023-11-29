import "./App.css";
import React, { useEffect, useState } from "react";

import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskList from "./TaskList/TaskList";
import TasksFilter from "./TasksFilter/TasksFilter";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [filtered, setFiltered] = useState("all");
  useEffect(() => {
    localStorage.setItem("starttimer", Date.now());
    const endTime = Number(localStorage.getItem("endtimer"));
    const StartTime = Number(localStorage.getItem("starttimer"));
    const delay = (StartTime - endTime) / 1000;
    const timeout = setTimeout(() => {
      setTaskList(prev => {
        return prev.map(element => {
          if (element.timer <= 0) {
            element.isDone = true;
            element.isStartTimer = false;
            element.timer = 0;
          }
          if (element.isStartTimer) {
            element.timer -= delay;
          }
          return { ...element };
        });
      });
    }, 1000);

    localStorage.setItem("endtimer", Date.now());
    return () => {
      clearTimeout(timeout);
    };
  }, [taskList]);
  function handleAddTask(task) {
    setTaskList(taskList => [
      ...taskList,
      {
        name: task.name,
        timeCreated: Date.now(),
        isDone: false,
        timer: Number(task.minutes) * 60 + Number(task.seconds),
        isStartTimer: true,
        isEdition: false,
        id: Math.random() + task.name,
      },
    ]);
  }
  function handleChangeName(event, index) {
    setTaskList(taskList => {
      const result = [...taskList];
      result.at(index).name = event.target.value;
      return [...result];
    });
  }
  function handleDoneTask(id) {
    console.log(id);
    setTaskList(taskList => {
      const previousState = [...taskList];
      if (!previousState.at(previousState.findIndex(el => el.id === id)).isDone) handleControlTimer("pause", id);
      if (previousState.at(previousState.findIndex(el => el.id === id)).isDone) handleControlTimer("play", id);
      previousState.at(previousState.findIndex(el => el.id === id)).isDone = !previousState.at(
        previousState.findIndex(el => el.id === id)
      ).isDone;

      return [...previousState];
    });
  }
  function handleEditTask(index) {
    setTaskList(taskList => {
      const result = [...taskList];
      result[index].isEdition = true;
      return [...result];
    });
  }
  function handleCompleteEditTask(index) {
    setTaskList(taskList => {
      const result = [...taskList];
      result[index].isEdition = false;
      return [...result];
    });
  }
  function handleDeleteTask(index) {
    setTaskList(taskList => {
      const result = [...taskList];
      result.splice(index, 1);
      return [...result];
    });
  }
  function handleControlTimer(action, id) {
    setTaskList(taskList => {
      const result = [...taskList];
      if (action === "play") result.at(id).isStartTimer = true;
      if (action === "pause") result.at(id).isStartTimer = false;
      return [...result];
    });
  }
  function handleDeleteCompletedTasks() {
    setTaskList(taskList => taskList.filter(task => !task.isDone));
  }
  function handleChangeFilter(filter) {
    setFiltered(filter);
  }

  const countNotCompletedTasks = taskList.filter(task => !task?.isDone).length;
  const countCopmletedTasks = taskList.filter(task => task?.isDone).length;
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={handleAddTask} />
        </header>
        <section className="main">
          <TaskList
            taskList={taskList}
            onDoneTask={handleDoneTask}
            onDeleteTask={handleDeleteTask}
            filtered={filtered}
            onControlTimer={handleControlTimer}
            onEditTask={handleEditTask}
            onCompleteEditTask={handleCompleteEditTask}
            onChangeName={handleChangeName}
          />
          <TasksFilter
            filtered={filtered}
            onChangeFilter={handleChangeFilter}
            onDeleteCompletedTasks={handleDeleteCompletedTasks}
            countNotCompletedTasks={countNotCompletedTasks}
            countCopmletedTasks={countCopmletedTasks}
          />
        </section>
      </section>
    </>
  );
}

export default App;
