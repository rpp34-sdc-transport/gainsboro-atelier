import React from 'react';
import styled from 'styled-components';
import Reviews from './Reviews.jsx';

const Container = styled.div`
  display: flex;
`;

export default class ReviewAndRating extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews, sort, handleMoreReviewBtnClick, moreReviewBtn, handleSortOptionChange, voteForReview} = this.props;
    return (
      <div>
        <h2>RATINGS & REVIEWS</h2>
        <Container>
          <div>meta data</div>
          <Reviews
            reviews={reviews}
            sort={sort}
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