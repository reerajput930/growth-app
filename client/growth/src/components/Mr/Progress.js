import React, { useState, useEffect } from "react";
import "../Progress.css";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../ThemeContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-regular-svg-icons'


export default function Tasks() {
  const navigate = useNavigate();

  // for theme color
  const [colorLoading,setcolorLoading] = useState(false)
  const theme = useThemeContext();
  const { changeTheme } = theme;

  const { anger, satisfy, stay, peace } = theme.theme;
  
  
  let applytheme 

  if (anger) {
    applytheme = theme.theme.angerColor;
    if(!colorLoading){
      setcolorLoading(true)
    }
  } else if (satisfy) {
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




  

  // const [taskNo, setTaskNo] = useState(1);

  const [storeTasks, setStoreTasks] = useState({
    tasks: [],
  });
  
  var tasks = {
    todo: [],
    inprogress: [],
    close: [],
    done: [],
  };

  useEffect(() => {
    async function fetchAllTasks() {
      //   // e.preventDefault();
      const response = await fetch("https://growth-app-backend.onrender.com/api/mr/progress/alltask");

      const data = await response.json();

      if (data.status === "success") {
    
        // console.log(data)
        // console.log(data.tasks);
    
        setStoreTasks({ tasks: data.tasks});
        
      } else {
        console.log("error in fetching data from api");
      }
    }
    fetchAllTasks();
  }, []);


  async function updateTasks(task) {
    const response = await fetch("https://growth-app-backend.onrender.com/api/mr/progress/updatetask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  // drag and drop important methods---------------------
  const dragStart = (e, _id) => {
    console.log("this task is draged:", _id);
    e.dataTransfer.setData("id", _id);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const drop = (e, category) => {
    let id = e.dataTransfer.getData("id");
    // console.log(category);

    let task = storeTasks.tasks.filter((task) => {
      if (task._id == id) {
        task.category = category;
        // console.log(task)
        updateTasks(task);
      }
      return task;
    });
    // console.log(task);
    // don't know how is this working
    setStoreTasks({ ...storeTasks, task });
    // console.log(storeTasks);
  };

  // --------------------------------------------------

  async function del(e, taskId) {
    e.preventDefault()
    console.log(taskId)
    const response = await fetch("https://growth-app-backend.onrender.com/api/mr/progress/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: taskId }),
    }).catch((error) => {
      console.log(error);
    });

    window.location.reload();
  }




  storeTasks.tasks.map((task) => {
    // console.log("below is the task..")
    // console.log(task);
    tasks[task.category].push(
      <div
        onDragStart={(e) => dragStart(e, task._id)}
        draggable
        key={task._id}
        className="task--detail "
        // style={{ backgroundColor: task.bgcolor }}
        
      >
        {/* <h3>{task.taskNo}</h3> */}
        <p className="text-xs font-mono">{task.taskDesc}</p>
        <div className="tags--block flex flex-wrap">
          {task.tags.map((tag) => {
            return <b className="text-[12px]">#{tag}</b>;
          })}
        </div>
        <div className="btn--block flex">
          <button className=" font-semibold  text-xs  " onClick={(e) => del(e, task._id)}
            style={ colorLoading ? { background: applytheme.dark, color: applytheme.light }: {}}
          >
        
            DELETE   </button>
            <Link className="" to={"/mr_progress/mr_editprogress"} onClick={()=>{ localStorage.setItem("task._id" ,task._id) }} ><FontAwesomeIcon  className="mt-[10px] w-3 ml-1" icon={faEdit} /></Link>
          {/* <button>edit</button> */}
        </div>
      </div>
    );
  });
  
  function direct(e){
    console.log("hello")
    console.log(e.target.value)
    if(e.target.value === "curent-todo"){
       navigate('/mr_currenttask');
    }
    else if(e.target.value === "progress"){
       navigate('/mr_progress');
    }
  }


  return (
    <div className="taskmanger--block  ">
       <select onChange={(e)=>{direct(e)}}  className="font-medium text-sm outline-none border-gray-500 rounded-md border-[1px] p-1 m-3 " name="" id="">
        <option  value="progress">Progress Report</option>
        <option value="curent-todo">Current Todo</option>
      </select>
      <h1 className="heading  mt-12 font-bold text-xl ">Karan's Task progress Report!</h1>
      <div className="tasks--detail   ">
        {/* todo */}
        <div
          className="todo task--block  "
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e, "todo")}
        >
          <h2>To Do</h2>
          <div className="task--detail add--more">
              <Link to={"/mr_progress/mr_createtodo"}>
            <span className="text-sm">
                <b>+</b> Add task
            </span>
              </Link>
          </div>
          {tasks.todo}
        </div>

        {/* in progress */}
        <div
          className="inprogress task--block"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e, "inprogress")}
        >
          <h2>In Progress</h2>
          {tasks.inprogress}
        </div>

        {/* done */}
        <div
          className="done task--block"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e, "done")}
        >
          <h2>Done</h2>
          {tasks.done}
        </div>

       
       
      </div>
    </div>
  );
}
