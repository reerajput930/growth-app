import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../ThemeContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {BASE_URL} from "../Api"

export default function Miss() {
  const navigate = useNavigate();
  const [colorLoading,setcolorLoading] = useState(false)
  const [task, setTask] = useState({
    todo: "",
    mark: "",
  });
  const [allTask, setAllTask] = useState();
  const [loading, setLoading] = useState(true);

  // --------------fetching (get )api-------------
  async function fetchTasks() {
    const response = await fetch(`${BASE_URL}/api/miss/alltodo`);
    const data = await response.json();
    // console.log(data)
    if (data.status === "success") {
      setAllTask(data.tasks);
    }
    console.log(allTask);
    setLoading(false);
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------post api-----------------
  async function submitted(e) {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/api/miss/addtodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    setTask({ todo: "", mark: "" });

    fetchTasks();
  }

  // ----------------delete api----------------------
  async function deleteTask(e, _id) {
    e.preventDefault();
    console.log(_id);

    const response = await fetch(`${BASE_URL}/api/miss/removetodo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });

    fetchTasks();
  }

  // ------------- update operation put api --------------
  async function updateTask(e, _id, mark) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/miss/updatetodo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, mark }),
    });
    fetchTasks();
  }

  // --------------context-----------------------
  const theme = useThemeContext();
  const { anger, satisfy, stay, peace } = theme.theme;
  let applytheme =JSON.parse(localStorage.getItem("themeColor"));
  if (anger) {
      if(!colorLoading){
      setcolorLoading(true)
    }
    applytheme = theme.theme.angerColor;
  } else if (satisfy) {
      if(!colorLoading){
      setcolorLoading(true)
    }
    applytheme = theme.theme.satisfyColor;
  } else if (stay) {
      if(!colorLoading){
      setcolorLoading(true)
    }
    applytheme = theme.theme.stayColor;
  } else if (peace) {
      if(!colorLoading){
      setcolorLoading(true)
    }
    applytheme = theme.theme.peaceColor;
  }

  let tasks;
  if (!loading) {
    tasks = allTask.map((task) => {
      let mark;
      if (task.mark) {
        mark = "line-through";
      } else {
        mark = "none";
      }
      return (
        <div
          className="w-[100%] flex justify-between border-2 font-medium border-none mt-2 rounded-md p-2"
          style={ colorLoading ? { background: applytheme.dark, color: applytheme.light }: {}}
        
        >
          <p className="inline" style={{ textDecorationLine: mark }}>
            {task.todo}
          </p>
          <div className="icon">
            <FontAwesomeIcon
              onClick={(e) => {
                updateTask(e, task._id, task.mark);
              }}
              className="mr-2 cursor-pointer"
              icon={faCheckCircle}
            />
            <FontAwesomeIcon
              onClick={(e) => {
                deleteTask(e, task._id);
              }}
              className="cursor-pointer"
              icon={faTrashCan}
            />
          </div>
        </div>
      );
    });
  }
  function direct(e) {
   
    if (e.target.value === "curent-todo") {
      navigate("/miss_currenttask");
    } else if (e.target.value === "progress") {
      navigate("/miss_progress");
    }
  }

  return (
    <div className="mr-task-block w-[60%]  flex flex-col items-center  ">
      <select
        onChange={(e) => {
          direct(e);
        }}
        className=" font-medium text-sm outline-none  border-gray-500 rounded-md border-[1px] p-1 m-3"
        name=""
        id=""
      >
        <option value="curent-todo">Current Todo</option>
        <option value="progress">Progress Report</option>
      </select>

      <div
        className="mr--name text-center text-2xl font-semibold mt-14"
        style={ colorLoading ? { color: applytheme.dark }: {}}
      >
        Riya's ToDo
      </div>
      <div className="mr--input mb-8 w-[-webkit-fill-available]">
        <form onSubmit={submitted}>
          <input
            type="text"
            value={task.todo}
            className="inline w-[100%] border-2 border-gray-400 mt-5 rounded-md p-2 outline-none"
            placeholder="e.g excercise"
            onChange={(e) => setTask({ todo: e.target.value })}
          />
          {/* <button className="inline">submit</button> */}
        </form>
      </div>
      <div className="miss--todo  flex flex-col justify-center w-[-webkit-fill-available]">{tasks}</div>
    </div>
  );
}
