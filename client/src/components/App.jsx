import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating.jsx';
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
      moreReviewBtn: false,
      product_id: 64620
    }

    this.handleMoreReviewBtnClick = this.handleMoreReviewBtnClick.bind(this);
    this.handleSortOptionChange = this.handleSortOptionChange.bind(this);
    this.voteForReview = this.voteForReview.bind(this);
  }

  fetchReviews(count) {
    return axios(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&page=${this.state.page}&count=${count}`);
  }

  componentDidMount() {
    axios(`/overview/${this.state.product_id}`)
    .then(({data})=>{
      // console.log(data);
      this.setState({
        overview: data
      })
    });

    this.fetchReviews(3)
    .then(data => {
      var reviews = data.data;
      this.setState(preState => ({
      reviews: reviews.filter((review, index) => index !== 2),
      page: preState.page + 1,
      moreReviewBtn: reviews.length <= 2 ? false : true
      }))
    });
  }

  handleMoreReviewBtnClick() {
    this.fetchReviews(2)
    .then(data => {
      var reviews = data.data;
      this.setState(preState => ({
        reviews: [...preState.reviews, ...reviews],
        page: preState.page + 1,
        moreReviewBtn: reviews.length >= 2 ? true : false
      }))
    });
  }

  handleSortOptionChange(e) {
    this.setState({sort: e.target.value, page: 1}, () => {
      this.fetchReviews(2)
      .then(data => {
        console.log('first two review after changing sorting', data.data);
        var reviews = data.data;
        this.setState({
          reviews,
          moreReviewBtn: reviews.length === 2 ? true : false
        })
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
        <ReviewAndRating
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