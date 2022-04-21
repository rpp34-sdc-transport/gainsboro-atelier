import React from 'react';
import styled from 'styled-components';
import RelatedProducts from './RelatedProducts.jsx';

export default class RelatedAndOutfits extends React.Component {

  render() {
    return(
    <div>
      <p>RELATED PRODUCTS</p>
      <RelatedProducts />
    </div>
    )
  }
}