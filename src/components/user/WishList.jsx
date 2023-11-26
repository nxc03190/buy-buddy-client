import Cookies from "js-cookie";
import UserHead from "./uhead";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints');
function WishList(){
    const[products,setProduct] = useState([])
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    
    function AddToCart(e){
        e.preventDefault();
        let quantity = e.target[0].value;
        let productId = e.target[1].value;
        let userId = e.target[2].value;
        console.log(quantity);
        console.log(productId);
       
        axios.get(rest.endPointAddToCart+"?productId="+productId+"&quantity="+quantity+"&userId="+userId,header)
        .then(response=>{
                console.log(response.data);
                navigate("/Orders?status=cart")

            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(()=>{
        axios.get(rest.endPointViewWishList,header)
        .then(response => {
            setProduct(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    
    function getProductDetails(productid,categoryId){
        console.log(productid);
        navigate("/getProductDetails?productid="+productid+"&categoryId="+categoryId)
    }
    return(
        <>
          <div className='pic3'>
        <UserHead/>
        <div className='container mt-5'>
            {products.length==0?<><div className="text-center h4 mt-5">WishList is Empty</div></>:null}
                <div className='row'>
                {products.map((product,index) =>
                    <div className='col-md-3'>
                        
                        <div className='card'>
                        {Cookies.get('userId')!=product['userId']?<>
                        {product['status']==='Enabled'?<>
                        <button className='nav-link' onClick={e=>{getProductDetails(product['productid'],product['categoryId'])}}><img src={'data:image/jpeg;base64,'+product['image']} style={{maxWidth:"100%",height:"150px"}} ></img></button>

                        </>:<>
                        <img src={'data:image/jpeg;base64,'+product['image']} style={{maxWidth:"100%",height:"150px"}} ></img>

                        </>}
                        </>:<>
                        <button className='nav-link' onClick={e=>{getProductDetails(product['productid'],product['categoryId'])}}><img src={'data:image/jpeg;base64,'+product['image']} style={{maxWidth:"100%",height:"150px"}} ></img></button>
                        </>}
                        
                           <div className='text-center h4 card-header'>{product['title']}</div>
                          <div className='row'>
                            <div className='col-md-7'>
                              <div className='h5 p-1' style={{fontSize:"18px"}}>$ {product['price']}</div>
                            </div>
                            <div className='col-md-5'>
                                {product['rating']===null?<>
                               <div className='' style={{fontSize:"12px"}}> No Ratings</div>
                                </>:<>
                                <div className='h5 p-1' style={{fontSize:"14px"}}>Rating : {product['rating'].toFixed(1)}</div>
                                </>}
                            </div>
                          </div>
                           <div className='text-secondary p-1' style={{fontSize:"13px"}}>About</div>
                           <div className='h6 p-1' style={{overflow:"auto",height:"20px",fontSize:"12px"}}>{product['about']}</div>
                           <div className='row'>
                            <div className='col-md-6'>
                            
                            </div>
                            <div className='col-md-4'>
                              {Cookies.get('userId')==product['userId']?<>
                                <div className='h6 mt-3'>{product['status']}</div>
                                </>:<>
                                {/* <div className='h6 mt-3'>{product['status']}</div> */}
                                </>}
                            </div>
                            
                           
                           </div>
                           
                          
                           {Cookies.get('userId')!=product['userId']?<>
                           {product['status']==='Enabled'?<>
                           <div className='card-footer'>
                            <form onSubmit={AddToCart}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <input type='number' id='quantity' placeholder='Quantity' required min={1} className='form-control'></input>
                                        <input type='hidden' id='productId' value={product['productid']}></input>
                                        <input type='hidden' id='userId' value={product['userId']}></input>
                                    </div>
                                    <div className='col-md-6 mt-1'>
                                        
                                       <input type='submit' value={"Add To Cart"} className='btn btn-danger w-100' style={{fontSize:"14px"}}></input>
                                    
                                    </div>
                                </div>
                            </form>
                           </div>
                           
                           </>:<></>}
                           {product['status']==='Disabled'?<>
                           <div className='card-footer h6'>
                            Product Not Available

                           </div>
                           </>:<></>}
                           
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
export default WishList;