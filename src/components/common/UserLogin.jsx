import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const rest = require('../../EndPoints')

function UserLogin(){
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const[email,setEmail] = useState([])
    const[password,setPassword] = useState([])

    function LoginAction(e){
        e.preventDefault();
        let user = {
            "email":email,
            "password":password
        }
        axios.post(rest.endPointULogin,user,header)
        .then(response => {
            if(response.data==='Invalid Login Details'){
                alert(response.data)
                document.getElementById("email").value="";
                document.getElementById("password").value="";
            }
            else{
                Cookies.set("token",response.data.token);
                Cookies.set("userId",response.data.userId)
                navigate("/UserHome")
            }
           
        })
        .catch(err => {
            alert("Something Went Wrong")
        })
        
    }

 

    return(
        <>
        <div className="pic">
        <Nav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-5">
                    <div className="card p-4 mt-5">
                        <div className="text-center h4">Login</div>
                        <form onSubmit={LoginAction}>
                            <div className="form-group">
                                <label>Email ID</label>
                                <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="form-control mt-1 p-2" placeholder="Enter Email "></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password"  onChange={(e)=>setPassword(e.target.value)} className="form-control p-2 mt-1" placeholder="Enter Password "></input>
                            </div>
                            <input type="submit" value={"Login"} className="btn btn-dark w-100 mt-2"></input>
                            <div className="mt-1">
                                New User? <Link to="/UserReg">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default UserLogin;