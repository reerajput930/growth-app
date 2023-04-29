import React, { useState,useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Addtags from "./Addtags";
import "../CreateToDo.css"

export default function CreateTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
  
    taskDesc: "",
    tags: [],
  });

  // first is to fetch the data
   useEffect(()=>{

    async function fetchData(){ 
      console.log(localStorage.getItem("task._id"))
      const response  = await fetch(`https://growth-app-backend.onrender.com/api/miss/progress/${localStorage.getItem("task._id")}`)
      const data = await response.json()
   
      if (data.status === "success") {
        console.log(data)
        setTask({ taskDesc: data.tasks.taskDesc,tags:data.tasks.tags});
        
      } else {
        console.log("error in fetching single task from api");
      }

    }
    fetchData()

   },[])

 
 
  async function submitted(e) {
    e.preventDefault();
    console.log(task)
    const response = await fetch(`https://growth-app-backend.onrender.com/api/miss/progress/updatetask/${localStorage.getItem("task._id")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    // console.log(data);
    if (data.status === "failed") {
      window.alert("Fill the data completely!");
    }
   
    // console.log(task)

    setTask({
      
      taskDesc: "",
      tags:""
    });

    // <Link to={"/tasks"}></Link>
    navigate('/miss_progress');
  }
  // ----- func is the way to pass props from child to parent
  // ----- here passing the tags
  const pull_tags = (data) => {
    // console.log(data);
    task.tags = data;
    // console.log(task);
  };

  // preventing the form to submit by clicking the enter
  function handleKeyDown(e){
    if (e.keyCode === 13 ) {
     e.preventDefault();
    }
  }
  console.log(task.tags)
  
  return (
    <div className="flex justify-center align-middle w-full" >
    <div className="create--task bg-white mt-20 w-[45%]">
      <h2 className=" font-bold text-lg ">Edit the Task!</h2>
      <form     
      >
      
        <label htmlFor="taskNo"  className="ml-3 text-sm" >Task-Detail:</label>
        <textarea
           name="taskDetail"
           cols="20"
           rows="20"
          value={task.taskDesc}
          onChange={(e) => setTask({ ...task, taskDesc: e.target.value })}
          placeholder="e.g. Finding the bug"
          className=" border-grey border-2 rounded-lg text-xs font-mono  "
        ></textarea>
         
         {/* tags section */}
        <Addtags func={pull_tags} />

        <button onClick={submitted} type="submit" className="bg-[#0091D5] text-white text-sm font-medium hover:bg-[#1C4E80] p-1 rounded-lg mt-14 mb-2  ">
          SUBMIT
        </button>
        <Link to={"/miss_progress"} className="contents" >
          <button className="bg-[#0091D5] text-white text-sm font-medium hover:bg-[#1C4E80]  p-1  rounded-lg mt-0 mb-5  ">BACK</button>
        </Link>
      </form>
    </div>
          </div>
  );
}
