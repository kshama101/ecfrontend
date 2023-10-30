import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';



function OrderConfirmScreen(props) {
const userSignin = useSelector(state =>state.userSignin);
 const { userInfo } = userSignin;
 const cart = useSelector(state => state.cart);
 const { cartItems } = cart;
 useEffect(()=>{
  cartItems.length = 0;
 }, [])
   
  return   <div className='order-confirm'>
    <div>
    <h2>Order Placed, thanks!</h2>
    </div>
    <div>
    <h4>Shipping to {userInfo.name}</h4>
    </div> 
    </div> 
    
}
export default OrderConfirmScreen;