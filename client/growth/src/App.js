import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { useThemeContext } from "./ThemeContextProvider";
import Mr_CurrentTask from "./components/Mr/CurrentTask";
import Miss_CurrentTask from "./components/Miss/CurrentTask";
import HomePage from "./components/HomePage";
import Mr_Block from "./components/Mr/Block"
import Miss_Block from "./components/Miss/Block"
import Mr_Progress from  "./components/Mr/Progress"
import Miss_Progress from  "./components/Miss/Progress"
import MrCreateToDo from "./components/Mr/CreatePogress";
import MissCreateToDo from "./components/Miss/CreateProgress";

function App() {
  

  return (
    <div className="App">
      <ThemeContextProvider>
      <Navbar  />
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="mr_block" element={<Mr_Block/>}/>
      <Route path="miss_block" element={<Miss_Block/>}/>
      <Route  path="/mr_currenttask" element={  <Body mess = {<Mr_CurrentTask/>} />}/>
      <Route  path="/miss_currenttask" element={  <Body mess = {<Miss_CurrentTask/>} />}/>
      <Route  path="/mr_progress" element={  <Mr_Progress />}/>
      <Route  path="/miss_progress" element={  <Miss_Progress/>} />
      <Route  path="/mr_progress/mr_createtodo" element={  <MrCreateToDo />}/>
      <Route  path="/miss_progress/miss_createtodo" element={  <MissCreateToDo/>} />
      
      </Routes>
        
      </ThemeContextProvider>
    </div>
  );
}

export default App;
