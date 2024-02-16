//Banner.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from './Banner'; 
import ProductPromo from './ProductPromo'; 

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [bannerContent, setBannerContent] = useState('');
  const [productPromoContent, setProductPromoContent] = useState('');

  useEffect(() => {
    // Fetch blog content
    axios.get(`https://demo.dotcms.com/api/content/render/false/query/+structureName:Blog/postContentStructureId:12345.0/+identifier:${blogId}`)
      .then(response => {
        setBlog(response.data.contentlets[0]);
        setBannerContent(response.data.contentlets[0].bannerContent);
        setProductPromoContent(response.data.contentlets[0].productPromoContent);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [blogId]);

  return (
    <div>
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      <Banner bannerContent={bannerContent} />
      <ProductPromo promoContent={productPromoContent} />
    </div>
  );
};

export default BlogDetail;
