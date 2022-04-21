import React from 'react';
import styled from 'styled-components';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

export default class RelatedAndOutfits extends React.Component {

  render() {
    const {relatedProducts, currFeature, currName} = this.props;
    return(
    <div>
      <p>RELATED PRODUCTS</p>
      <RelatedProducts relatedProducts={relatedProducts} currFeature={currFeature} currName={currName}/>
      <p>YOUR OUTFIT</p>
      <YourOutfit />
    </div>
    )
  }
}