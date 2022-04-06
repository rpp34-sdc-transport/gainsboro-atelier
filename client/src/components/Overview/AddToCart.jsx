import React from 'react';


export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(){
    //change this.state when a size or quantity selection is made

  }


  handleSubmit(){
    event.preventDefault();
  }

  render() {
    const {skus} = this.props;
    // console.log(skus);
    return (
      <form onSubmit={this.handleSubmit}>
        <select name="size" onChange={this.handleChange}>
        </select>
        <select name="quantity" onChange={this.handleChange}>
        </select>
        <input type="submit" value="ADD TO BAG" />
        <button>Add to outfit</button>
      </form>
    );
  }
}