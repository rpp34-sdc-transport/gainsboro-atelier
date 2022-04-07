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
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(index){
    console.log(index);
    this.setState({
      currentStyle: index
    })

    /*
    change currentStyle in this.state
    passed down to style selector
    */
  }


  render() {
    const {category, default_price, description, features, id, name, slogan, styleData = []} = this.props.data;

    let addToCart, imageGallery, styleSelector;
    if (styleData[this.state.currentStyle]) {
      addToCart = <AddToCart skus={styleData[this.state.currentStyle]['skus']}/>;
      imageGallery = <ImageGallery currentStyle={this.state.currentStyle} photos={styleData[this.state.currentStyle]['photos']}/>;
      styleSelector = <StyleSelector changeStyle={this.changeStyle} currentStyle={this.state.currentStyle} styles={styleData} />

    }

    return (
      <div>
        {imageGallery}
        {styleSelector}
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


