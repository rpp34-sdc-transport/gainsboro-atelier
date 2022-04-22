import React, {createRef} from 'react';
import axios from 'axios';

export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSku: 0,
      maxQuantity: null,
      selectedSku: null,
      selectedSize: null,
      selectedQuantity: 1
    }
    this.selectSize = this.selectSize.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidUpdate(){
    //handle a style change by updating the sku to reflect the same size
    if (this.state.selectedSize && this.state.firstSku !== Object.keys(this.props.skus)[0]) {
      let newSku;
      for (var key in this.props.skus) {
        if (this.props.skus[key]['size'] === this.state.selectedSize) {
          newSku = key;
        }
      }

      let maxQuantity = Math.min(15, this.props.skus[newSku].quantity);
      let selectedQuantity = this.state.selectedQuantity > maxQuantity ? 1 : this.state.selectedQuantity;

      this.setState({
        selectedQuantity: selectedQuantity,
        selectedSku: newSku,
        maxQuantity: maxQuantity,
        firstSku: Object.keys(this.props.skus)[0]
      });
    }
  }


  handleSubmit(){
    event.preventDefault();
    axios.post(`/cart`, {"sku_id": this.state.selectedSku})
    .then((data)=>{
      //receive cart data
    })
    .catch((err)=>{
      // console.log('unable to add to bag', err);
    })
  }


  selectSize(event){
    let selectedSku  = event.target.selectedOptions[0].getAttribute('sku');
    let maxQuantity = Math.min(15, this.props.skus[selectedSku].quantity);

    this.setState({
      selectedSize: event.target.value,
      selectedSku : selectedSku,
      maxQuantity: maxQuantity,
    })
  }


  selectQuantity(e){
    this.setState({
      selectedQuantity: e.target.value
    })
  }


  render() {
    const {skus} = this.props;

    let sizes = Object.keys(skus).map(sku =>
      (<option key={sku} value={skus[sku].size} sku={sku} >
        {skus[sku].size}
      </option>)
    );

    sizes.unshift(
      <option value='Select a size' key={'select a size'}>
        Select a size
      </option>)

    let addToCart, size, quantity;

    if (Object.keys(skus).length === 0){
      size= <select name="sizes" disabled>
      <option>OUT OF STOCK</option>
    </select>;
    } else {
      size = <select
      name="size"
      onChange={this.selectSize}
      ref={this.sizeRef}
      value={this.state.selectedSize ? this.state.selectedSize : 'Select a size'}>
      {sizes}
    </select>
    }

    if (this.state.selectedSku === null) {
      quantity = <select name="quantity" onChange={this.selectQuantity} disabled>
        <option value='—'>—</option>
      </select>;
    } else {
      addToCart = <input type="submit" value="ADD TO BAG" />;
      let options = [];
      for (var i = 1; i <= this.state.maxQuantity; i++) {
        options.push(<option value={i} key={i}>{i}</option>)
      };
      quantity = <select name="quantity" onChange={this.selectQuantity}>
        {options}
      </select>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {size}
        {quantity}
        {addToCart}
        <button>Add to outfit</button>
      </form>
    );
  }
}