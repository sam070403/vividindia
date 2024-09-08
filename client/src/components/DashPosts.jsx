import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className='min-w-full table-auto shadow-md'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Date updated
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Post image
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Post title
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Category
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Delete
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                  <span>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              {userPosts.map((post) => (
                <tr key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    
                    {post.title}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-900 dark:text-gray-200'>
                    {post.category}
                  </td>
                  <td className='px-4 py-2 text-sm text-red-600 cursor-pointer'>
                    <button>Delete</button>
                  </td>
                  <td className='px-4 py-2 text-sm text-blue-600 cursor-pointer'>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
