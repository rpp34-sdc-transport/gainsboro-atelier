import React, { useState } from 'react';

import styled from 'styled-components';
import { MdCheck } from "react-icons/md";

const Styles = styled.div`
  display: flex;
  flex-wrap: wrap;
  position:  relative;
  width: 350px;
`;

const Style = styled.div`
  width: 64px;
  margin-right: 16px;
  margin-bottom: 16px;
  margin-top: 0px;
  position: relative;

`;

const ThumbnailWrapper = styled.div`
  & {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    overflow: hidden;
  }

  &:hover {
    opacity: ${props => props.selected ? '1' : '0.7'};
    cursor: ${props => props.selected ? 'default' : 'pointer'}
  }

  &:active {
    outline: 4px solid var(--color-brand-200);
  }
`;

const Img = styled.img`
  width: ${props => (props.landscapeOrientation ? 'auto': '64px')};
  height: ${props => (props.landscapeOrientation ? '64px' : 'auto')};
  overflow: hidden;
`;

const Selected = styled.div`
  border-radius: 50%;
  background-color: white;
  width: 16px;
  height: 16px;
  position: absolute;
  display: inline;
  top: 0px;
  right: 0px
`;

export default function StyleSelector ({changeStyle, changeStylePrice, currentStyle, styles}) {
  const [landscapeOrientations, setLandscapeOrientation] = useState([]);

  const styleThumbnails = styles.map((style, index)=> (
    <Style
      aria-label={"style option"}
      role={"style-option"}
      aria-selected={index === currentStyle ? true : false}
      key={style.style_id}
      tabIndex={0}
      onKeyPress={(event)=>{
        if (event.key === 'Enter') {
          changeStyle(index);
          changeStylePrice(index);
        }
      }}
      onClick={()=>{changeStyle(index); changeStylePrice(index);}}
    >
      <ThumbnailWrapper
        selected={index === currentStyle ? true : false}
      >
        <Img
          alt={`product style ${index}`}
          src={style['photos'][0]['thumbnail_url']}
          landscapeOrientation={landscapeOrientations[index] || false}
          onLoad={(e)=>{
            let landscape = e.target.offsetWidth > e.target.offsetHeight ? true : false;
            let orientations = [...landscapeOrientations];
            orientations[index] = landscape;
            setLandscapeOrientation(orientations);
          }}
        />
        {index === currentStyle && <Selected aria-label='selected style' role='selected-style'><MdCheck/></Selected>}
      </ThumbnailWrapper>
    </Style>
  ));

  return (
    <div>
      <h6><strong>Style: </strong>{styles[currentStyle]['name']}</h6>
      <Styles>
        {styleThumbnails}
      </Styles>
    </div>
  )
}