import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import ListOfTasks from "./ListOfTasks";
import axios from "axios";

export default function Tasks({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState("");
  const [taskOpen, setTaskOpen] = useState(true);
  const [toggleButton, setToggleButton] = useState("Close");
  const [color, setColor] = useState("red");

  const handleSubmit = (e) => {
    addTask();
    e.preventDefault();
  };

  useEffect(() => {
    getTaskList();
  });

  const getTaskList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/myTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (task && myDate) {
      try {
        const response = await axios.post("http://localhost:4000/myTasks", {
          text: task,
          date: myDate,
        });
        setTasks([...tasks, response.data]);
        setTask("");
        setMyDate("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleOnChangeTask = (e) => {
    setTask(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setMyDate(e.target.value);
  };

  const deleteTask = async (index) => {
    try {
      await axios.delete(`http://localhost:4000/myTasks/${index}`);
      const updatedTasks = tasks.filter((i) => i !== index);
      setTasks(updatedTasks);
      getTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id, newTask, newDate) => {
    try {
      await axios.put(`http://localhost:4000/myTasks/${id}`, {
        text: newTask,
        date: newDate,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleToggle = () => {
    if (toggleButton === "Close") {
      setTaskOpen(false);
      setToggleButton("Open");
      setColor("green");
    } else if (toggleButton === "Open") {
      setTaskOpen(true);
      setToggleButton("Close");
      setColor("red");
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <button
          onClick={handleToggle}
          style={{
            backgroundColor: color,
            color: "white",
            padding: "5px",
            width: "90px",
          }}
        >
          {toggleButton}
        </button>
        {taskOpen && (
          <div>
            {" "}
            <h1>Task Tracker</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Task">
                <b>Task</b>
                <br></br>
                <input
                  type="text"
                  name="task"
                  placeholder="write your task here..."
                  value={task}
                  onChange={handleOnChangeTask}
                ></input>
              </label>
              <br></br>
              <label htmlFor="Date">
                <b>Day & Time</b>
                <br></br>
                <input
                  type="date"
                  name="myDate"
                  placeholder="Please select your date.."
                  value={myDate}
                  onChange={handleOnChangeDate}
                ></input>
              </label>
              <br></br>
              <button type="submit" className={styles.mySubmitButton}>
                Save Task
              </button>
              <br></br>
              <br></br>
            </form>
          </div>
        )}
        <ListOfTasks
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
        ></ListOfTasks>
      </div>
    </main>
  );
}
