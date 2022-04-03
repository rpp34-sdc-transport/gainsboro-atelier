import React from 'react';
import {FaCheck, FaPlus} from "react-icons/fa";


export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews, sort} = this.props;
    return (
      <div>
        <h3>{reviews.length} reviews{reviews.length ? `, sorted by ${sort}` : '.'}</h3>
        {reviews.length && reviews.map(review => {
          const {review_id, reviewer_name, summary, body, date, helpfulness, photos, rating, recommend, response} = review;
          const dateObj = new Date(date);
          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          var formatedDate = dateObj.toLocaleDateString('en-US', options);
          return (
            <div key={review_id}>
              <div>
                <h4>rating: {rating}</h4>
                <h4>{reviewer_name}, {formatedDate}</h4>
              </div>
              <h3>{summary}</h3>
              <p>{body}</p>
              {recommend? <h4><FaCheck /> I recommend this product</h4> : ''}
              {response ? <div><h4>Response</h4><p>{response}</p></div>: ''}
              <h4>Helpful? <a>Yes</a> ({helpfulness}) | <a>Report</a></h4>
            </div>
          )
        })}
        <button type="button">MORE REVIEWS</button>
        <button type="button">ADD A REVIEW <FaPlus /></button>
      </div>
    );
  }
}