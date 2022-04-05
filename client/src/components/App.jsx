import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import Reviews from './Reviews.jsx';
import GlobalStyle from '../globalStyles.js'
import QuestionAnswer from './questionAnswer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      overview: {},
      overviewStyle: {},
      reviews: [],
      page: 1,
      sort: 'relevant',
      product_id: 64620
    }
  }

  componentDidMount() {
    axios(`/overview/${this.state.product_id}`)
    .then(({data})=>{
      // console.log(data);
      this.setState({
        overview: data
      })
    });

    fetch(`/reviews/${this.state.product_id}/${this.state.sort}`)
    .then(response => response.json())
    .then(data => this.setState({
      reviews: data.results
    }));
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Overview data={this.state.overview}/>
        <Reviews reviews={this.state.reviews} sort={this.state.sort}/>
        <QuestionAnswer productId={this.state.product_id}/>
      </>
      );
  }
}