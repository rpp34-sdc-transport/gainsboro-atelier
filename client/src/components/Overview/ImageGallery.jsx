import React, {useRef} from 'react';
import ExpandedView from './ExpandedView.jsx';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";

const thumbnailHeight = 48;
const thumbnailBottom = 4;
const thumbnailsHeight = 5 * (thumbnailHeight + thumbnailBottom);

const Gallery = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  height: 600px;
  width: auto;
  overflow: hidden;
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

const ThumbnailsView = styled.div`
  height: ${`${thumbnailsHeight}px`};
  overflow: hidden;
`;

const ThumbnailsWrapper = styled.div`
  margin-top: ${props => props.offset}px;
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
`;

const ThumbnailWrapperActive = styled.div`
  border-radius: 4px;
  border: 2px solid red;
  width: 48px;
  height: 48px;
  overflow: hidden;
  margin-bottom: 4px;
`;

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      modalIsOpen: false
    }

    this.changeImage = this.changeImage.bind(this);
    this.imageBack = this.imageBack.bind(this);
    this.imageForward = this.imageForward.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  changeImage(e){
    console.log(e.currentTarget);
    console.log(e.target.getAttribute('value'));
    const currentIndex = parseInt(e.target.getAttribute('value')) || parseInt(e.currentTarget.getAttribute('value'));
    this.setState({
      currentIndex: currentIndex
    })
  }

  imageBack(){
    if (this.state.currentIndex > 0) {
      this.setState((prevState)=> ({
        currentIndex: prevState.currentIndex - 1
      }));
    }
  }

  imageForward(){
    if (this.state.currentIndex < this.props.photos.length - 1) {
      this.setState((prevState)=> ({
        currentIndex: prevState.currentIndex + 1
      }));
    }
  }

  toggleModal(){
    this.setState((prevState)=>({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }

  render() {
    const {currentStyle, photos} = this.props;
    const thumbnails = photos.map((photo, index) => (
      index === this.state.currentIndex ? (
      <ThumbnailWrapperActive key={index} onClick={this.changeImage} >
        <ImgThumbnail src={photo.thumbnail_url} value={index}/>
      </ThumbnailWrapperActive>
      ) : (
      <ThumbnailWrapper key={index} onClick={this.changeImage} >
        <ImgThumbnail src={photo.thumbnail_url} value={index}/>
      </ThumbnailWrapper>
      )
    ));

    const thumbnailsOffset = this.state.currentIndex > 4 ? -(this.state.currentIndex - 4) * (thumbnailHeight + thumbnailBottom) : 0;

    console.log ('offset', thumbnailsOffset);
    let nextImage, previousImage, nextThumbnail, previousThumbnail;

    return (
      <Gallery>
        <ThumbnailsSection>
          <ThumbnailsView>
            <ThumbnailsWrapper offset={thumbnailsOffset}>
              {thumbnails}
            </ThumbnailsWrapper>
          </ThumbnailsView>
          {this.state.currentIndex > 0 &&
          <ImageButton onClick={this.imageBack}><MdOutlineExpandLess/></ImageButton>}
          {this.state.currentIndex < photos.length -1 &&
          <ImageButton onClick={this.imageForward}><MdOutlineExpandMore/></ImageButton>}
        </ThumbnailsSection>
        <ImageWrapper>
          {this.state.currentIndex > 0 &&
            <ImageButton onClick={this.imageBack}><MdChevronLeft/></ImageButton>
          }
          {this.state.currentIndex < photos.length -1 &&
          <ImageButton onClick={this.imageForward}>
            <MdChevronRight/>
          </ImageButton>
          }
          <Img onClick={this.toggleModal} src={photos[this.state.currentIndex]['url']}/>
        </ImageWrapper>
        {this.state.modalIsOpen &&
          <ExpandedView
            currentIndex={this.state.currentIndex}
            changeImage={this.changeImage}
            imageCount={photos.length}
            imageBack={this.imageBack}
            imageForward={this.imageForward}
            toggleModal={this.toggleModal}
            url={photos[this.state.currentIndex]['url']}>
          </ExpandedView>
        }
      </Gallery>
    );
  }
}