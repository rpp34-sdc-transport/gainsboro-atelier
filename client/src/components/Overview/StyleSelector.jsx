import React from 'react';
import styled from 'styled-components';
import {MdCheck} from "react-icons/md";

const Styles = styled.div`
  display: flex;
  flex-wrap: wrap
  position:  relative
`;

const Style = styled.div`
  margin: 8px;
  position: relative;
`;

const ThumbnailWrapper = styled.div`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  }
`;

const Img = styled.img`
  width: 64px;
  height: auto;
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

  console.log('styles: ', styles);
  const styleThumbnails = styles.map((style, index)=> {
    let styleSelect;
    let selected;
    if (index === currentStyle) {
      selected = <Selected>
        <MdCheck/>
      </Selected>;
    }

    return <Style onClick={()=>{changeStyle(index)}}>
      <ThumbnailWrapper>
        <Img src={style['photos'][0]['thumbnail_url']}/>
        {selected}
      </ThumbnailWrapper>
    </Style>

    return styleSelect;
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