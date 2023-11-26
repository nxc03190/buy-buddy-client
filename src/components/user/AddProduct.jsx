import Cookies from "js-cookie";
import UserHead from "./uhead";
import axios from "axios";
import { useEffect, useState } from "react";
const rest = require('../../EndPoints');

function AddProduct(){
    const[title,setTitleName] = useState([])
    const[price,setPrice] = useState([])
    const[about,setAboutProduct] = useState([])
    const[categoryId,setCategoryId] = useState([])

    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }
    

    const[categories,setCategories] = useState([]);
    let header = {
        headers: {
            'Content-Type': "multipart/form-data",
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
    }, [])

    function ProductAction(e){
        e.preventDefault();
       // const reader = new FileReader();
       
        let product = new FormData();
        product.append("price",price);
        product.append("title",title);
        product.append("categoryId",categoryId)
        product.append("about",about)
        product.append("image",state.selectedFile);
        axios.post(rest.endPointAddProduct,product,header)
        .then(response => {
            alert(response.data);
            document.getElementById("title").value="";
            document.getElementById("price").value="";
            document.getElementById("about").value="";

        })
        .catch(err => {
            console.log(err)
        })
    }
    

    return(
        <>
          <div className='pic3'>
        <UserHead/>
        <div className="container mt-5">
        <form onSubmit={ProductAction}>
           <div className="card p-5 mt-3" style={{backgroundImage:"https://img.freepik.com/free-photo/blur-shopping-mall_74190-4924.jpg"}}>
            <div className="h4 text-center">Add Product</div>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" onChange={e=>setTitleName(e.target.value)} className="form-control mt-1" id="title" placeholder="Product Name" required></input>
                        </div>
                        <div className="form-group mt-1">
                            <label>Price</label>
                            <input type="number" onChange={e=>setPrice(e.target.value)} className="form-control mt-1" id="price" placeholder="Price" required></input>
                        </div>
                        <div className="form-group mt-1">
                            <label>About</label>
                            <textarea id="about" onChange={e=>setAboutProduct(e.target.value)} className="form-control mt-1" placeholder="About Product" required></textarea>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label>Choose Category</label>
                            <select id="categoryId" className="form-control mt-1" onChange={e=>setCategoryId(e.target.value)}>
                                <option>Choose Category</option>
                               {categories.map((category,index)=>
                               <option value={category['categoryId']}>{category['categoryName']}</option>
                               )}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Upload Picture</label>
                            <input type="file" className="form-control mt-1" id="picture" onChange={fileSelectedHandler}  placeholder="Price" required></input>
                        </div>
                        <div className="mt-5">
                          <input type="submit" value={"Add Product"} className="btn btn-dark w-100"></input>
                        </div>
                    </div>
                </div>
           </div>
           </form>
        </div>
        </div>
        </>
    )
}
export default AddProduct;