import React from 'react';
import { Navbar, TextInput, Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
    const path = useLocation().pathname;

    return (
        <Navbar className='border-b-2 flex items-center justify-between px-4 py-2'>
            <Link to='/' className='flex items-center text-lg font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Sahand's
                </span>
                <span className='ml-2'>Blog</span>
            </Link>

            <form className='relative flex-1 hidden lg:flex justify-center items-center'>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    className='rounded-full pl-4 pr-10 py-2  w-100'
                />
                <AiOutlineSearch className=' right text-gray-500' />
            </form>

            <div className='flex items-center'>
                <Button className='w-10 h-10 hidden sm:flex items-center justify-center' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to='/Signin'>
                    <Button gradientDuoTone='purpleToBlue' outline className='ml-4'>
                        Sign In
                    </Button>
                </Link>
            </div>

            <Navbar.Toggle />

            <Navbar.Collapse className='flex-1 justify-end'>
                <Navbar.Link className={path === '/' ? 'text-blue-600' : ''}>
                    <Link to='/' className='hover:text-blue-600'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link className={path === '/About' ? 'text-blue-600' : ''}>
                    <Link to='/About' className='hover:text-blue-600'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link className={path === '/Projects' ? 'text-blue-600' : ''}>
                    <Link to='/Projects' className='hover:text-blue-600'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
