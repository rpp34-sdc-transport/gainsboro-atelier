import React from 'react';
import axios from 'axios';

export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSku: null,
      selectedSize: null,
      maxQuantity: null,
      selectedQuantity: 1,
      firstSku: 0
    }
    this.selectSize = this.selectSize.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(e.target.value);
    this.setState({
      selectedQuantity: e.target.value
    })
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
    console.log('submit');
    axios.post(`/cart/${this.state.selectedSku}/${this.state.selectedQuantity}`)
    .then(()=>{
      console.log('posted to cart');
    })
    .catch((err)=>{
      console.log('unable to add to bag');
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

    let quantity;
    if (this.state.selectedSku === null) {
      quantity = <select name="quantity" onChange={this.selectQuantity} disabled>
        <option value='—'>—</option>
      </select>;
    } else {
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
        <select name="size" onChange={this.selectSize} value={this.state.selectedSize ? this.state.selectedSize : 'Select a size'}>
          {sizes}
        </select>
        {quantity}
        <input type="submit" value="ADD TO BAG" />
        <button>Add to outfit</button>
      </form>
    );
  }
}