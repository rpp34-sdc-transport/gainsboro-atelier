import React from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';
import SortMenu from './SortMenu.jsx';
import {FaPlus} from "react-icons/fa";

const Container = styled.div`
  padding-left:60px;
`;

export const Button = styled.button`
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
    this.state = {
      currReviewIndex: 2,
    }
    this.handleMoreReviewBtnClick = this.handleMoreReviewBtnClick.bind(this);
  }

  handleMoreReviewBtnClick() {
    this.setState(preState => ({currReviewIndex: preState.currReviewIndex + 2}))
  }

  render() {
    const {reviews, ratingFilter, handleSortOptionChange, voteForReview} = this.props;

    var filteredReivew = !ratingFilter.length ? reviews : reviews.filter(review => ratingFilter.includes(Number(review.rating)))

    var renderList = filteredReivew.slice(0, this.state.currReviewIndex);
    var restList = filteredReivew.slice(this.state.currReviewIndex);

    return (
      <Container>
        <h4>{reviews.length} reviews, sorted by {reviews.length ? <SortMenu handleSortOptionChange={handleSortOptionChange}/> : '.'}</h4>
        <ReviewList>
          {filteredReivew.length ?
            renderList.map((review, index) => <Review review={review} key={index} voteForReview={voteForReview}/> ) :
            <p>There is no review under current filters!</p>
          }
        </ReviewList>
        {restList.length > 0 && <Button type="button" onClick={this.handleMoreReviewBtnClick}>MORE REVIEWS</Button>}
        <Button type="button">ADD A REVIEW <FaPlus /></Button>
      </Container>
    );
  }
}