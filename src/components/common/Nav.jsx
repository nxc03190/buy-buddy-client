import { Link } from "react-router-dom";

function Nav(){
    return(
        <>
<nav class="navbar navbar-expand-lg navbar-light p-3 bg-light">
  <div className="container-fluid">
  <div className="navbar-brand fw-bold fs-4 px-2">BuyBuddy</div>
    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/"><b style={{fontSize:"18px"}}>Home</b></Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/UserLogin"><b style={{fontSize:"18px"}}>User</b></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}
export default Nav;