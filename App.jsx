import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogList from './components/Blog_Listing ';
import BlogDetail from './components/BlogDetail';
import Banner from './components/Banner';
import ProductPromo from './components/ProductPromo';
import PageLayout from './components/PageLayout';
import NavigationMenu from './components/MainNavigation';

const yourToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGlkY2MzYWRkYS0wNGYyLTQ5YTEtYjA0ZC1iODk2MjZkNmE2NzUiLCJ4bW9kIjoxNzA4MDQxMTkzMDAwLCJuYmYiOjE3MDgwNDExOTMsImlzcyI6IjE0NTAzYzg4YjgiLCJleHAiOjE3MDg5MDUxOTMsImlhdCI6MTcwODA0MTE5MywianRpIjoiNzRiOWM2YWMtOGI4ZS00OGM4LThjZGMtNDYyZmViYjA2ODc1In0.D55D4pbgtn3vA4oBPW7-F77-BthHwOaXelSKwZL3aTc';

const App = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // Fetch page data from dotCMS API
    axios.get('https://demo.dotcms.com/api/v1/page/render/index', {
      headers: {
        'Authorization': `Bearer ${yourToken}`
      }
    })
    .then(response => {
      setPageData(response.data.entity);
    })
    .catch(error => {
      console.error('Error fetching page data:', error);
    });
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationMenu data={pageData.nav} />
      <Banner data={pageData.banner} />
      <Blog_Listing data={pageData.blogs} />
      <BlogDetail data={pageData.blogDetail} />
      <ProductPromo data={pageData.promo} />
      <PageLayout data={pageData.layout} />
    </div>
  );
};

export default App;

