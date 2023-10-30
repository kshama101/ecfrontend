import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderConfirmScreen from './screens/OrderConfirmScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const{userInfo} = userSignin;
  const cart = useSelector(state=> state.cart)
  const {cartItems} = cart; 
   
  const openMenu =()=>{
    document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu =()=>{
    document.querySelector(".sidebar").classList.remove("open");
    }
 {/*  <Link to="/cart/:id?">Cart   {cartItems.length > 0 && (
  <span className="badge">{cartItems.length}</span>
)}</Link> */}
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">desimart</Link>
          </div>
          <div className="header-links">
          <Link to="/cart/:id?">Cart </Link>
          
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
              <Link to="/signin">Sign In</Link>  
            } 
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}> x </button>
          <ul className="categories">
            <li>
            <a href="index.html">Pants</a>
            </li>
            <li>
            <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/orderconfirm" element={<OrderConfirmScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen/>} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/" exact={true} element={<HomeScreen />} />*
            </Routes>       
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
  </BrowserRouter>
  );
}

export default App;

