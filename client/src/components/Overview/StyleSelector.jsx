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
  margin: 8px;
  position: relative;
`;

const ThumbnailWrapper = styled.div`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  overflow: hidden;
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

export default function StyleSelector ({changeStyle, currentStyle, styles}) {
  const [landscapeOrientations, setLandscapeOrientation] = useState([]);

  const styleThumbnails = styles.map((style, index)=> {
    let selected;
    let imageUrl = style['photos'][0]['thumbnail_url'];
    if (index === currentStyle) {
      selected = <Selected><MdCheck/></Selected>;
    }

    return (
      <Style
        onClick={()=>{changeStyle(index)}}
        key={style.style_id}
      >
        <ThumbnailWrapper>
          <Img
            src={imageUrl}
            landscapeOrientation={landscapeOrientations[index] || false}
            onLoad={(e)=>{
              let landscape = e.target.offsetWidth > e.target.offsetHeight ? true : false;
              let orientations = [...landscapeOrientations];
              orientations[index] = landscape;
              setLandscapeOrientation(orientations);
            }}
          />
          {selected}
        </ThumbnailWrapper>
      </Style>
    )
  });

  return (
    <div>
      <p>Current style: {styles[currentStyle]['name']}</p>
      <Styles>
        {styleThumbnails}
      </Styles>
    </div>
  )
}