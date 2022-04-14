import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating.jsx';
import GlobalStyle from '../globalStyles.js'
import RelatedProductsWidget from './related-products-widget.jsx';
import QuestionAnswer from './QuestionsAndAnswers/questionAnswer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      overview: {},
      overviewStyle: {},
      reviews: [],
      relatedProducts: [],
      sort: 'relevant',
      moreReviewBtn: false,
      meta: {},
      // product_id: 64621
      product_id: 64620
    }

    this.handleMoreReviewBtnClick = this.handleMoreReviewBtnClick.bind(this);
    this.handleSortOptionChange = this.handleSortOptionChange.bind(this);
    this.voteForReview = this.voteForReview.bind(this);
  }

  componentDidMount() {
    axios(`/overview/${this.state.product_id}`)
    .then(({data})=>{
      this.setState({
        overview: data
      })
    });

    axios(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&count=100`)
    .then(data => {
      var reviews = data.data;
      this.setState(preState => ({
      reviews,
      moreReviewBtn: reviews.length <= 2 ? false : true
      }))
    });

    axios(`/reviews/meta/${this.state.product_id}`)
    .then(data => {
      var meta = data.data;
      this.setState({meta})
    })
  }

  handleMoreReviewBtnClick() {
    this.fetchReviews(2)
    .then(data => {
      var reviews = data.data;
      this.setState(preState => ({
        reviews,
        moreReviewBtn: reviews.length >= 2 ? true : false
      }))
    });
  }

  handleSortOptionChange(e) {
    this.setState({sort: e.target.value}, () => {
      axios(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&count=100`)
      .then(data => {
        var reviews = data.data;
        this.setState({reviews,})
      })
    })
  }

  voteForReview(review_id, helpfulness) {
    axios.put(`/reviews/${review_id}/helpful`, {helpfulness})
    .then(data => {
      if (data.status === 204) {
        this.setState(preState => ({
          reviews: preState.reviews.map(review => review.review_id === review_id ? {...review, helpfulness: review.helpfulness + 1} : review)
        }))
      }
    })
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