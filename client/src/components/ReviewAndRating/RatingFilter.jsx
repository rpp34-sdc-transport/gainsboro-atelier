import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 0;
`;

const Button = styled.button`
  border: none;
  background-color: Transparent;
  text-decoration: underline;
`;

const BarBtm = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 20px;
  height: 10px;
  width: 200px;
  background-color: #ebebeb;
`;

const BarTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${props => props.barWidth}%;
  height: 10px;
  background-color: #ffc107;
`;

export default function RatingFilter({ratings}) {
  var ratingCounts = Object.values(ratings).reduce((sum, rating) => sum + Number(rating), 0);
  return (
    <div>
      {[5, 4, 3, 2, 1].map(num =>
        <Wrapper key={num}>
          <Button type="button">{num} stars</Button>
          <BarBtm>
            <BarTop barWidth={Math.round((Number(ratings[num]) / ratingCounts) * 100)}></BarTop>
          </BarBtm>
          <span>{ratings[num]}</span>
        </Wrapper>
        )}
    </div>
  )
}