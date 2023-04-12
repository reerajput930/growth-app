import React,{useState} from "react";
import { useThemeContext } from "../ThemeContextProvider"
import Mr from "./Mr/CurrentTask";
import Miss from "./Miss/CurrentTask";

export default function Body(props) {
    const theme = useThemeContext()
    const [colorLoading,setcolorLoading] = useState(false)
    const {anger,satisfy,stay,peace} = theme.theme
    let applytheme =theme.theme.stayColor;
   if(anger){
    if(!colorLoading){
      setcolorLoading(true)
    }
       applytheme =  theme.theme.angerColor
   }
   else if(satisfy){
       
    if(!colorLoading){
      setcolorLoading(true)
    }
       applytheme = theme.theme.satisfyColor
   }
   else if(stay){
    if(!colorLoading){
      setcolorLoading(true)
    }
        applytheme = theme.theme.stayColor

    }else if(peace){
      if(!colorLoading){
      setcolorLoading(true)
    }
      applytheme = theme.theme.peaceColor;

  }
    // console.log(props.mess)
  return (
    <div className="flex flex-col items-center h-[200vh]   "
    style={colorLoading?{background:applytheme.light}:{}}>
     
     {props.mess}
     
     {/* <div className="mr w-[25%] "><Mr/></div>
     <div className="miss w-[25%]"><Miss/></div> */}
     
    </div>
  );
}
