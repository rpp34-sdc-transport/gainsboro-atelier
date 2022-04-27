import React, {useRef} from 'react';
import ExpandedView from './ExpandedView.jsx';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";

const Gallery = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 32px;
`;

const ImageWrapper = styled.div`
  max-height: 50vw;
  max-width: 50vw;
  position: relative;
  overflow: hidden
`;

const Img = styled.div`
  &{
    border-radius: 4px;
    height: min(50vw, 600px);
    width: min(50vw, 600px);
    overflow: hidden;
    background-image: ${props => `url(${props.url})`};
    background-repeat: no-repeat;
    background-size: cover;
  }

  &:hover {
    cursor: zoom-in
  }
`;

const ImageButton = styled.div`
  &{
    border-radius: 4px;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255);
    border: var(--color-grey-100) solid 2px;];
    color: var(--color-grey-100);
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
    border-color: var(--color-grey-300);
    color: var(--color-grey-300);
  }
`;

// const ImageButtonDisabled = styled.div`
//   &{
//     border-radius: 4px;
//     width: 32px;
//     height: 32px;
//     background: #EBEBEB;
//     border: #949494 solid 2px;;
//     color: #949494;
//     margin-top: 8px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

const ImageButtonPlaceholder = styled.div`
    width: 32px;
    height: 32px;
    background: #FFF;
    margin-top: 8px;
    display: flex;
`;

const ViewArrow = styled.div`
  &{
    border-radius: 4px;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, .8);
    color: var(--color-grey-100);
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    border-color: var(--color-grey-300);
    color: var(--color-grey-300);
  }

`;


const ThumbnailsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  align-items: center;
`;

const thumbnailHeight = 48;
const thumbnailBottom = 18;
const countVisibleThumbnails = 7
const thumbnailsHeight = countVisibleThumbnails * (thumbnailHeight + thumbnailBottom);

const ThumbnailsView = styled.div`
  max-height: ${`${thumbnailsHeight}px`};
  overflow-x: visible;
  overflow-y: hidden;
`;

const ThumbnailsWrapper = styled.div`
  margin-top: ${props => props.offset}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: visible;
  transition: all .3s ease-in-out 0s;
`;

const ThumbnailWrapper = styled.div`
  & {
    border-radius: 4px;
    width: 48px;
    height: 48px;
    margin-bottom: 2px;
    overflow: hidden;
    background-image: ${props => `url(${props.url})`};
    background-repeat: no-repeat;
    background-size: cover;
  }

  ${'' /* &:focus {
    position: absolute;
    outline: 4px solid var(--color-brand-200) !important;
  } */}
`;

const ThumbnailActive = styled.div`
  margin-bottom: 12px;
`;

const ThumbnailActiveIndicator = styled.div`
  height: 4px;
  background: var(--color-brand-300);
  border-radius: 2px;
`;

const ThumbnailInactive = styled.div`
  & {
    margin-bottom: 16px;
    position: relative;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer
  }
`;


const ImageWrapperActive = styled.div`
  border-radius: 4px;
  width: 44px;
  height: 44px;
  overflow: hidden;
  margin: auto
`;

const UpArrow = styled(MdOutlineExpandLess)`
    height: 22px;
    width: 22px;
`;

const DownArrow = styled(MdOutlineExpandMore)`
    height: 22px;
    width: 22px;
`;

const LeftArrow = styled(MdChevronLeft)`
    height: 22px;
    width: 22px;
`;

const RightArrow = styled(MdChevronRight)`
    height: 22px;
    width: 22px;
`;

const ButtonArrowLeft = styled.div`
  position: absolute;
  top: min(calc(25vw - 24px), 276px);
`;

const ButtonArrowRight = styled.div`
  position: absolute;
  top: min(calc(25vw - 24px), 276px);
  right: 0px;
`;

const ImgThumbnail = styled.img`
  width: ${props => (props.landscapeOrientation ? 'auto': '64px')};
  height: ${props => (props.landscapeOrientation ? '64px' : 'auto')};
  overflow: hidden;
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
    this.keypressThumbnail = this.keypressThumbnail.bind(this);
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

  keypressThumbnail(e){
    const currentIndex = parseInt(e.target.getAttribute('value')) || parseInt(e.currentTarget.getAttribute('value')) || 0;
    if (event.key === "Enter") {
      this.setState({
        currentIndex: currentIndex
      })
    }
  }

  toggleModal(){
    this.setState((prevState)=>({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }

  render() {
    const {currentStyle, photos} = this.props;
    console.log('thumbs', photos);
    const thumbnails = photos.map((photo, index) => {
      return (
      index === this.state.currentIndex ? (
      <ThumbnailActive>
        <ThumbnailWrapper key={photo.url} url={photo.thumbnail_url} value={index} />
        <ThumbnailActiveIndicator/>
      </ThumbnailActive>
      ) : (
      <ThumbnailInactive>
        <ThumbnailWrapper tabIndex="0" onKeyPress={this.keypressThumbnail} key={photo.url} onClick={this.changeImage} url={photo.thumbnail_url} value={index} />
      </ThumbnailInactive>
      )
    )});

    const thumbnailsOffset = this.state.currentIndex >= countVisibleThumbnails ? -(this.state.currentIndex - countVisibleThumbnails + 1) * (thumbnailHeight + thumbnailBottom) : 0;

    let nextImage, previousImage, nextThumbnail, previousThumbnail;

    return (
      <Gallery>
        <ThumbnailsSection>
          <ThumbnailsView>
            <ThumbnailsWrapper offset={thumbnailsOffset}>
              {thumbnails}
            </ThumbnailsWrapper>
          </ThumbnailsView>
          {this.state.currentIndex > 0 ?
          <ImageButton onClick={this.imageBack}><UpArrow/></ImageButton> :
          <ImageButtonPlaceholder></ImageButtonPlaceholder>}
          {this.state.currentIndex < photos.length -1 &&
          <ImageButton onClick={this.imageForward}><DownArrow/></ImageButton>}
        </ThumbnailsSection>
        <ImageWrapper>
          {this.state.currentIndex > 0 &&
            <ButtonArrowLeft>
              <ViewArrow onClick={this.imageBack}><LeftArrow/></ViewArrow>
            </ButtonArrowLeft>
          }
          {this.state.currentIndex < photos.length -1 &&
          <ButtonArrowRight>
            <ViewArrow onClick={this.imageForward}>
              <RightArrow/>
            </ViewArrow>
          </ButtonArrowRight>
          }
          <Img onClick={this.toggleModal} url={photos[this.state.currentIndex]['url']}/>
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