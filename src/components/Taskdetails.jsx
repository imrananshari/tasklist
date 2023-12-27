import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Taskdetails = () => {

    let[task , setTask ] = useState(null);
    let {tid} = useParams();
    let redirect = useNavigate();
    let[show , setShow ] = useState(false);

    let taskname = useRef();
    let start = useRef();
    let end = useRef();
    let summary = useRef();


    useEffect(()=>{
        fetch("http://localhost:4000/tasks/"+tid)
        .then((res)=>{return res.json()})
        .then((data)=>{
            setTask(data)
        })
    } , [])

    let handleDelete = ()=>{
        
        if(window.confirm("Are you sure ? to delete"))
        {
            fetch("http://localhost:4000/tasks/"+tid ,  {method : "DELETE"})
            .then(()=>{
                redirect("/");
            })
        }
    }

    let handleUpdateTask = (e)=>{
        e.preventDefault();

        let updateTask = {
                            taskname : taskname.current.value,
                            startDate : start.current.value,
                            endDate : end.current.value,
                            summary : summary.current.value
                        }

        let config = {
            method : "PUT",
            headers : {"Content-Type":"application/json" , "Accept-Type":"application/json"},
            body : JSON.stringify(updateTask)
        }

        fetch("http://localhost:4000/tasks/"+tid , config)
        .then(()=>{
            alert("data updated");
            redirect("/");
        })
    }

    return ( 
        <div className="task-details">
            <h1>Task Details</h1>
            <hr />
            {task && <div>
                        <h1>Task name : {task.taskname} </h1>
                        <h2>Start date : {task.startDate} </h2>
                        <h2>End date : {task.endDate}</h2>
                        <h2>Summary : {task.summary}</h2>

                        <button onClick={handleDelete}> delete </button>

                        <button onClick={()=>{setShow(true)}}> update </button>
                    </div>}

            {show && <div className="update-form">
                        <div>
                            <h1>Update Task</h1>
                            <form onSubmit={handleUpdateTask}>
                                <input type="text" placeholder="Taskname" ref={taskname}/>
                                <input type="date" ref={start}/>
                                <input type="date" ref={end}/>
                                <textarea cols="50" rows="3" placeholder="summary" ref={summary}></textarea>

                                <input type="submit" value="Update task"  />
                            </form>


                            <button onClick={()=>{setShow(false)}}> close </button>
                        </div>
                    </div>}

        </div>
     );
}
export default Taskdetails;