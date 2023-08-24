import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MainTask.module.css";

export default function MainTask({ tasks }) {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/myTasks/${taskId}`
      );
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleBack = () => {
    navigate("/tasks");
  };

  const handleEdit = () => {
    setCanEdit(true);
  };

  const handleOnChangeTask = (e) => {
    setEditedText(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setEditedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (editedText && editedDate) {
      try {
        await axios.put(`http://localhost:4000/myTasks/${id}`, {
          text: editedText,
          date: editedDate,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
    e.preventDefault();
    setCanEdit(false);
  };

  return (
    <main>
      <div className={styles.container}>
        <button className={styles.myBackButton} onClick={handleBack}>
          Back
        </button>
        <h1>{task.text}</h1>
        <p>{task.date}</p>
        <button className={styles.myEditButton} onClick={handleEdit}>
          Edit
        </button>
        <br></br>
        <br></br>
        {canEdit && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="Task">
              <b>Task</b>
              <br></br>
              <input
                type="text"
                name="task"
                placeholder="write your task here..."
                value={editedText}
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
                placeholder="Please select your date..."
                value={editedDate}
                onChange={handleOnChangeDate}
              ></input>
            </label>
            <br></br>
            <button type="submit" className={styles.myUpdateButton}>
              Update
            </button>
            <br></br>
            <br></br>
          </form>
        )}
      </div>
    </main>
  );
}
