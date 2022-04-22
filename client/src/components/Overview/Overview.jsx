import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import StarRating from '../ReviewAndRating/StarRating.jsx'

const Flexcontainer = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column
`;
const SalePrice = styled.p`
  color: red;
`;

const DiscountedPrice = styled.p`
  text-decoration: line-through
`;

const SmallLink = styled.p`
  text-decoration: underline
`;

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: 0,
      originalPrice: this.props.data.styleData[0]['original_price'],
      salePrice: this.props.data.styleData[0]['sale_price'],
      isPortrait: []
    }
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(index){
    const originalPrice = this.props.data.styleData[index]['original_price'];
    const salePrice = this.props.data.styleData[index]['sale_price'];
    this.setState({
      currentStyle: index,
      originalPrice: originalPrice,
      salePrice: salePrice
    })
  }

  loadLandscapeOrientation(landscapeOrientation){
    if (landscapeOrientation) {

    } else {

    }
  }
  render() {
    const {category, default_price, description, features, id, name, slogan, styleData = []} = this.props.data;

    let addToCart, imageGallery, styleSelector;


    if (styleData[this.state.currentStyle]) {
      addToCart = <AddToCart skus={styleData[this.state.currentStyle]['skus']}/>;
      imageGallery = <ImageGallery currentStyle={this.state.currentStyle} photos={styleData[this.state.currentStyle]['photos']}/>;
      styleSelector = <StyleSelector changeStyle={this.changeStyle} currentStyle={this.state.currentStyle} styles={styleData} />
    }

    //Add discounted price if available
    let price = this.state.salePrice === null ?
    <p>${this.state.originalPrice}</p> :
    (<div>
      <SalePrice>${this.state.salePrice}</SalePrice>
      <DiscountedPrice>${this.state.originalPrice}</DiscountedPrice>
    </div>);

    return (
      <div>
        <Flexcontainer>
          {imageGallery}
          <FlexColumn>
            {addToCart}
            <StarRating ratings={this.props.ratings} showAve={false}/>
            <SmallLink>Read all reviews</SmallLink>
            <h5>{category}</h5>
            <h2>{name}</h2>
            {price}
            {styleSelector}
          </FlexColumn>
        </Flexcontainer>
        <p>{slogan}</p>
        <p>{description}</p>
      </div>
    );
  }
}


