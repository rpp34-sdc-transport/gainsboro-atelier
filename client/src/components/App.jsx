import React from 'react';
import axios from 'axios';
import Reviews from './Reviews.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      reviews: [],
      page: 1,
      sort: 'relevant',
      product_id: 64620
    }
  }

  componentDidMount() {
    fetch(`/reviews/${this.state.product_id}/${this.state.sort}`)
    .then(response => response.json())
    .then(data => this.setState({
      reviews: data.results
    }));
  }

  render() {
    return (
      <Reviews reviews={this.state.reviews} sort={this.state.sort}/>
    );
  }
}