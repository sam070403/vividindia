import React, {useState} from "react";
import { Link,useLocation } from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai"
import {FaBars, FaMoon} from "react-icons/fa"
import { Navbar,Dropdown,Avatar } from "flowbite-react";
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Vivid</span>
        <span className="text-xl font-bold text-black">India</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mx-4">
        <input
          type="text"
          placeholder="Search..."
         
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md hidden lg:inline"
        />
        <button className="px-4 py-2 bg-gray-200 border-l border-gray-300 rounded-r-md">
          <AiOutlineSearch/>
          
        </button>
      </div>

      {/* Dark Mode Toggle & Navigation */}
      <div className="flex items-center space-x-4">
       
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-black hover:text-purple-500">Home</Link>
          <Link to="/about" className="text-black hover:text-purple-500">About</Link>
          <Link to="/projects" className="text-black hover:text-purple-500">Projects</Link>
        </nav>
      </div>
      <button className="p-2 bg-gray-200 rounded-full">
          <FaMoon/>
        </button>

      {/* Sign-in Button */}
      {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded style={{ width: '40px', height: '40px' }} />

            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item >Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}

      


      {/* Mobile Menu Icon */}
      <button className="block md:hidden p-2 bg-gray-200 rounded-md"
      onClick={toggleMenu}>
        <FaBars/>
      </button>
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-4 top-16 bg-white shadow-md rounded-md p-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-black hover:text-purple-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-purple-500"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/projects"
              className="text-black hover:text-purple-500"
              onClick={toggleMenu}
            >
              Projects
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
