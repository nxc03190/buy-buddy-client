import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        Cookies.remove('token')
        Cookies.remove("userId");
        navigate("/")
    })
    return(
        <>
     
        </>
    )
}
export default Logout;