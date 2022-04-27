import React from 'react';
import styled from 'styled-components';
import Reviews from './Reviews.jsx';
import Rating from './Rating.jsx';

const WidgetContainer = styled.div`
  border: 1px solid red;
  padding: 0 80px;
  margin-bottom: 64px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
    const {product_id, productName, meta, reviews, handleMoreReviewBtnClick, moreReviewBtn, handleSortOptionChange, voteForReview, fetchDataAfterSubmittingNewReview} = this.props;
    return (
      <WidgetContainer>
        <h5>RATINGS & REVIEWS</h5>
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
            product_id={product_id}
            productName={productName}
            reviews={reviews}
            characteristics={meta.characteristics}
            ratingFilter={this.state.ratingFilter}
            handleMoreReviewBtnClick={handleMoreReviewBtnClick}
            moreReviewBtn={moreReviewBtn}
            handleSortOptionChange={handleSortOptionChange}
            voteForReview={voteForReview}
            fetchDataAfterSubmittingNewReview={fetchDataAfterSubmittingNewReview}
          />
        </Container>
      </WidgetContainer>
    )
  }
}