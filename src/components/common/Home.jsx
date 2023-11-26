import { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const rest = require('../../EndPoints');

function Home(){
  const [searchKeyword, setKeywords] = useState([])
  const[categoryId,setCategoryId] = useState([])
  const[products,setProduct] = useState([])
  const[categories,setCategories] = useState([]);
 
    let header = {
        headers: {
            "Content-type": "Application/json",
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
    axios.get(rest.endPointHomePageProducts+"?searchKeyword="+searchKeyword+"&categoryId="+categoryId,header)
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
    }, [])

    function SeachAction(e){
        e.preventDefault();
        fetchData()
    }
    
    return(
        <>
        <Nav/>
        <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Welcome.....!</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Thank you for choosing BuyBuddy as your literary haven. Happy reading!"
              </p>
            </div>
          </div>
          
        </div>
      </div>
      <div className="text-center h5">Latest Products</div>
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
                <div className='row'>
                {products.map((product,index) =>
                    <div className='col-md-3'>
                        <div className='card mt-3'>
                           <img src={'data:image/jpeg;base64,'+product['image']} style={{Wdth:"100%",height:"150px"}}></img>
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
                        <Link to="/UserLogin" className="btn btn-dark">Login To Buy</Link>
                        </div>
                    </div>
                      )}
                </div>
            </div>
     
        </>
    )
}

export default Home;