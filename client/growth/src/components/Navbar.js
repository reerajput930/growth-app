import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../ThemeContextProvider";
import "../index.css"
import icon1 from './img.jpeg'
import icon2 from './img2.png'

export default function Navbar() {
   const [colorLoading,setcolorLoading] = useState(false)
   const [img2,setImg2] =useState(false)
   

   useEffect(()=>{

     setImg2(localStorage.getItem("img2")) 
     
   },[])



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
    if(!colorLoading){
      setcolorLoading(true)
    }

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




  const onChange = (event) => {
    const value = event.target.value;
    
    localStorage.setItem("theme",value)
    console.log(localStorage.getItem("theme"))
    // changing theme in the mongodb
    async function updateTheme(value) {
      const response = await fetch("https://growth-app-backend.onrender.com/api/updatetheme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme:value }),
      });
    }
    changeTheme(value);
    console.log(value)
    updateTheme(value);
  
  };
  
  function changeImage(){
   

    setImg2(!img2)    
    
    console.log(img2)
    
    localStorage.setItem("img2",img2)
  }

  return (
    <div
      className="navbar flex justify-between pt-8 pb-8   "
      style={ colorLoading ? { background: applytheme.dark, color: applytheme.light }: {}}
      //  style={{ background: applytheme.dark, color: applytheme.light }}
    >
      <div  onDoubleClick={changeImage}  className="logo w-[80px]  ml-2 cursor-pointer">
       
       {img2 && <img src={icon2} />}
       {!img2 && <img src={icon1} className="rounded-full"/> }
        
      </div>
      
      <Link className="flex justify-center items-center" to={"/"}><div className="heading text-xl  w-[90%] cursor-pointer font-bold">Let's Grow Together!</div></Link>

      <div className="theme text-base mr-1 flex w-[40%] items-center flex-col">
        <span className="font-medium">THEME : <span className="font-semibold" > {localStorage.getItem("theme")}</span> </span>
        <select className="rounded-md w-[70%] outline-none" onChange={onChange}>
        
          <option className="text-center" value="">-choose-</option>
          <option value="satisfy">SATISFACTION</option>
          <option value="stay">STAY</option>
          <option value="anger">ANGER</option>
          <option value="peace">PEACE</option>
        </select>
      </div>
    </div>
  );
}
