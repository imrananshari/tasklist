import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    let username = useRef();
    let userEmail = useRef();
    let userPass = useRef();
    let confirmPass = useRef();
    let navigate = useNavigate();

    let handleSignup = (e)=>{
        // prevent 
        e.preventDefault()
        // check cond 
        if(userPass.current.value==confirmPass.current.value)
        {
            // prepare the user obj 
            let newUser = {
                username : username.current.value,
                email : userEmail.current.value,
                password : userPass.current.value,
            }
            // POST the user obj the db
            let config = { method : "POST",
                           headers:{"Content-Type":"application/json"},
                           body :  JSON.stringify(newUser)
                    }
            fetch("http://localhost:4001/users" , config )
            .then(()=>{
                // redirect to login 
                alert("New account has been created successfully");
                navigate("/signin")
            })  
        }
        else
        {
            alert("Password missmatch !!")
        }
        
        console.log(username.current.value);
    }


    return ( 
        <div className="signup-cont">
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" ref={username} />
                <input type="email" placeholder="Email id" ref={userEmail}/>
                <input type="password" placeholder="Password" ref={userPass}/>
                <input type="text" placeholder="confiorm password" ref={confirmPass}/>

                <input type="submit" value="Sign Up" />
            </form>
        </div>
     );
}
 
export default Signup;