import React from 'react';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdOutlineClose} from "react-icons/md";

const Modal = styled.div`
  ${'' /* display: ${props => props.showModal}; */}
  background-color: rgba(255,255,255,0.9);
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
`;

const CarouselIndicatorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const closeButton = styled.div`
  width: 40px;
  height: 40px;
`;

const CarouselIndicatorWrapper = styled.div`
  width: 40px;
  height: 40px;
  z-index: 2;
`;

const CarouselIndicatorActive = styled.div`
  background-color: rgba(0, 0, 0,0.8);
  width: 12px;
  height: 12px;
  top: 0;
  border-radius: 50%;
  margin: 0;
  position: relative;
  left: 50%;
  top: 50%;
  z-index: 1;
`;

const CarouselIndicatorInactive = styled.div`
  background-color: rgba(0, 0, 0,0.2);
  width: 12px;
  height: 12px;
  top: 0;
  border-radius: 50%;
  margin: 0;
  position: relative;
  left: 50%;
  top: 50%;
  z-index: 1;
`;

const ImageButton = styled.button`
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.6);
`;

const ImgWrapper = styled.div`

  height: calc(100vh - 60px);
  width: auto;

  &:hover {
    cursor: zoom-in
  }
`;

const Img = styled.img`
  object-fit: contain;
    max-height: 100%;
    max-width: 100%;
`;


const ImgZoom = styled.div`
  ${props => `background-position: ${props.positionX}px ${props.positionY}px`};
  background-repeat: no-repeat;
  background-image: url(${props => props.url});
  ${props => `background-size: ${props.windowHeight * 2.5}px auto`};
  height: 100%;
  overflow: hidden;
  width: auto;

  &:hover {
    cursor: zoom-out
  }
`;

export default class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      landscapeOrientation: null,
      positionX: 0,
      positionY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      zoom: false
    }

    this.escFunction = this.escFunction.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
    document.body.style.overflow = 'hidden';
    document.getElementById('app').style.overflow = 'hidden';
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
    document.getElementById('app').style.overflow = 'unset';
    document.body.style.overflow = 'unset';
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  escFunction(event){
    if (event.key === "Escape") {
      this.props.toggleModal();
    }
  }

  mouseMove(event){
    console.log('x percentage: ', (event.clientX / this.state.windowWidth));
    console.log('diff width: ', (this.state.imageWidth * 2.5) - this.state.windowWidth);
    console.log('newpositionx: ', -(event.clientX / this.state.windowWidth) * ((this.state.imageWidth * 2.5) - this.state.windowWidth));

    this.setState({
      positionX: -(event.clientX / this.state.windowWidth) * ((this.state.imageWidth * 2.5) - this.state.windowWidth),
      positionY: -event.clientY *2.5
    })
  }

  onImageLoad({target: image}){
    const {offsetHeight: imageHeight, offsetWidth: imageWidth} = image;
    const landscapeOrientation = imageWidth > imageHeight ? true : false;

    this.setState({
      imageWidth: imageWidth,
      imageHeight: imageHeight,
      landscapeOrientation: landscapeOrientation,
    });
  }

  toggleZoom(){
    this.setState((prevState)=>({
      zoom: !prevState.zoom
    }));
  }

  updateWindowDimensions(){
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  render(){
    const {currentIndex, changeImage, imageCount, imageBack, imageForward, toggleModal, url} = this.props;

    let carouselIndicators = [];
    for (let i = 0; i < imageCount; i++) {
      if (i === currentIndex) {
        carouselIndicators.push(
          <CarouselIndicatorWrapper>
            <CarouselIndicatorActive>
            </CarouselIndicatorActive>
          </CarouselIndicatorWrapper>
        );
      } else {
        carouselIndicators.push(
          <CarouselIndicatorWrapper onClick={changeImage} value={i}>
            <CarouselIndicatorInactive>
            </CarouselIndicatorInactive>
          </CarouselIndicatorWrapper>
        );
      }
    }

    const content = !this.state.zoom ? [
    <CarouselIndicatorsWrapper>
      {carouselIndicators}
    </CarouselIndicatorsWrapper>,
    <ImageButton onClick={imageBack}><MdChevronLeft/></ImageButton>,
    <ImageButton onClick={imageForward}><MdChevronRight/></ImageButton>,
    <closeButton onClick={toggleModal}><MdOutlineClose/></closeButton>,
    <ImgWrapper onClick={this.toggleZoom} url={url}>
      <Img onLoad={this.onImageLoad} src={url}></Img>
    </ImgWrapper>
    ] : [
    <ImgZoom
      onClick={this.toggleZoom}
      onLoad={()=>{console.log('LOADED!')}}
      onMouseMove={this.mouseMove}
      positionX={this.state.positionX}
      positionY={this.state.positionY}
      url={url}
      windowWidth={this.state.windowWidth}
      windowHeight={this.state.windowHeight}
    >
    </ImgZoom>
    ];

    return (
      <Modal>
        {content}
      </Modal>
    );
  }
}