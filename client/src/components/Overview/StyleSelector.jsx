import React from 'react';
import styled from 'styled-components';
import {MdCheck} from "react-icons/md";

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
  width: ${props => (props.landscapeOrientation ? '64px' : 'auto')};
  height: ${props => (props.landscapeOrientation ? 'auto': '64px')};
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

  // console.log('styles: ', styles);


  const styleThumbnails = styles.map((style, index)=> {
    let selected;
    let imageUrl = style['photos'][0]['thumbnail_url'];
    if (index === currentStyle) {
      selected = <Selected>
        <MdCheck/>
      </Selected>;
    }

    // let getImageDimensions = ()=>{
    //   return new Promise ((resolve, reject)=>{
    //         let img = new Image();
    //         img.src = imageUrl;
    //         img.onload = () => resolve([img.height, img.width]);
    //         img.onerror = reject;
    //   });
    // };

    // const dimensions = await getImageDimensions();
    // console.log('dimensions', dimensions);

    let landscapeOrientation = true;


    // const load = await img.onload = () => {
    //   console.log('image height', img.height);
    //   console.log('image width', img.width);
    //   if (img.height > img.width) {
    //     landscapeOrientation = false;
    //   }
    //   console.log('landscape orientation: ', landscapeOrientation);
    // };

    return (
      <Style
        onClick={()=>{changeStyle(index)}}
        key={style.style_id}
      >
        <ThumbnailWrapper>
          <Img
            src={imageUrl}
            landscapeOrientation={landscapeOrientation}
            onLoad={(e)=>{
              // console.log('event: ', e);
              // let landscape = e.target.offsetWidth > e.target.offsetHeight ? true : false;
              // console.log('landscape orientation', landscape);
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