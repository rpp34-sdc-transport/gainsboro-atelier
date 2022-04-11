import React, {useRef} from 'react';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";

const Gallery = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  height: 600px;
  width: auto;
  overflow: hidden;

  &:hover {
    cursor: zoom-in
  }
`;

const ImageButton = styled.button`
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.6);
`;

const ImgThumbnail = styled.img`
  width: 64px;
  height: auto;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Thumbnails = styled.div`
  flex-direction: column;
  height: 250px;
  overflow: hidden;
`;

const ThumbnailsSection = styled.div`
  flex-direction: column;
  margin-right: 12px;
`;

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

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    }

    this.changeImage = this.changeImage.bind(this);
    this.imageBack = this.imageBack.bind(this);
    this.imageForward = this.imageForward.bind(this);
  }

  changeImage(e){
    console.log(e.target.getAttribute('value'));
    this.setState({
      currentImage: parseInt(e.target.getAttribute('value'))
    })
  }

  imageBack(){
    if (this.state.currentImage > 0) {
      this.setState((prevState)=> ({
        currentImage: prevState.currentImage - 1
      }));
    }
  }

  imageForward(){
    if (this.state.currentImage < this.props.photos.length - 1) {
      this.setState((prevState)=> ({
        currentImage: prevState.currentImage + 1
      }));
    }
  }

  render() {
    const {currentStyle, photos} = this.props;
    const thumbnails = photos.map((photo, index) => (
      index === this.state.currentImage ? (
      <ThumbnailWrapperActive key={index} onClick={this.changeImage} >
        <ImgThumbnail src={photo.thumbnail_url} value={index}/>
      </ThumbnailWrapperActive>
      ) : (
      <ThumbnailWrapper key={index} onClick={this.changeImage} >
        <ImgThumbnail src={photo.thumbnail_url} value={index}/>
      </ThumbnailWrapper>
      )
    ));

    let nextImage, previousImage, nextThumbnail, previousThumbnail;

    return (
      <Gallery>
        <ThumbnailsSection>
          <Thumbnails>
            {thumbnails}
          </Thumbnails>
          {this.state.currentImage > 0 &&
          <ImageButton onClick={this.imageBack}><MdOutlineExpandLess/></ImageButton>}
          {this.state.currentImage < photos.length -1 &&
          <ImageButton onClick={this.imageForward}><MdOutlineExpandMore/></ImageButton>}
        </ThumbnailsSection>
        <ImageWrapper>
          {this.state.currentImage > 0 &&
          <ImageButton onClick={this.imageBack}><MdChevronLeft/></ImageButton>}
          {this.state.currentImage < photos.length -1 &&
          <ImageButton onClick={this.imageForward}><MdChevronRight/></ImageButton>}
          <Img src={photos[this.state.currentImage]['url']}/>
        </ImageWrapper>
      </Gallery>
    );
  }
}