import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

function CartScreen(props) {
    const cart = useSelector(state=> state.cart)
    const {cartItems} = cart; 
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1;

    const removeFromCartHandler = (productId) =>{
        dispatch(removeFromCart(productId))

    }

    useEffect(()=>{
        if(id) {
          dispatch(addToCart(id, qty));
        }
    }, [])

    const checkoutHandler = () =>{
       navigate("/signin?redirect=shipping")
    }
    const continueShoppingHandler = ()=>{
      navigate("/")
    }
  return (
    <div className='cart'>
     <div className='cart-list'>
      <ul className='cart-list-container'>
        <li>
          <h3>
             Shopping Cart
          </h3>
          <div>
             Price
          </div>
        </li>
        {
            cartItems.length === 0 ?
            <div>
              Cart is Empty
            </div>
            :
            cartItems.map(item =>
                <li>
                  <div className='cart-image'>
                     <img src={item.image} alt ="product"></img>
                  </div>
                 
                  <div className='cart-name'>
                    <div>
                      <Link to={"/product/" + item.product }>
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      Qty:
                      <select value={item.qty} onChange={(e) => dispatch({ type : 'UPDATE_CART_ITEM', payload: {product:item.product, qty: e.target.value}})}>
                        {[...Array(item.countInStock).keys()].map(x=>
                            <option key={x +1} value = {x + 1}>{x + 1}</option>
                        )} 
                      </select>
                      <button type='button' className='button' onClick={()=>removeFromCartHandler(item.product)}>
                       Delete
                      </button>
                    </div>
                  </div>
                  <div className='cart-price'>
                    ${item.price}
                  </div>
                </li>   
            )      
        }
      </ul>
     </div>
     <div className='cart-action'>
       <h3>
         Subtotal ({cartItems.reduce((a, c)=>Number(a) + Number(c.qty), 0)} items)
         :
       ${cartItems.reduce((a, c)=> Number(a) + Number(c.price) * Number(c.qty), 0)}
       </h3>
       <button className="button primary full-width" onClick={checkoutHandler} disabled = {cartItems.length === 0}>
        Proceed To Checkout
       </button>
       <button className="button tertiarry full-width" onClick={continueShoppingHandler}>
        Continue Shopping
      </button>
       
     </div>
    </div>
  )
}

export default CartScreen;