import React from "react";
import styles from "./ListOfTasks.module.css";
import { Link } from "react-router-dom";

export default function ListOfTasks(props) {
  return (
    <main>
      {props.tasks.length ? (
        <div>
          <ol type="none">
            {props.tasks.map((task, index) => (
              <li key={index}>
                <div className={styles.container}>
                  <button onClick={() => props.deleteTask(task.id)}>X</button>
                  <Link to={`/tasks/${task.id}`}>
                    <h1>{task.text}</h1>
                  </Link>
                  <p>
                    <Link to={`/tasks/${task.id}`}>{task.date}</Link>
                  </p>
                </div>
                <br />
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </main>
  );
}
