import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from '../redux/user/UserSlice';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-800">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Vivid
          </span>
          <span className="text-xl font-bold text-black dark:text-white">
            India
          </span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md hidden lg:inline dark:bg-gray-700 dark:text-white"
        />
        <button className="px-4 py-2 bg-gray-200 border-l border-gray-300 rounded-r-md dark:bg-gray-700">
          <AiOutlineSearch className="dark:text-white" />
        </button>
      </div>

      {/* Dark Mode Toggle & Navigation */}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-black hover:text-purple-500 dark:text-white">
            Home
          </Link>
          <Link to="/about" className="text-black hover:text-purple-500 dark:text-white">
            About
          </Link>
          <Link to="/projects" className="text-black hover:text-purple-500 dark:text-white">
            Projects
          </Link>
        </nav>
      </div>
      <button
        className="p-2 bg-gray-200 rounded-full dark:bg-gray-700"
        onClick={handleThemeToggle}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>

      {/* Sign-in Button */}
      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="user"
              img={currentUser.profilePicture}
              rounded
              style={{ width: "40px", height: "40px" }}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <Link to={"/dashboard?tab=profile"}>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/signin">
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-white rounded-md w-full"
            style={{
              background: "linear-gradient(to right,#c4b5fd,#5b21b6)",
            }}
          >
            Sign In
          </button>
        </Link>
      )}

      {/* Mobile Menu Icon */}
      <button
        className="block md:hidden p-2 bg-gray-200 rounded-md dark:bg-gray-700"
        onClick={toggleMenu}
      >
        <FaBars className="dark:text-white" />
      </button>
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-4 top-16 bg-white shadow-md rounded-md p-4 md:hidden dark:bg-gray-800">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-black hover:text-purple-500 dark:text-white"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-purple-500 dark:text-white"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/projects"
              className="text-black hover:text-purple-500 dark:text-white"
              onClick={toggleMenu}
            >
              Projects
            </Link>
          </nav>
        </div>
      )}
      <hr className="border-t border-gray-200" />
    </header>
  );
}
