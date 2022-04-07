import React from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';
import SortMenu from './SortMenu.jsx';
import {FaPlus} from "react-icons/fa";

const Container = styled.div`
  padding-left:60px;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid #d4d4d4;
  color: #525252;
  padding: 15px 30px;
  margin-right: 40px;
`;

const ReviewList = styled.div`
  width: 800px;
  max-height: 600px;
  overflow: scroll;
  border: 1px solid #ebebeb;
  margin-bottom: 20px;
  padding: 40px;
`

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews, sort, moreReviewBtn, handleMoreReviewBtnClick, handleSortOptionChange, voteForReview} = this.props;
    return (
      <Container>
        <h3>{reviews.length} reviews, sorted by {reviews.length ? <SortMenu sort={sort} handleSortOptionChange={handleSortOptionChange}/> : '.'}</h3>
        <ReviewList>
          {reviews.length && reviews.map((review, index) => <Review review={review} key={index} voteForReview={voteForReview}/> )}
        </ReviewList>
        {moreReviewBtn && <Button type="button" onClick={handleMoreReviewBtnClick}>MORE REVIEWS</Button>}
        <Button type="button">ADD A REVIEW <FaPlus /></Button>
      </Container>
    );
  }
}