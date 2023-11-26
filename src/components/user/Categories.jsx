import { useEffect, useState } from "react";
import UserHead from "./uhead";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function Categories(){
    const [count, setCount] = useState(0);
    const[categoryName,setCategoryName] = useState([]);
    const[categories,setCategories] = useState([]);
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
    }, [count])

    
    let category = {
        "categoryName":categoryName
    }
    function CategoryAction(e){
        e.preventDefault();
        axios.post(rest.endPointAddCategories,category,header)
        .then(response => {
            alert(response.data);
            document.getElementById("categoryName").value="";
            setCount(count+1)
        })
        .catch(err => {
            console.log(err)
        })

    }
    return(
        <>
         <div className='pic3'>
        <UserHead/>
        <div className="container mt-3">
           <div className="row">
            <div className="col-md-4">
                <div className="card p-3 mt-4">
                    <div className="text-center h4">Category</div>
                    <form onSubmit={CategoryAction}>
                        <div className="form-group">
                            <input type="text" id="categoryName" onChange={e=>setCategoryName(e.target.value)} placeholder="Category Nane" className="form-control mt-1"></input>
                        </div>
                        <input type="submit" value={"Add Category"} className="btn btn-primary w-100 mt-2"></input>
                    </form>
                </div>
            </div>
            <div className="col-md-8 mt-2">
                <div className="text-center h4">Categories</div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                          <th>Category ID</th>
                          <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category,index)=>
                        <tr>
                            <td>{category['categoryId']}</td>
                            <td>{category['categoryName']}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
           </div>
        </div>
        </div>
        </>
    )
}
export default Categories;