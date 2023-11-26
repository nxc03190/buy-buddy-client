import { useEffect, useState } from "react";
import UserHead from "./uhead";
import Cookies from "js-cookie";
import axios from "axios";

const rest = require('../../EndPoints')

function UserHome(){
    const[profile,setProfile] = useState([])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointProfile,header)
        .then(response => {
            setProfile(response.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    },[])
    return(
        <>
  
         <div className="pic2">
        <UserHead/>
        <div className="container">
           <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-5 mt-2">
                <div className="card p-3 mt-5">
                    <img src="https://img.freepik.com/premium-vector/male-profile-flat-blue-simple-icon-with-long-shadowxa_159242-10092.jpg" style={{height:"220px",maxWidth:"100%"}}></img>
                    <div className="h4 text-center card-header">Welcome {profile['name']}</div>
                    <div className="mt-4 h6 text-center">Email : {profile['email']}</div>
                    <div className="mt-4 h6 text-center">Contact : {profile['phone']}</div>
                    
                </div>
              </div>
           </div>
        </div>
        </div>
        </>
    )
}
export default UserHome;