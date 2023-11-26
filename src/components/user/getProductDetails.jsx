import Cookies from "js-cookie";
import UserHead from "./uhead";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import Rating from 'react-rating-stars-component';
import Marquee from "react-fast-marquee";
const rest = require('../../EndPoints');

function GetProductDetails(){
    const navigate = useNavigate();

    let search = window.location.search; // to fetch the web url(route)
    let params = new URLSearchParams(search);
    let productid = params.get('productid');
    let categoryId = params.get("categoryId")
    const[product,setProduct] = useState([])
    const[wishListCount,setwishListCouunt] = useState([])
    const[reviews,setReviews] = useState([])
    const[category,setCategory] = useState([])
    const[similarProducts,setSimilarProduct] = useState([])
    const [count, setCount] = useState(0);
    function getProductDetails(productid,categoryId){
        navigate("/getProductDetails?productid="+productid+"&categoryId="+categoryId)
    }
    let userId = Cookies.get("userId")
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        let url = rest.endPointWishListCount+"?productId="+productid
        console.log(url);
        axios.get(url,header)
        .then(response=>{
                console.log(response.data);
                setwishListCouunt(response.data)
            })
            .catch(err => {
                console.log(err)
            })
           
    },[productid,count])

    useEffect(()=>{
        axios.get(rest.endPointGetProductDetails+"?productid="+productid,header)
        .then(response => {
            if(response.data.length>0) {
                setProduct(response.data[0])
                setReviews(response.data[1])
                setCategory(response.data[2])
            }
        })
        .catch(err => {
            console.log(err)
        })
       
    },[count,productid])
    useEffect(()=>{
        axios.get(rest.endPointSimilarProducts+"?categoryId="+categoryId,header)
        .then(response => {
            setSimilarProduct(response.data)
            setCount(count+1)
        })
        .catch(err => {
            console.log(err)
        })
    },[productid])

    function AddReview(e){
        e.preventDefault();
        let rating = document.getElementById("rating").value
       let review = document.getElementById("review").value
       let productid = document.getElementById("productid").value

       let ratings = {
        "rating":rating,
        "review":review,
        "productid":productid

    }
    axios.post(rest.endPointGiveRating,ratings,header)
    .then(response => {
        alert(response.data)
        document.getElementById("review").value="";
        setCount(count+1)
        
    })
    .catch(err => {
        console.log(err)
    })
    }

    function AddToCart(e){
        e.preventDefault();
        let quantity = e.target[0].value;
        let productId = e.target[1].value;
        let userId = e.target[2].value;
      
       
        axios.get(rest.endPointAddToCart+"?productId="+productId+"&quantity="+quantity+"&userId="+userId,header)
        .then(response=>{
            alert(response.data)
                navigate("/Orders?status=cart")

            })
            .catch(err => {
                console.log(err)
            })
    }
   

    const WishistProduct = e =>{
        e.preventDefault()
        let productId = document.getElementById("productId").value;
        axios.get(rest.endPointAddWishList+"?productId="+productId,header)
        .then(response=>{
                alert(response.data)
                navigate("/WishList")

            })
            .catch(err => {
                console.log(err)
            })
    }
    return(
        <>
        <UserHead/>
        <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
    </head>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={'data:image/jpeg;base64,'+product['image']}
                alt={product['title']}
                style={{height:"300px",maxWidth:'100%'}}
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted" style={{fontSize:"15px"}}>{category['categoryName']}</h4>
              <h1 className="   display-6">{product['title']}</h1>
              <p className="lead">
                {product['rating']!=null?<>
                {product['rating'].toFixed(1)}
                  <i className="fa fa-star"></i>
                </>:<>
                <div className="text-muted h5" style={{fontSize:"13px"}}>No Ratings</div>
                </>}
              </p>
              <h3 className="display-6  my-4" style={{fontSize:"28px"}}>$ <b>{product['price']}</b></h3>
              <p className="lead" style={{overflow:"auto",height:"30px"}}>{product['about']}</p>
            </div>
            {userId!=product['userId']?<>
            <form onSubmit={AddToCart}>
                <div className='row'>
                    <div className='col-md-2'>
                        <input type='number' id='quantity' placeholder="Quantity" min={1}  className='form-control' required></input>
                        <input type='hidden' id='productId' value={product['productid']}></input>
                        <input type='hidden' id='userId' value={product['userId']}></input>
                    </div>
                    <div className='col-md-2 mt-1'>
                        <input type='submit' value={"Add To Cart"} className='btn btn-dark mb-3' style={{fontSize:"14px"}}></input>
                    </div>
                  
                </div>
            </form>
                
            </>:<></>}
            {wishListCount['count']===0?<>
            {userId!=product['userId']?<>
                <div className="text-end">
               <form onSubmit={WishistProduct}>
                    <input type='hidden' id='productId' value={product['productid']}></input>
                    <input type="submit" value={"Add To WishList"} className="btn btn-dark mb-2" style={{fontSize:"14px"}}></input>
              </form>
            </div>
            </>:<></>}
            </>:<></>}
            {userId!=product['userId']?<>
            <div className="col-md-6 col-md-6 ">
                <form onSubmit={AddReview}>
                    <input type="hidden" id="productid" value={product['productid']}></input>
             <div className="row">
                <div className="col-md-4">
                <textarea className="form-control"
                    id = "review"
                    placeholder="Add a Review"
                    rows={2}
                    style={{width:"120%"}}
                    />
                    
                </div>
                <div className="col-md-4" style={{marginLeft:"15px"}}>
                <select className="form-control" id="rating">
                    <option value={"5"}>5</option>
                    <option value={"4"}>4</option>
                    <option value={"3"}>3</option>
                    <option value={"2"}>2</option>
                    <option value={"1"}>1</option>
                </select>
                
                </div>
             </div>
             <input type="submit" value={"Submit"} className="btn btn-dark mt-2 text-center"></input>
             <input type="reset" value={"Clear"} className="btn btn-dark mt-2" style={{marginLeft:"26px"}}></input>
             </form>
            </div>
            </>:<></>}
           
            <div className="row">
                <div className="col-md-6">
                <div className="mt-5 mb-2">Comments</div>
                    <div className="comments-block" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <ul className="list-unstyled">
                        {reviews.map((review, index) => <div key={index}>
                        <li key={index} className="mt-3 card p-1">
                            <span className="font-weight-bold h6">{review['user']['name']}</span> 
                            <div className="">{review['review']}</div>
                            <Rating
                            value={review['rating']} // Display the rating value
                            size={24}
                            edit={false} // Disable editing
                            />
                        </li>
                        </div>)}
                    </ul>
                    </div>
                </div>
                <div className="col-md-6"></div>
            </div>
           

          
        </div>
        <div className="container">
            <div className="row"></div>
            <div className="row my-5 py-5">
            <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
                <Marquee
                pauseOnHover={true}
                pauseOnClick={true}
                speed={50}
                >
                 <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item['titile']} className="card mx-4 text-center">
                  
                  <button className='nav-link' onClick={e=>{getProductDetails(item['productid'],item['categoryId'])}}><img
                    className="card-img-top p-3"
                    src={'data:image/jpeg;base64,'+item['image']}
                    alt="Card"
                    height={200}
                    width={200}
                  /></button>
                  <div className="card-body">
                    <h5 className="card-title">
                      {item['title'].substring(0, 15)}...
                    </h5>
                  </div>
                
                </div>
              );
            })}
          </div>
        </div>
                </Marquee>
            </div>
            </div>
        </div>
      </div>
         
        </>
    )
    
}

export default GetProductDetails;