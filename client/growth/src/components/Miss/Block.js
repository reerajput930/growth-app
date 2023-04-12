import React from "react"
import {Link} from "react-router-dom"

export default function Block() {
  return (
    <div className="flex justify-center items-center mt-20 ">
      <div className="gender--heading">
        <Link to={"/miss_progress"}>
          <h2 className=" cursor-pointer mr--block text-2xl font-semibold inline">
            Progress report
          </h2>
        </Link>
        <span className="relative top-2 text-5xl">/</span>
        <Link to={"/miss_currenttask"}>
                   <h2 className=" cursor-pointer miss--block mr--block text-2xl font-semibold inline">
            Today's Tasks
          </h2>
        </Link>
      </div>
    </div>
  );
}
