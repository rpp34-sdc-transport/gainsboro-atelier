import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import RelatedAndOutfits from './RelatedAndOutfits/RelatedAndOutfits.jsx';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating.jsx';
import GlobalStyle from '../globalStyles.js'
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
      meta: {},
      product_id: 64626 //64620
    }

    this.handleSortOptionChange = this.handleSortOptionChange.bind(this);
    this.voteForReview = this.voteForReview.bind(this);
  }

  componentDidMount() {
    axios(`/overview/${this.state.product_id}`)
    .then(({data})=>{
      this.setState({overview: data})
    });

    axios.get(`/products/${this.state.product_id}/related`)
    .then(({data}) => {
      this.setState({relatedProducts: data})
    })

    axios.get(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&count=500`)
    .then(data => {
      var reviews = data.data;
      this.setState(preState => ({
      reviews,
      moreReviewBtn: reviews.length <= 2 ? false : true
      }))
    });

    axios.get(`/reviews/meta/${this.state.product_id}`)
    .then(data => {
      var meta = data.data;
      this.setState({meta})
    })

  }


  handleSortOptionChange(e) {
    this.setState({sort: e.target.value}, () => {
      axios(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&count=500`)
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
        <RelatedAndOutfits
          relatedProducts={this.state.relatedProducts}
          currFeature={this.state.overview.features}
          currName={this.state.overview.name}
        />
        <QuestionAnswer
          productId={this.state.product_id}
          overview={this.state.overview}
        />
        <ReviewAndRating
          product_id={this.state.product_id}
          productName={this.state.overview.name}
          meta={this.state.meta}
          reviews={this.state.reviews}
          handleSortOptionChange={this.handleSortOptionChange}
          voteForReview={this.voteForReview}
        />
      </>
    );
  }
}