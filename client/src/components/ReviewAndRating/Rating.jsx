import React from 'react';
import StarRating from './StarRating.jsx';
import Characters from './Characters.jsx';

export default function Rating({meta}) {
  const {characteristics, ratings, recommended} = meta;
  const aveRecommend = Number(recommended.true) / (Number(recommended.true) + Number(recommended.false));
  const aveRePct = Math.round(aveRecommend * 100);
  return (
    <div>
      <StarRating ratings={ratings} showAve={true}/>
      <p>{aveRePct}% of reviews recommend this product</p>
      <Characters characteristics={characteristics}/>
    </div>
  )
}