import "../Addtags.css";
import React,{ useState } from "react";
import {BASE_URL} from "../Api"


export default function Addtags(props) {
  const [ tags, setTags ] = useState([]);
  
  // this is how you pass props from child to parent
  // which is not allowed
  props.func(tags)



  function handleKeyDown(e) {
    // e.preventDefault()
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      console.log( e.target.value)
      setTags([...tags, value]);
      e.target.value=''

    }

    // if (!value.trim()) return;

  }
 
  function deletetag(index){
    setTags(tags.filter((tag,i)=>{
          console.log(tag)
           return (i !== index)
    }))

  }  

  return (
    <div className="hashtags--block">
      <h3 className="text-sm">Enter some tags...</h3>
      <div className="tag--items">
       
        {tags.map((tag,index) => {
            // console.log(index)
           return(
           <div className="tag--item" >
            <span className="text "> {tag}</span>
            <span className="close" onClick={()=>{deletetag(index)}}>&times;</span>
          </div>)

        })}

        <input 
          onKeyDown={(e)=>handleKeyDown(e)}
          type="text"
          className="tags-input border-gray-300 bg-red-500 text-xs p-2 font-mono " 
                  
          placeholder="Type something..."
        />
      </div>
    </div>
  );
}
