import React from 'react';
import styled from 'styled-components';

const ThumbnailWrapper = styled.div`
  border-radius: 4px;
  width: 48px;
  height: 48px;
  overflow: hidden;
  margin-bottom: 4px;
  }
`;

const ThumbnailWrapperActive = styled.div`
  border-radius: 4px;
  border: 2px solid red;
  width: 48px;
  height: 48px;
  overflow: hidden;
  margin-bottom: 4px;
  }
`;

const ImgThumbnail = styled.img`
  width: 64px;
  height: auto;
  overflow: hidden;
`;



export default function ImageThumbnail ({active, index, changeImage, src}) {
  return (
    active ? (
      <ThumbnailWrapperActive onClick={changeImage} >
        <ImgThumbnail src={src} value={index}/>
      </ThumbnailWrapperActive>
    ) : (
      <ThumbnailWrapper onClick={changeImage} >
        <ImgThumbnail src={src} value={index}/>
      </ThumbnailWrapper>
    )
  )
}