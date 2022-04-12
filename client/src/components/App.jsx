import React from 'react';
import axios from 'axios';
import Reviews from './Reviews.jsx';
import RelatedProductsWidget from './related-products-widget.jsx'
import Overview from './Overview/Overview.jsx';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating.jsx';
import GlobalStyle from '../globalStyles.js'
import QuestionAnswer from './questionAnswer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      reviews: [],
      relatedProducts: [],
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
      <>
        <GlobalStyle />
        <Overview data={this.state.overview}/>
        <RelatedProductsWidget products={this.state.relatedProducts}/>
        <ReviewAndRating
          meta={this.state.meta}
          reviews={this.state.reviews}
          sort={this.state.sort}
          handleMoreReviewBtnClick={this.handleMoreReviewBtnClick}
          moreReviewBtn={this.state.moreReviewBtn}
          handleSortOptionChange={this.handleSortOptionChange}
          voteForReview={this.voteForReview}
        />
      </>
      
    );
  }
}