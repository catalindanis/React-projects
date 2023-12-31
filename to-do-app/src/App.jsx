import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Task from "./Components/Task";
import AddTask from "./Components/AddTask";

let UPDATE = false;
let UPDATE_TITLE;
let UPDATE_DESCRIPTION;

let DELETE = false;
let DELETE_ID;

function App() {
  const [tasksState, setTasksState] = useState([]);

  return (
    <>
      <div className="container-fluid">
        <div className="container m-auto">
          <div className="text-center">
            <h1>Task-list</h1>
          </div>
          <ul
            id="list-group"
            className="list-group"
            onClick={() => {
              if (UPDATE)
                setTasksState((currentList) => {
                  return [
                    ...currentList,
                    {
                      title: UPDATE_TITLE,
                      description: UPDATE_DESCRIPTION,
                      id: crypto.randomUUID(),
                    },
                  ];
                });

              if (DELETE) {
                const arr = [];
                tasksState.map((item) => {
                  if (item.id != DELETE_ID) arr.push(item);
                });
                console.log(arr);
                setTasksState(arr);
              }
            }}
          >
            {tasksState.length == 0 ? (
              <h6 className="text-center">Tasks will be shown here</h6>
            ) : (
              tasksState.map((item, i) => {
                return (
                  <li
                    id={i}
                    key={i}
                    className="list-group-item custom-item border-1"
                  >
                    <Task
                      title={item.title}
                      description={item.description}
                      itemId={item.id}
                    ></Task>
                  </li>
                );
              })
            )}
          </ul>
          <div className="text-center">
            <button
              type="button"
              id="1"
              className="btn btn-dark w-50 custom-button"
              onClick={() => {
                document.getElementById("add-task").style.display = "initial";
                document.getElementById("add-task").focus();
              }}
            >
              <h4>Add task</h4>
            </button>
          </div>
        </div>
        <div id="add-task">
          <AddTask></AddTask>
        </div>
      </div>
    </>
  );
}

export default App;

export function updateList(title, description) {
  UPDATE = true;
  UPDATE_TITLE = title;
  UPDATE_DESCRIPTION = description;
  document.getElementById("list-group").click();
  UPDATE = false;
}

export function deleteItem(id) {
  DELETE = true;
  DELETE_ID = id;
  document.getElementById("list-group").click();
  DELETE = false;
}
