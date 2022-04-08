import React from 'react';
import StarRating from './StarRating.jsx';

export default function Rating({meta}) {
  const {characteristics, ratings, recommended} = meta;
  const aveRecommend = Number(recommended.true) / (Number(recommended.true) + Number(recommended.false));
  const aveRePct = Math.round(aveRecommend * 100);
  return (
    <div>
      <StarRating ratings={ratings} showAve={true}/>
      <h4>{aveRePct}% of reviews recommend this product</h4>

    </div>
  )
}