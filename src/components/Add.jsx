import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {

    let redirect = useNavigate();
    let taskname = useRef();
    let start = useRef();
    let end = useRef();
    let summary = useRef();

    let handleAddTask = (e)=>{
        e.preventDefault();
        
        let newTask = {
                        taskname : taskname.current.value,
                        startDate : start.current.value,
                        end : end.current.value,
                        summary : summary.current.value,
                     }
        
        let config = {
                        method : "POST",
                        headers : {"Content-Type":"application/json"},
                        body : JSON.stringify(newTask)
                    }

        fetch("http://localhost:4000/tasks" , config)
        .then(()=>{
            alert("new data added");
            redirect("/")
        })
    }

    return ( 
        <div className="add">
            <h1>Add new task</h1>

            <form onSubmit={handleAddTask}>
                <input type="text" placeholder="Taskname" ref={taskname}/>
                <input type="date" ref={start}/>
                <input type="date" ref={end}/>
                <textarea cols="50" rows="3" placeholder="summary" ref={summary}></textarea>

                <input type="submit" value="Add task"  />
            </form>


        </div>
     );
}
 
export default Add;