import React, {useRef} from 'react';
import ExpandedView from './ExpandedView.jsx';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";

const thumbnailHeight = 48;
const thumbnailBottom = 4;
const countVisibleThumbnails = 7
const thumbnailsHeight = countVisibleThumbnails * (thumbnailHeight + thumbnailBottom);

const Gallery = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 24px;
`;

const Img = styled.img`
  height: 600px;
  width: auto;
  overflow: hidden;
`;

const ImageWrapper = styled.div`

  justify-content: center;
  max-height: 50vw;
  max-width: 50vw;
  overflow: hidden
`;

const ImageButton = styled.button`
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.6);
`;

const ImgThumbnail = styled.img`
  width: ${props => (props.landscapeOrientation ? 'auto': '64px')};
  height: ${props => (props.landscapeOrientation ? '64px' : 'auto')};
  overflow: hidden;
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
      landscapeOrientations: [],
      modalIsOpen: false
    }

    this.changeImage = this.changeImage.bind(this);
    this.imageBack = this.imageBack.bind(this);
    this.imageForward = this.imageForward.bind(this);
    this.loadLandscapeOrientation = this.loadLandscapeOrientation.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  changeImage(e){
    const currentIndex = parseInt(e.target.getAttribute('value')) || parseInt(e.currentTarget.getAttribute('value')) || 0;
    this.setState({
      currentIndex: currentIndex
    })
  }

  loadLandscapeOrientation(e, index){
    let landscape = e.target.offsetWidth > e.target.offsetHeight ? true : false;
    let orientations = this.state.landscapeOrientations;
    orientations[index] = landscape;
    this.setState({
      landscapeOrientations: orientations
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
    const thumbnails = photos.map((photo, index) => {
      return (
      index === this.state.currentIndex ? (
      <ThumbnailWrapperActive key={index}>
        <ImgThumbnail
          landscapeOrientation={this.state.landscapeOrientations[index] || false}
          onLoad={(e)=>{
            this.loadLandscapeOrientation(e, index);}}
          src={photo.thumbnail_url}
          value={index}
        />
      </ThumbnailWrapperActive>
      ) : (
      <ThumbnailWrapper key={index} onClick={this.changeImage} >
        <ImgThumbnail
          landscapeOrientation={this.state.landscapeOrientations[index] || false}
          onLoad={(e)=>{
            this.loadLandscapeOrientation(e, index);}}
          src={photo.thumbnail_url}
          value={index}
        />
      </ThumbnailWrapper>
      )
    )});

    const thumbnailsOffset = this.state.currentIndex >= countVisibleThumbnails ? -(this.state.currentIndex - countVisibleThumbnails -1) * (thumbnailHeight + thumbnailBottom) : 0;

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