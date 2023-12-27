import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    let navigate = useNavigate();

    let handleLogout = ()=>{
        if(window.confirm("are you sure ? logout"))
        {
            localStorage.removeItem("currentUser");
            navigate("/signin")
        }
    }

    return (<nav>
                <div className="d1">
                    <Link to="/">Home</Link>
                </div>
                <div className="d2">
                    <Link to="/add">Add Task</Link>
                    <Link to="/search">Search</Link>
                    <button onClick={handleLogout}> Logout </button>
                </div>
            </nav>);
}
 
export default Navbar;