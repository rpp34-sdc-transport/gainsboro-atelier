import React from 'react';
import styled from 'styled-components';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

const Title = styled.p`
  padding-left: 50px;
`;


export default class RelatedAndOutfits extends React.Component {

  render() {
    const {relatedProducts, currProduct, outfitList, handleAddToOutfitClick, handleRemoveOutfitFromListClick} = this.props;

    return(
    <div>
      <Title>RELATED PRODUCTS</Title>
      <RelatedProducts
        relatedProducts={relatedProducts}
        currFeature={currProduct.features}
        currName={currProduct.name}
      />
      <Title>YOUR OUTFIT</Title>
      <YourOutfit
        currProductId={currProduct.id}
        outfitList={outfitList}
        handleAddToOutfitClick={handleAddToOutfitClick}
        handleRemoveOutfitFromListClick={handleRemoveOutfitFromListClick}
      />
    </div>
    )
  }
}
