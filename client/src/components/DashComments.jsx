import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal,Button } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setcommentIdToDelete] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comment.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
         `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComments = async () => {
    try {
        const res = await fetch (`/api/comment/deleteComment/${commentIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setComments((prev) => prev.filter((comments) => comments._id !== commentIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };
 

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className='min-w-full table-auto shadow-md'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Date updated
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Comment content
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                 Number of Likes
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                PostId
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  UserId
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Delete
                </th>
                
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              {comments.map((comment) => (
                <tr key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    
                      {comment.content}
                   
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-white'>
                    
                    {comment.numberOfLikes}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-white'>
                    
                  {comment.postId}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                  {comment.userId}
                  </td>
                  <td className='px-4 py-2 text-sm text-red-600 cursor-pointer'>
                    <button onClick={() => {
                        setShowModal(true);
                        setcommentIdToDelete(comment._id);
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
        <p>You have no comments yet!</p>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
            <button
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteComments}
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
