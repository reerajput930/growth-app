import React, { createContext, useContext, useState,useEffect } from "react";

export const ThemeContext = createContext({});

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState({
    anger: false,
    satisfy: false,
    stay: false ,
    peace:false,
    angerColor: { light: "#ec9b00", dark: "	#ec0000" },
    satisfyColor: { light: "#ceddf2", dark: "#5d90c7" },
    stayColor: { light: "#9aaa6d", dark: "#486006" },
    peaceColor: { light: "#b1f9e1", dark: "#36ab9d" },
   
  });

  useEffect(()=>{
    async function fetchTheme(){
      const response = await fetch("https://growth-app-backend.onrender.com/api/gettheme")
      const data = await response.json()
      // console.log(data.theme[0].theme)
      const theme = data.theme[0].theme;
      changeTheme(theme)
    }
    fetchTheme()

  },[])

  function changeTheme(selectTheme) {
    if (selectTheme === "satisfy") {
      localStorage.setItem("themeColor",JSON.stringify( { light: "#ceddf2", dark: "#5d90c7" }))
      setTheme({
        satisfy: true,
        anger: false,
        stay: false,
        peace:false,
        satisfyColor: { light: "#ceddf2", dark: "#5d90c7" },
        angerColor: { light: "#ec9b00", dark: "	#ec0000" },
        stayColor: { light: "#9aaa6d", dark: "#486006" },
        peaceColor: { light: "#b1f9e1", dark: "#36ab9d" },
      });
    }  if (selectTheme === "anger") {
      localStorage.setItem("themeColor",JSON.stringify(  { light: "#ec9b00", dark: "	#ec0000" }))
      setTheme({
        satisfy: false,
        anger: true,
        stay: false,
        peace:false,
        satisfyColor: { light: "#ceddf2", dark: "#5d90c7" },
        angerColor: { light: "#ec9b00", dark: "	#ec0000" },
        stayColor: { light: "#9aaa6d", dark: "#486006" },
        peaceColor: { light: "#b1f9e1", dark: "#36ab9d" },
      });
    }  if (selectTheme === "stay") {
      localStorage.setItem("themeColor",JSON.stringify(  { light: "#9aaa6d", dark: "#486006" }))
      setTheme({
        satisfy: false,
        anger: false,
        stay: true,
        peace:false,
        satisfyColor: { light: "#ceddf2", dark: "#5d90c7" },
        angerColor: { light: "#ec9b00", dark: "	#ec0000" },
        stayColor: { light: "#9aaa6d", dark: "#486006" },
        peaceColor: { light: "#b1f9e1", dark: "#36ab9d" },
      });
    }
     if(selectTheme === 'peace'){
      localStorage.setItem("themeColor",JSON.stringify(  { light: "#b1f9e1", dark: "#36ab9d" }))
      setTheme({
        satisfy: false,
        anger: false,
        stay: false,
        peace:true,
        satisfyColor: { light: "#ceddf2", dark: "#5d90c7" },
        angerColor: { light: "#ec9b00", dark: "	#ec0000" },
        stayColor: { light: "#9aaa6d", dark: "#486006" },
        peaceColor: { light: "#b1f9e1", dark: "#36ab9d" },
      });

    }
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
