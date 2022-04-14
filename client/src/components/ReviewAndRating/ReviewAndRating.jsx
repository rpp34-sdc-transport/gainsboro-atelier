import React from 'react';
import styled from 'styled-components';
import Reviews from './Reviews.jsx';
import Rating from './Rating.jsx';

const Container = styled.div`
  display: flex;
`;

export default class ReviewAndRating extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ratingFilter: []
    }
    this.handleStarRatingClick = this.handleStarRatingClick.bind(this);
  }

  handleStarRatingClick(rating) {
    this.setState(preState => ({
      ratingFilter: [...preState.ratingFilter, rating]
    }))
  }

  render() {
    const {meta, reviews, sort, handleMoreReviewBtnClick, moreReviewBtn, handleSortOptionChange, voteForReview} = this.props;
    return (
      <div>
        <h2>RATINGS & REVIEWS</h2>
        <Container>
          {Object.keys(meta).length && <Rating meta={meta} ratingFilterList={this.state.ratingFilter} handleStarRatingClick={this.handleStarRatingClick}/>}
          <Reviews
            reviews={reviews}
            sort={sort}
            ratingFilter={this.state.ratingFilter}
            handleMoreReviewBtnClick={handleMoreReviewBtnClick}
            moreReviewBtn={moreReviewBtn}
            handleSortOptionChange={handleSortOptionChange}
            voteForReview={voteForReview}
          />
        </Container>
      </div>
    )
  }
}