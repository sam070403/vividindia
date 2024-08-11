import { TextInput, Label, Button } from "flowbite-react";
import React from 'react';
import{Link} from "react-router-dom";
export const Signup = () => {
  return (
    <div className='min-h-screen  mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left*/}
        <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Vivid</span>
        <span className="text-4xl font-bold text-black">India</span>
        </Link>
        <p className='text-sm mt-5'>
          Fuel your curiosity. Expand your knowledge. Join our community today
        </p>
        </div>
        {/*right*/}
        <div className='flex-1 bg-white p-5 rounded-lg shadow-lg z-index:10'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username'></Label>
                <TextInput 
                  type='text'
                  placeholder='Username'
                  id='username'/>
              
            </div>
            <div>
              <Label value='Your Email'></Label>
                <TextInput 
                  type='text'
                  placeholder='name@comapny.com'
                  id='email'/>
              
            </div>
            <div>
              <Label value='Your Password'></Label>
                <TextInput 
                  type='password'
                  placeholder='Password'
                  id='password'/>
              
            </div>
            <button type="button" class="px-4 py-2 text-white rounded-md w-full"
            style={{
              background:"linear-gradient(to right,#c4b5fd,#5b21b6)",
            }}>
               SignUp
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>
              Have an account?
            </span>
            <Link to='/Signin' className="text-blue-500">
            SignIn</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;