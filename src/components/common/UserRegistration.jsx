import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";
import axios from "axios";
const rest = require('../../EndPoints')

function UserRegistration(){
    const [name, setName] = useState([]);
    const [email,setEmail] = useState([]);
    const [phone,setPhone] = useState([]);
    const [password,setPassword] = useState([]);

    

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }


    function UserRegistrationAction(e){
        e.preventDefault();
        if(name.length==0){
            document.getElementById("nameMsg").innerHTML="* Name Required";
            e.preventDefault();
            return
            
        }else{
            document.getElementById("nameMsg").innerHTML="";
        }

        if(email.length==0){
            document.getElementById("emailMsg").innerHTML="* Email Required";
            e.preventDefault();
            return
            
        }else{
            document.getElementById("emailMsg").innerHTML="";
        }
    
        if(phone.length!=10){
            document.getElementById("phoneMsg").innerHTML="Phone Number Contains 10 Digits";
            e.preventDefault();
            return
        }
        else{
            document.getElementById("phoneMsg").innerHTML=""
        }

        if(password.length==0){
            document.getElementById("passwordMsg").innerHTML="* Password Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("passwordMsg").innerHTML="";
        }
        let user = {
            "name":name,
            "email":email,
            "phone":phone,
            "password":password
        }
        axios.post(rest.endPointUReg,user,header)
            .then(response => {
                alert(response.data['message']);
                document.getElementById("name").value="";
                document.getElementById("email").value="";
                document.getElementById("phone").value="";
                document.getElementById("password").value="";
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
         <div className="pic">
        <Nav/>
       
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 mt-4">
                <div className="card p-3 mt-5">
                    <div className="text-center h3">New Registration</div>
                    <form onSubmit={UserRegistrationAction}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="name" onChange={(e)=>setName(e.target.value)} placeholder="Name" className="form-control mt-1"></input>
                        <div className="text-danger mt-1" id="nameMsg"></div>
                        </div>
                        <div className="form-group mt-1">
                            <label>Email</label>
                            <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="form-control mt-1"></input>
                            <div className="text-danger mt-1" id="emailMsg"></div>
                        </div>
                        <div className="form-group mt-1">
                            <label>Phone</label>
                            <input type="number" id="phone" onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone Number" className="form-control mt-1"></input>
                          <div className="text-danger mt-1" id="phoneMsg"></div>
                        </div>
                        <div className="form-group mt-1">
                            <label>Password</label>
                            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="form-control mt-1"></input>
                            <div className="text-danger mt-1" id="passwordMsg"></div>
                        </div>
                        <input  type="submit" value={"Register"} className="btn btn-dark w-100 mt-2"></input>
                        <div className="mt-1">
                            Already Register ?<Link to={"/UserLogin"}>Login</Link>
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
export default UserRegistration;