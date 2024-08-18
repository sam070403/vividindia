import React from 'react'
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <div
      className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
      >
         <img
            src={ currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-6 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          
        />
        <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-white rounded-md w-full hover:outline"
            
            style={{
              background: "linear-gradient(to right,#c4b5fd,#5b21b6)",
            }}
          >
            Update
          </button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span>Delete account</span>
            <span>Sign Out</span>
        </div>
      </div>
      

      
   
  )
}
