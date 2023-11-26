import Cookies from "js-cookie";
import UserHead from "./uhead";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')
function Orders(){
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let status = params.get('status');
    let userId = Cookies.get("userId")
    const [count, setCount] = useState(0);
    const[userOrders,setOrders] = useState([])
   
    
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointOrders+"?status="+status,header)
        .then(response => {
            console.log(response.data);
            setOrders(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[count,status])

    function RemoveCartAction(e){
        e.preventDefault();
        let orderId = e.target[0].value;
        let orderItemId = e.target[1].value;
        let posdata = {
            "orderItemId":orderItemId,
            "orderId":orderId
        }
        axios.post(rest.endPointRemoveCart,posdata,header)
        .then(response => {
            alert(response.data);
            
            setCount(count+1)
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    function orderNow(e){
        e.preventDefault();
        let orderId = e.target[0].value;
        let totalPrice = e.target[1].value;
        navigate("/OrderNowAction?orderId="+orderId+"&totalPrice="+totalPrice)
        
    }
    function dispatchOrder(e){
        e.preventDefault();
        let orderId = e.target[0].value;
        axios.get(rest.endPointDispatch+"?orderId="+orderId,header)
        .then(response => {
            alert(response.data)
            navigate("/Orders?status=dispatched")
        })
        .catch(err => {
            console.log(err)
        })
    }
    function makeAsRecieved(e){
        e.preventDefault();
        let orderId = e.target[0].value;
        axios.get(rest.endPointMakeAsRecieved+"?orderId="+orderId,header)
        .then(response => {
            alert(response.data)
            navigate("/OrderHistory")
        })
        .catch(err => {
            console.log(err)
        })
    }

    function GiveRating(e){
        e.preventDefault();
        let itemId = e.target[0].value;
        let orderId = e.target[1].value;
        navigate("/GiveRating?itemId="+itemId+"&orderId="+orderId)
    }
    
    return(
        <>
        <div className='pic3'>
        <UserHead/>
        <div className="container mt-3">
            {userOrders.length==0?<><div className="text-center h4 mt-5">Orders Not Available</div></>:null}
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
                                            {userOrder['order']['status']==='cart'?<>
                                                <td>
                                                    <form onSubmit={RemoveCartAction}>
                                                        <input type="hidden" id="orderId" value={userOrder['order']['orderId']}></input>
                                                        <input type="hidden" id="orderItemId" value={orderItem['itemId']}></input>
                                                        <input type="submit" value="Remove Item" className="btn btn-danger w-100"></input>
                                                    </form>
                                                </td>
                                                </>:<></>}
                                                
                                          </tr>
                                        )}
                                    </tbody>
                                
                            </table>
                        </div>
                        <div className="text-end">
                            {userOrder['order']['status']=='cart'?<>
                            <form onSubmit={orderNow}>
                                <input type="hidden" id="orderId" value={userOrder['order']['orderId']}></input>
                                <input type="hidden" id="totalPrice" value={userOrder['order']['totalPrice']}></input>
                                <input type="submit" value={"Order Now"} className="btn btn-primary "></input>
                            </form>
                            </>:<></>}
                        </div>
                        {userOrder['order']['buyer']['userId']!=userId?<>
                        <div className="text-end">
                            {userOrder['order']['status']=='ordered'?<>
                            <form onSubmit={dispatchOrder}>
                                <input type="hidden" id="orderId" value={userOrder['order']['orderId']}></input>
                                <input type="hidden" id="totalPrice" value={userOrder['order']['totalPrice']}></input>
                                <input type="submit" value={"Dispatch"} className="btn btn-primary "></input>
                            </form>
                            </>:<></>}
                        </div>
                        </>:<></>}
                        {userOrder['order']['seller']['userId']!=userId?<>
                        <div className="text-end">
                            {userOrder['order']['status']=='Dispatched'?<>
                            <form onSubmit={makeAsRecieved}>
                                <input type="hidden" id="orderId" value={userOrder['order']['orderId']}></input>
                                <input type="hidden" id="totalPrice" value={userOrder['order']['totalPrice']}></input>
                                <input type="submit" value={"Make As Received"} className="btn btn-primary "></input>
                            </form>
                            </>:<></>}
                        </div>
                        </>:<></>}
                        
                       
                    </div>
                  </div>
                )}
            </div>
        </div>
        </div>
        </>
    )
}
export default Orders;