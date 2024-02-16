import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NavigationMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  // Replace 'yourToken' with the token you received from the authentication request
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGlmNTc2MDM5MC0zMjRlLTRhNzMtODM0MS1kN2I5NDgyZjM3MGQiLCJ4bW9kIjoxNzA4MDk3NDYxMDAwLCJuYmYiOjE3MDgwOTc0NjEsImlzcyI6IjEyZjFkMGY5ZDAiLCJleHAiOjE3MDg5NjE0NjEsImlhdCI6MTcwODA5NzQ2MSwianRpIjoiNDg0NzQ3ODYtYzYwMy00OTk4LWEwZWMtN2U4NmUwYjI3NjUzIn0.gxVvymhVbLNEaQsOynKjj_SFJYwHZExFxrdHs7mZ4bw';

  useEffect(() => {
    axios.get('https://demo.dotcms.com/api/v1/nav/?depth=2&languageId=1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('API response:', response.data);
      setMenuItems(response.data.entity.children); // Update this line
    })
    .catch(error => {
      console.error('Error fetching navigation menu:', error);
      setError(error.toString());
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!menuItems.length) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {menuItems.map((item, index) => (
        <li key={index}>
          <a href={item.href}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;

