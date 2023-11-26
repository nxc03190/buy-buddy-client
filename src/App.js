import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/common/Home';
import UserLogin from './components/common/UserLogin';
import UserRegistration from './components/common/UserRegistration';
import UserHome from './components/user/UserHome';
import Logout from './components/logout';
import Categories from './components/user/Categories';
import AddProduct from './components/user/AddProduct';
import Products from './components/user/Products';
import Orders from './components/user/Orders';
import OrderNowAction from './components/user/OrderNowAction';
import GiveRating from './components/user/GiveRating';
import GetProductDetails from './components/user/getProductDetails';
import Message from './components/user/Message';
import OrderHistory from './components/user/OrderHistory';
import WishList from './components/user/WishList';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
       <Routes>
        <Route path='/'  Component={Home} />
        <Route path='UserLogin' Component={UserLogin} />
        <Route path='UserReg' Component={UserRegistration} />
        <Route path='UserHome' Component={UserHome} />
        <Route path='logout' Component={Logout} />
        <Route path='Categories' Component={Categories} />
        <Route path='AddProduct' Component={AddProduct} />
        <Route path='Products' Component={Products} />
        <Route path='Orders' Component={Orders} />
        <Route path='OrderNowAction' Component={OrderNowAction} />
        <Route path='GiveRating' Component={GiveRating} />
        <Route path='getProductDetails' Component={GetProductDetails} />
        <Route path='Message' Component={Message} />
        <Route path='OrderHistory' Component={OrderHistory} />
        <Route path='WishList' Component={WishList} />
        
       </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
