import React from 'react';
import { BrowserRouter as Router, Route, useParams} from 'react-router-dom';
import axios from 'axios';

import GlobalStyle from '../globalStyles.js'
import Overview from './Overview/Overview.jsx';
import QuestionAnswer from './QuestionsAndAnswers/questionAnswer.jsx';
import RelatedProductsWidget from './related-products-widget.jsx';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating.jsx';

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
      product_id: 64620
    }

    this.handleSortOptionChange = this.handleSortOptionChange.bind(this);
    this.voteForReview = this.voteForReview.bind(this);
  }

  componentDidMount() {
    const {product_id} = userParams();
    console.log('product id', product_id);
    this.setState({
      product_id: id
    })

    axios(`/overview/${this.state.product_id}`)
    .then(({data})=>{
      console.log(data);
      this.setState({
        overview: data
      })
    });

    axios(`/reviews?product_id=${this.state.product_id}&sort=${this.state.sort}&count=500`)
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
      <Router>
        <Route path="/products/:product_id">
          <GlobalStyle />
          {Object.keys(this.state.overview).length > 0 && <Overview data={this.state.overview} ratings={this.state.meta.ratings}/>}
          <RelatedProductsWidget products={this.state.relatedProducts}/>
          <ReviewAndRating
            meta={this.state.meta}
            reviews={this.state.reviews}
            handleSortOptionChange={this.handleSortOptionChange}
            voteForReview={this.voteForReview}
          />
        </Route>
      </Router>
    );
  }
}