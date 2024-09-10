import React from 'react'
import { Sidebar, SidebarItemGroup } from 'flowbite-react';
import {HiUser,HiArrowSmRight,HiDocumentText, HiOutlineUserGroup,HiAnnotation } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/UserSlice';

export default function DashSidebar() {
    const location=useLocation();
    const dispatch=useDispatch();
    const {currentUser}=useSelector((state)=>state.user);
    const [tab, setTab] = useState('');

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
  return (
    
    <Sidebar className='w-full md:w-56 '>
        <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab==='profile'} icon={HiUser}  
            as='div'>
                <div className="flex justify-between items-center">
                Profile
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded-lg bg-gray-200 text-gray-800`}
                >
                  {currentUser.isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
            </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
           {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
              >
               Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
            <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        </Sidebar.Items>
        
    </Sidebar>
   
  )
}
