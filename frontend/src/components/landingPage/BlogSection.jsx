import React from 'react';
import factory from '@assets/landingPage/factory.jpeg';
import field1 from '@assets/landingPage/field1.jpeg';
import worker from '@assets/landingPage/worker.jpeg';

const BlogSection = () => {
  const blogPosts = [
    {
      date: 'Best',
      category: 'workers',
      title: 'Winck trending landing page 2020',
      admin: 'Admin',
      views: ' ',
      comments: ' ',
      image: field1, // Replace with actual image paths
    },
    {
      date: 'Best',
      category: 'Factory',
      title: 'The evolution of landing page creativity',
      admin: 'Admin',
      views:' ',
      comments:  ' ',
      image: factory,
    },
    {
      date: 'Best',
      category: 'Production',
      title: 'How to growth business with Winck',
      admin: 'Admin',
      views: ' ',
      comments: ' ',
      image: worker,
    },
  ];

  return (
    <section className="py-10 px-4 md:px-20">
      <div className="text-center">
        <h2 className="text-lg md:text-2xl font-semibold">From Our Company</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Best Tea Production</h3>
        <p className="text-gray-500 mt-4 md:mt-6">We have the best tea production. This is Why</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-40 md:h-64 object-cover" />
            <div className="p-4">
              <div className="text-sm text-gray-500">{post.date} <span className="font-semibold">{post.category}</span></div>
              <h4 className="mt-2 text-lg font-semibold">{post.title}</h4>
              <div className="mt-4 flex items-center text-gray-500 text-sm">
                <span className="mr-4"><i className="fas fa-user mr-1"></i>{post.admin}</span>
                <span className="mr-4"><i className="fas fa-eye mr-1"></i>{post.views}</span>
                <span><i className="fas fa-comments mr-1"></i>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-color_focus text-white rounded-lg shadow-md hover:bg-color_extra transition duration-200 p-3">Check It Out</button>
      </div>
    </section>
  );
};

export default BlogSection;
