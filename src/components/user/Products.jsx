import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import UserHead from './uhead';
import { useNavigate } from 'react-router-dom';

const rest = require('../../EndPoints');
function Products(){
    const navigate = useNavigate();
   const [searchKeyword, setKeywords] = useState([])
   const[categoryId,setCategoryId] = useState([])
  const[products,setProduct] = useState([])
  const[categories,setCategories] = useState([]);
  const[count,setCount] = useState([''])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }
   
    useEffect(()=>{
        axios.get(rest.endPointCategories,header)
        .then(response => {
            setCategories(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    
    async function fetchData() {
        axios.get(rest.endPointViewProduct+"?searchKeyword="+searchKeyword+"&categoryId="+categoryId,header)
           .then(response => {
                console.log(response.data);
                setProduct(response.data)
                
                
            })
        .catch(err => {
            console.log(err)
        })

        }
        useEffect(() => {
            fetchData()
        },[])

    function SeachAction(e){
        e.preventDefault();
        fetchData()
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
                alert(response.data)
                navigate("/Orders?status=cart")

            })
            .catch(err => {
                console.log(err)
            })
    }

    function getProductDetails(productid,categoryId){
        console.log(productid);
        navigate("/getProductDetails?productid="+productid+"&categoryId="+categoryId)
    }

    function ProductStatusAction(e){
        e.preventDefault();
        let productId = e.target[0].value;
        console.log(productId);
        axios.get(rest.endPointProductStatusAction+"?productId="+productId,header)
        .then(response=>{
                console.log(response.data);
                alert(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
          <div className='pic3'>
            <UserHead />
          
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div className='container mt-4'>
              
                <form onSubmit={SeachAction}>
                    <div className='row'>
                        <div className='col-md-4'>
                            <select className='form-control' id='categoryId' onChange={e => setCategoryId(e.target.value)}>
                                <option value={""}>Search Category</option>
                                {categories.map((category,index)=>
                                <option value={category['categoryId']}>{category['categoryName']}</option>
                                )}
                            </select>
                        </div>
                        <div className='col-md-4'>
                            <input type="text" id='searchKeyword' onChange={e=>setKeywords(e.target.value)} className='form-control' placeholder='Search Product'></input>
                        </div>
                        <div className='col-md-4'>
                            <input type="submit" value={"Search"} className='btn btn-primary w-50'></input>
                        </div>
                    </div>
                </form>
            </div>
            <div className='container mt-5'>
            {products.length==0?<>
                 <div className='text-center mt-5 h5'>Products Not Available</div>
                </>:null}
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
                            {Cookies.get('userId')==product['userId']?<>
                            {product['status']==='Enabled'?<>
                           <form onSubmit={ProductStatusAction}>
                                <input type='hidden' id='productId' value={product['productid']}></input>
                                <input type='submit'  value={"Disable"} className='btn btn-danger w-100 mt-2 ' style={{fontSize:"13px"}}></input>
                            </form>
                            </>:<>
                            <form onSubmit={ProductStatusAction}>
                                <input type='hidden' id='productId' value={product['productid']}></input>
                                <input type='submit'  value={"Enable"} className='btn btn-success w-100 mt-2 ' style={{fontSize:"13px"}}></input>
                            </form>
                            </>}
                           </>:<></>}
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
export default Products;