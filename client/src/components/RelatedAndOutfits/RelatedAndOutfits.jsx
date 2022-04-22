import React from 'react';
import styled from 'styled-components';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

export default class RelatedAndOutfits extends React.Component {

  render() {
    const {relatedProducts, currProduct} = this.props;

    return(
    <div>
      <p>RELATED PRODUCTS</p>
      <RelatedProducts relatedProducts={relatedProducts} currFeature={currProduct.features} currName={currProduct.name}/>
      <p>YOUR OUTFIT</p>
      <YourOutfit />
    </div>
    )
  }
}
