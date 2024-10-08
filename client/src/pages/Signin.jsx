import { TextInput, Label, Button, Alert, Spinner } from "flowbite-react";
import React from 'react';
import{Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch,useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/UserSlice";
export const Signin = () => {
  const[formData,setFormData]=useState({});
  const {loading,error:errorMessage}= useSelector (state => state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})};
    const handleSubmit =async(e)=>{
      e.preventDefault();
      if(!formData.username||!formData.password){
        return dispatch(signInFailure('Please fill all the fields'));
      }
      try{
        dispatch(signInStart());
        const res=await fetch('/api/auth/signin',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(formData),
        });
        const data=await res.json();
        
        if(data.success===false){
          dispatch(signInFailure(data.message));
        }
        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }
        
      }catch(error){
        dispatch(signInFailure(error.message));
      }
    }
  
  return (
    <div className='min-h-screen  mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left*/}
        <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Vivid</span>
        <span className="text-4xl font-bold dark:text-white text-black">India</span>
        </Link>
        <p className='text-sm mt-5'>
          Fuel your curiosity. Expand your knowledge. Join our community today
        </p>
        </div>
        {/*right*/}
        <div className='flex-1 bg-white p-5 rounded-lg shadow-lg z-index:10'>
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username'className="dark:text-black"></Label>
                <TextInput 
                  type='text'
                  placeholder='Username'
                  id='username'onChange={handleChange}/>
              
            </div>
            
            <div>
              <Label value='Your Password'className="dark:text-black"></Label>
                <TextInput 
                  type='password'
                  placeholder='Password'
                  id='password'onChange={handleChange}/>
              
            </div>
            <button
  type="submit"
  className="flex items-center justify-center px-4 py-2 text-white rounded-md w-full"
  style={{
    background: "linear-gradient(to right,#c4b5fd,#5b21b6)",
  }}
  disabled={loading}
>
  {loading ? (
    <>
      <Spinner size="sm" />
      <span className="pl-3">Loading...</span>
    </>
  ) : (
    "Sign In"
  )}
</button>

          </form>
          <div className="flex gap-2 text-sm mt-5 dark:text-black">
            <span>
             Don't have an account?
            </span>
            <Link to='/Signup' className="text-blue-500">
            SignUp</Link>
          </div>
          {
            errorMessage &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
        <HiInformationCircle className="inline mr-2 w-5 h-5" />
        <span>{errorMessage}</span>
      </div>
          }
        </div>
      </div>
      
    </div>
  );
};

export default Signin;