import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal,Button } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser=async()=>{

  };
 

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className='min-w-full table-auto shadow-md'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Date created
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  User image
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                 User Name
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                Email
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Admin
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Delete
                </th>
                
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              {users.map((user) => (
                <tr key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover rounded-full bg-gray-500'
                      />
                   
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-white'>
                    
                    {user.username}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-white'>
                    
                    {user.email}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-4 py-2 text-sm text-red-600 cursor-pointer'>
                    <button onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}>Delete</button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
            <button
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteUser}
                >
                  Yes, I'm sure
                </button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
