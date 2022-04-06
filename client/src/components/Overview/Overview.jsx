import React from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';


export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: 0
    }
  }

  changeStyle(){
    /*
    change currentStyle in this.state
    passed down to style selector
    */
  }


  render() {
    const {category, default_price, description, features, id, name, slogan, styleData = []} = this.props.data;

    let imageGallery, addToCart;
    if (styleData[this.state.currentStyle]) {
      imageGallery = <ImageGallery currentStyle={this.state.currentStyle} photos={styleData[this.state.currentStyle]['photos']}/>;
      addToCart = <AddToCart skus={styleData[this.state.currentStyle]['skus']}/>
    }
    return (
      <div>
        {imageGallery}
        <StyleSelector changeStyle={this.changeStyle} styles={styleData} />
        {addToCart}
        <h5>{category}</h5>
        <p>{default_price}</p>
        <h1>{name}</h1>
        <p>{slogan}</p>
        <p>{description}</p>
      </div>
    );
  }
}


