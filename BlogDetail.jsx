//BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://demo.dotcms.com/api/content/render/false/query/+structureName:Blog+identifier:${id}`)
      .then(response => {
        setBlog(response.data.contentlets[0]);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
    </div>
  );
};

export default BlogDetail;
