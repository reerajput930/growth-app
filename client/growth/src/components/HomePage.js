import React from "react"
import {Link} from "react-router-dom"

export default function HomePage(){
    return(
        <div className="flex justify-center items-center mt-20 ">
            <div className="gender--heading">
                <Link to={"/mr_currenttask"}><h2 className=" cursor-pointer mr--block text-3xl  mr-2 font-semibold inline">KARAN</h2></Link>
                <span className="relative top-1 text-5xl">/</span>
                <Link to={"/miss_currenttask"}> <h2 className=" cursor-pointer miss--block mr--block ml-2 text-3xl font-semibold inline">RIYA</h2></Link>
                
               
            </div>
        </div>
    )
}