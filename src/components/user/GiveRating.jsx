import axios from "axios";
import UserHead from "./uhead";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function GiveRating(){
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let itemId = params.get('itemId');
    let orderId = params.get("orderId");
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    function RatingForProductAction(e){
        e.preventDefault();
        let itemId =document.getElementById("itemId").value;
        let rating = document.getElementById("rating").value;
        let review = document.getElementById("review").value;
        let orderId = document.getElementById("orderId").value;
        let ratings = {
            "rating":rating,
            "review":review,
            "itemId":itemId,
            "orderId":orderId

        }
        console.log(ratings);
        axios.post(rest.endPointGiveRating,ratings,header)
        .then(response => {
            alert(response.data)
            navigate("/Orders?status=history")
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
    <>
    <UserHead/>
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5">
                <div className="card p-3">
                    <div className="text-center h4">Rating For Product</div>
                    <form onSubmit={RatingForProductAction}>
                        <input type="hidden" id="itemId" value={itemId}></input>
                        <input type="hidden" id="orderId" value={orderId}></input>
                        <div className="form-group">
                            <label>Rating</label>
                            <select id="rating" className="form-control mt-2">
                                <option value={"5"}>5</option>
                                <option value={"4"}>4</option>
                                <option value={"3"}>3</option>
                                <option value={"2"}>2</option>
                                <option value={"1"}>1</option>
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label>Review</label>
                            <textarea id="review" className="form-control mt-1" placeholder="Comment"></textarea>
                        </div>
                        <input type="submit" value={"Submit"} className="btn btn-primary w-100 mt-3"></input>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default GiveRating;