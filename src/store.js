import { applyMiddleware, compose } from "redux";
import Cookies from "js-cookie";
import thunk from 'redux-thunk';
import { createStore, combineReducers } from "redux";
import { productDetailsReducer, productListReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer } from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducers";
import { userRegisterReducer, userSigninReducer, userUpdateReducer } from "./reducers/userReducers";


const cartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
const userInfo = Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null;

const initialState = {cart : { cartItems, shipping: {}, payment: {} }, userSignin: {userInfo}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer ,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer ,
    userUpdate: userUpdateReducer,
    productReviewSave: productReviewSaveReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))


export default store;