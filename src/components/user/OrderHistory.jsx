import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHead from "./uhead";
import axios from "axios";
const rest = require('../../EndPoints')
function OrderHistory(){
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userId = Cookies.get("userId")
    const [count, setCount] = useState(0);
    const[userOrders,setOrders] = useState([])
    const[status,setOrderStatus] = useState([])
   
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    async function fetchData() {
        axios.get(rest.endPointOrderHistory+"?status="+status,header)
        .then(response => {
            console.log(response.data);
            setOrders(response.data)
        })
        .catch(err => {
            console.log(err)
        })

    }
    useEffect(() => {
      fetchData()
    },[status])
    function SearchOrder(e){
        e.preventDefault();
        fetchData()
    }

    return(
        <>
         <div className='pic3'>
         <UserHead/>
        <form onSubmit={SearchOrder}>
        <div className="row">
        <div className="col-md-4"></div>
            <div className="col-md-4 mt-2">
                <select name="" className="form-control" id="orderStatus" onChange={e => setOrderStatus(e.target.value)}>
                    <option value={"delivered"}>Choose Type</option>
                    <option value={"history"}>Buyer History</option>
                    <option value={"receivedHistory"}>Seller History</option>
                </select>
            </div>
            <div className="col-md-4 mt-2">
                <input type="submit" value={"Search"} className="btn btn-primary"></input>
            </div>
        </div>
        </form>
        <div className="container mt-3">
            {userOrders.length==0?<><div className="text-center h5 mt-5">Orders Not Available</div></>:null}
            <div className="row">
                {userOrders.map((userOrder,index)=>
                  <div className="col-md-12">
                    <div className="card p-3 mt-2">
                    <div className="text-center h5  " style={{fontSize:"15px"}}>Status : <b style={{fontSize:"20px"}}>{userOrder['order']['status']}</b></div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="text-secondary" style={{fontSize:"13px"}}>Order Date</div>
                                <div className="h6">{userOrder['order']['orderDate']}</div>
                            </div>
                            <div className="col-md-4">
                               <div className="text-secondary" style={{fontSize:"13px"}}>Seller</div>
                                <div className="h6">{userOrder['order']['seller']['name']}({userOrder['order']['seller']['phone']})</div>
                            </div>
                            <div className="col-md-3">
                               <div className="text-secondary" style={{fontSize:"13px"}}>Buyer</div>
                                <div className="h6">{userOrder['order']['buyer']['name']}({userOrder['order']['buyer']['phone']})</div>
                            </div>
                            <div className="col-md-2">
                               <div className="text-secondary" style={{fontSize:"13px"}}>Total Price</div>
                                <div className="h6">$ {userOrder['order']['totalPrice']}</div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Ordered Quantity</th>
                                        <th>Total Price</th>
                                        {userOrder['order']['status']==='cart'?<>
                                        <th>Remove</th>
                                        </>:<></>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {userOrder['orderItems'].map((orderItem,index)=>
                                          <tr>
                                            <td>
                                                <img src={'data:image/jpeg;base64,'+orderItem['product']['image']} style={{maxWidth:"70%",height:"100px"}}></img>
                                                <div>{orderItem['product']['title']}</div>
                                            </td>
                                            <td>${orderItem['product']['price']}</td>
                                            <td>{orderItem['quantity']}</td>
                                            <td>${orderItem['subTotal']}</td>
                                            
                                                
                                          </tr>
                                        )}
                                    </tbody>
                                
                            </table>
                        </div>
                    </div>
                  </div>
                )}
            </div>
        </div>
        </div>
        </>
    )
}
export default OrderHistory;