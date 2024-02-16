//ProductPromo.js
import React from 'react';

const ProductPromo = ({ promoContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: promoContent }} />
  );
};
export default ProductPromo;
