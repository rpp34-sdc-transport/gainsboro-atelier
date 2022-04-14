import React from 'react';
import StarRating from './StarRating.jsx';
import RatingFilter from './RatingFilter.jsx';
import RatingFilterList from './RatingFilterList.jsx';
import Characters from './Characters.jsx';

export default function Rating({meta, ratingFilterList, handleStarRatingClick}) {
  const {characteristics, ratings, recommended} = meta;
  const aveRecommend = Number(recommended.true) / (Number(recommended.true) + Number(recommended.false));
  const aveRePct = Math.round(aveRecommend * 100);
  return (
    <div>
      <StarRating ratings={ratings} showAve={true}/>
      <p>{aveRePct}% of reviews recommend this product</p>
      <RatingFilter ratings={ratings} handleStarRatingClick={handleStarRatingClick}/>
      {!ratingFilterList.length ? '' : <RatingFilterList ratingFilterList={ratingFilterList}/>}
      <Characters characteristics={characteristics}/>
    </div>
  )
}