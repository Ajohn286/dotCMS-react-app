//PageLayout.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './Banner';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';
import ProductPromo from './ProductPromo';

const componentMap = {
  Banner,
  BlogList,
  BlogDetail,
  ProductPromo,
  // Add other components here
};

const PageLayout = () => {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    axios.get('https://demo.dotcms.com/api/v1/page/render/index')
      .then(response => {
        setLayout(response.data.layout);
      })
      .catch(error => {
        console.error('Error fetching page layout:', error);
      });
  }, []);

  if (!layout) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {layout.map((component, index) => {
        const Component = componentMap[component.type];
        return Component ? <Component {...component.props} key={index} /> : null;
      })}
    </div>
  );
};

export default PageLayout;

