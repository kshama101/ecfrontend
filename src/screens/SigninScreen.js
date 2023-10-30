import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

 const userSignin = useSelector(state =>state.userSignin);
 const {loading, userInfo, error} = userSignin;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(()=>{
      if(userInfo){
          navigate('/'+redirect)
      }
  }, [userInfo])
  
  const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(signin(email, password));
  }
  
  return <div className='form'>
    <form onSubmit={submitHandler}>
      <ul className='form-container'>
       <li>
         <h2>Sign-In</h2>
       </li>
       <li>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
       </li>
        <li>
         <label htmlFor="email">
           Email
         </label>
         <input type="email" name='email' id= "email" onChange={(e)=>setEmail(e.target.value)}></input>
        </li>
        <li>
         <label htmlFor="password">
          Password
         </label>
         <input type="password" name='password' id='password' onChange={(e)=>setPassword(e.target.value)}></input>
        </li>
        <li>
          <button type='submit' className='button primary'>Signin</button>
        </li>
        <li>
          New to desimart?
        </li>
        <li>
        {/*This allows the registration page to know where to redirect the user after they've signed up. */}
         <Link to={redirect === '/' ? "/register" : "/register?redirect=" + redirect} className='button secondary text-center'>Create your desimart account</Link>
        </li>
      </ul>
    </form>
  </div>
  
}
export default SigninScreen;
