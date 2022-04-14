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
    this.handleRemoveStarRatingClick = this.handleRemoveStarRatingClick.bind(this);
    this.handleRemoveAllFiltersClick = this.handleRemoveAllFiltersClick.bind(this);
  }

  handleStarRatingClick(rating) {
    this.setState(preState => ({
      ratingFilter: preState.ratingFilter.includes(rating) ? preState.ratingFilter : [...preState.ratingFilter, rating]
    }))
  }

  handleRemoveStarRatingClick(rating) {
    this.setState(preState => ({
      ratingFilter: preState.ratingFilter.filter(filter => filter !== rating)
    }))
  }

  handleRemoveAllFiltersClick() {
    this.setState({ratingFilter: []})
  }

  render() {
    const {meta, reviews, handleMoreReviewBtnClick, moreReviewBtn, handleSortOptionChange, voteForReview} = this.props;
    return (
      <div>
        <h2>RATINGS & REVIEWS</h2>
        <Container>
          {Object.keys(meta).length &&
            <Rating
              meta={meta}
              ratingFilterList={this.state.ratingFilter}
              handleStarRatingClick={this.handleStarRatingClick}
              handleRemoveStarRatingClick={this.handleRemoveStarRatingClick}
              handleRemoveAllFiltersClick={this.handleRemoveAllFiltersClick}
            />}
          <Reviews
            reviews={reviews}
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