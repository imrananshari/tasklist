import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let username = useRef();
    let userPass = useRef();
    let navigate = useNavigate();

    let handleLogin = (e)=>{
        e.preventDefault();
        fetch("http://localhost:4001/users")
        .then((res)=>{return res.json()})
        .then((allUsers)=>{
            let user = allUsers.find((v,i,a)=>{ return v.username==username.current.value });
            if(user==undefined)
            {
                alert("user not found");
            }
            else if(user.password!=userPass.current.value)
            {
                alert("Invalid password")
            }
            else
            {
                alert("Login succesfull ");
                localStorage.setItem("currentUser" , JSON.stringify(user))
                navigate("/home");
            }
            console.log(user);
        })
    }

    return ( 
        <div className="signup-cont">
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" ref={username} /> 
                <input type="password" placeholder="Password" ref={userPass}/>

                <input type="submit" value="Sign Up" />
            </form>
        </div>
     );
}
 
export default Login;