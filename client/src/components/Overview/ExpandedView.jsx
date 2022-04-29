import React from 'react';
import styled from 'styled-components';
import {MdChevronLeft, MdChevronRight, MdFullscreenExit} from "react-icons/md";
import throttle from 'lodash.throttle';

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  width: 1280px;
  margin: auto;
  background-color: #FFF;
  ${'' /* background-color: rgba(255,255,255,0.9);
  width: 100%;
  height: 100vh;
  overflow: hidden;
   */}
`;

const Content=styled.div`
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const CarouselIndicatorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CarouselIndicatorWrapper = styled.div`
  & {width: 48px;
  height: 48px;
  background-color: #FFF;
  z-index: 2;}

  &:hover {
    cursor: pointer;
  }
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
  & {
    height: min(50vw, 600px);
    width: min(100vw, var(--space-div-xl));
    position: relative;
    cursor: url("data:image/svg+xml,%3Csvg%20width%3D%2219%22%20height%3D%2219%22%20viewBox%3D%220%200%2019%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_1964_50162)%22%3E%0A%3Ccircle%20cx%3D%229.5%22%20cy%3D%229.5%22%20r%3D%229.5%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.0251%209.50001C18.0251%2014.2082%2014.2083%2018.025%209.5001%2018.025V19.025C14.7606%2019.025%2019.0251%2014.7605%2019.0251%209.50001H18.0251ZM9.5001%2018.025C4.79187%2018.025%200.975098%2014.2082%200.975098%209.50001H-0.0249023C-0.0249023%2014.7605%204.23959%2019.025%209.5001%2019.025V18.025ZM0.975098%209.50001C0.975098%204.79178%204.79187%200.975006%209.5001%200.975006V-0.0249939C4.23959%20-0.0249939%20-0.0249023%204.23949%20-0.0249023%209.50001H0.975098ZM9.5001%200.975006C14.2083%200.975006%2018.0251%204.79178%2018.0251%209.50001H19.0251C19.0251%204.23949%2014.7606%20-0.0249939%209.5001%20-0.0249939V0.975006ZM9.0001%204.98751V9.50002H10.0001V4.98751H9.0001ZM9.0001%209.50002V14.0125H10.0001V9.50002H9.0001ZM4.98775%2010L9.5001%2010L9.5001%209.00002L4.98774%209.00003L4.98775%2010ZM9.5001%2010L14.0126%2010L14.0126%209.00001L9.5001%209.00002L9.5001%2010Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_1964_50162%22%3E%0A%3Crect%20width%3D%2219%22%20height%3D%2219%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"), auto;
  }

  &:hover {
    cursor: url("data:image/svg+xml,%3Csvg%20width%3D%2219%22%20height%3D%2219%22%20viewBox%3D%220%200%2019%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_1964_50162)%22%3E%0A%3Ccircle%20cx%3D%229.5%22%20cy%3D%229.5%22%20r%3D%229.5%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.0251%209.50001C18.0251%2014.2082%2014.2083%2018.025%209.5001%2018.025V19.025C14.7606%2019.025%2019.0251%2014.7605%2019.0251%209.50001H18.0251ZM9.5001%2018.025C4.79187%2018.025%200.975098%2014.2082%200.975098%209.50001H-0.0249023C-0.0249023%2014.7605%204.23959%2019.025%209.5001%2019.025V18.025ZM0.975098%209.50001C0.975098%204.79178%204.79187%200.975006%209.5001%200.975006V-0.0249939C4.23959%20-0.0249939%20-0.0249023%204.23949%20-0.0249023%209.50001H0.975098ZM9.5001%200.975006C14.2083%200.975006%2018.0251%204.79178%2018.0251%209.50001H19.0251C19.0251%204.23949%2014.7606%20-0.0249939%209.5001%20-0.0249939V0.975006ZM9.0001%204.98751V9.50002H10.0001V4.98751H9.0001ZM9.0001%209.50002V14.0125H10.0001V9.50002H9.0001ZM4.98775%2010L9.5001%2010L9.5001%209.00002L4.98774%209.00003L4.98775%2010ZM9.5001%2010L14.0126%2010L14.0126%209.00001L9.5001%209.00002L9.5001%2010Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_1964_50162%22%3E%0A%3Crect%20width%3D%2219%22%20height%3D%2219%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"), auto;
  }
`;

const Img = styled.div`
  height: min(50vw, 600px);
  width: min(100vw, var(--space-div-xl));
  overflow: hidden;
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

// const ImgZoom = styled.div`
//   ${props => `background-position: ${props.positionX}px ${props.positionY}px`};
//   background-repeat: no-repeat;
//   background-image: url(${props => props.url});
//   ${props => `background-size: ${props.windowHeight * 2.5}px auto`};
//   height: min(50vw, 600px);
//   width: min(100vw, var(--space-div-xl));
//   overflow: hidden;

//   &:hover {
//     cursor: url("data:image/svg+xml,%3Csvg%20width%3D%2219%22%20height%3D%2219%22%20viewBox%3D%220%200%2019%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_1964_50170)%22%3E%0A%3Ccircle%20cx%3D%229.5%22%20cy%3D%229.5%22%20r%3D%229.5%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.0251%209.50001C18.0251%2014.2082%2014.2083%2018.025%209.5001%2018.025V19.025C14.7606%2019.025%2019.0251%2014.7605%2019.0251%209.50001H18.0251ZM9.5001%2018.025C4.79187%2018.025%200.975098%2014.2082%200.975098%209.50001H-0.0249023C-0.0249023%2014.7605%204.23959%2019.025%209.5001%2019.025V18.025ZM0.975098%209.50001C0.975098%204.79178%204.79187%200.975006%209.5001%200.975006V-0.0249939C4.23959%20-0.0249939%20-0.0249023%204.23949%20-0.0249023%209.50001H0.975098ZM9.5001%200.975006C14.2083%200.975006%2018.0251%204.79178%2018.0251%209.50001H19.0251C19.0251%204.23949%2014.7606%20-0.0249939%209.5001%20-0.0249939V0.975006ZM4.98775%2010L14.0126%2010L14.0126%209.00001L4.98774%209.00003L4.98775%2010Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_1964_50170%22%3E%0A%3Crect%20width%3D%2219%22%20height%3D%2219%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"), auto;
//   }
// `;

const CloseButton = styled.div`
  &{
    position: absolute;
    top: 8px;
    right: 8px;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, .8);
    color: var(--color-grey-100);
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

const ButtonArrowLeft = styled.div`
  position: absolute;
  top: min(calc(25vw - 24px), 276px);
`;

const ButtonArrowRight = styled.div`
  position: absolute;
  top: min(calc(25vw - 24px), 276px);
  right: 0px;
`;

const LeftArrow = styled(MdChevronLeft)`
    height: 22px;
    width: 22px;
`;

const RightArrow = styled(MdChevronRight)`
    height: 22px;
    width: 22px;
`;

const ImgZoomed = styled.img`
    ${'' /* margin-left: ${props => `${props.leftOffset}px`};
    margin-top: ${props => `${props.topOffset}px`}; */}
    width: 3200px;
    height: auto;
    z-index: 99;
    position: absolute
`;

const ImgZoomedWrapper = styled.div`
  height: min(50vw, 600px);
  width: min(100vw, var(--space-div-xl));
  overflow: hidden;
  position: relative;

  &:hover {
    cursor: url("data:image/svg+xml,%3Csvg%20width%3D%2219%22%20height%3D%2219%22%20viewBox%3D%220%200%2019%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_1964_50170)%22%3E%0A%3Ccircle%20cx%3D%229.5%22%20cy%3D%229.5%22%20r%3D%229.5%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.0251%209.50001C18.0251%2014.2082%2014.2083%2018.025%209.5001%2018.025V19.025C14.7606%2019.025%2019.0251%2014.7605%2019.0251%209.50001H18.0251ZM9.5001%2018.025C4.79187%2018.025%200.975098%2014.2082%200.975098%209.50001H-0.0249023C-0.0249023%2014.7605%204.23959%2019.025%209.5001%2019.025V18.025ZM0.975098%209.50001C0.975098%204.79178%204.79187%200.975006%209.5001%200.975006V-0.0249939C4.23959%20-0.0249939%20-0.0249023%204.23949%20-0.0249023%209.50001H0.975098ZM9.5001%200.975006C14.2083%200.975006%2018.0251%204.79178%2018.0251%209.50001H19.0251C19.0251%204.23949%2014.7606%20-0.0249939%209.5001%20-0.0249939V0.975006ZM4.98775%2010L14.0126%2010L14.0126%209.00001L4.98774%209.00003L4.98775%2010Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_1964_50170%22%3E%0A%3Crect%20width%3D%2219%22%20height%3D%2219%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"), auto;
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
    // this.mouseMove = throttle(this.mouseMove.bind(this), 3);
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

    event.preventDefault();
    // //APPROACH1
    // let x = event.nativeEvent.offsetX / 1.1;
    // let y = event.nativeEvent.offsetY / 1.1;
    // console.log(`x: ${x}, y: ${y}`);
    // const image-wrapper = document.getElementById('image-wrapper');
    // image-wrapper.scrollTo({
    //   left: x,
    //   top: y,
    //   behavior: 'auto'
    // });

    // //APPROACH 2
    // let x = (event.nativeEvent.offsetX / 1280) * (this.state.imageWidth);
    // let y = (event.nativeEvent.offsetY / 600) * (this.state.imageHeight);
    // console.log(`x: ${x}, y: ${y}`);
    // const image-wrapper = document.getElementById('image-wrapper');
    // image-wrapper.scrollTo({
    //   left: x,
    //   top: y,
    //   behavior: 'auto'
    // })
    // console.log('img', type==='img');
    // console.log('div', type==='div');
    // console.log('classname', event.target.className[event.target.className.length-1]);
    // console.log('target ', target);
    // console.log('tyepof ', tyepof);
    // console.log('typeof target', typeof target);
    // console.log('keys', Object.keys(target));
    console.log('event target', event.target);
    // let type = event.target.className.slice(event.target.className.length - 3);

    //APPROACH 3
    console.log(`native offsetX: ${event.nativeEvent.offsetX}, nativeoffSetY: ${event.nativeEvent.offsetY}`);

    let leftOffset = Math.round((event.nativeEvent.offsetX/1280)*(-1.5*1280));
    let topOffset = Math.round(-(event.nativeEvent.offsetY/600) * (this.state.imageHeight-600));

    // console.log(`leftoffset ${leftOffset}, topOffset`, topOffset);


    const image = document.getElementById('image');
    image.style['margin-left'] = leftOffset+'px';
    image.style['margin-top'] = topOffset+'px';

    // this.setState({
    //   positionX: leftOffset,
    //   positionY: topOffset
    // })
  }

  onImageLoad({target: image}){
    const {offsetHeight: imageHeight, offsetWidth: imageWidth} = image;
    const landscapeOrientation = imageWidth > imageHeight ? true : false;
    this.setState({
      imageWidth: imageWidth,
      imageHeight: imageHeight,
      landscapeOrientation: landscapeOrientation,
    },);
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
          <CarouselIndicatorWrapper key={i}>
            <CarouselIndicatorActive>
            </CarouselIndicatorActive>
          </CarouselIndicatorWrapper>
        );
      } else {
        carouselIndicators.push(
          <CarouselIndicatorWrapper onClick={changeImage} key={i} value={i}>
            <CarouselIndicatorInactive>
            </CarouselIndicatorInactive>
          </CarouselIndicatorWrapper>
        );
      }
    }

    const content = !this.state.zoom ? [
    <ImgWrapper onClick={this.toggleZoom} url={url}>
      {currentIndex > 0 &&
      <ButtonArrowLeft>
        <ViewArrow onClick={imageBack}><LeftArrow/></ViewArrow>
      </ButtonArrowLeft>}
      <ButtonArrowRight>
        <ViewArrow onClick={imageForward}>
          <RightArrow/>
        </ViewArrow>
      </ButtonArrowRight>
      <CloseButton onClick={toggleModal}><MdFullscreenExit/></CloseButton>
      <Img onLoad={this.onImageLoad} url={url}></Img>
    </ImgWrapper>,
    <CarouselIndicatorsWrapper>
      {carouselIndicators}
    </CarouselIndicatorsWrapper>,
    ] : [
      //zoomed image
    <ImgZoomedWrapper
      id={'image-wrapper'}
      className={'div'}
      onClick={this.toggleZoom}
      onMouseMove={this.mouseMove}
    >
      <ImgZoomed
        id={'image'}
        className={'img'}
        onLoad={this.onImageLoad}
        src={url}
        leftOffset={this.state.positionX}
        topOffset={this.state.positionY}
      />
    </ImgZoomedWrapper>

      // <ImgZoom
    //   onClick={this.toggleZoom}
    //   onMouseMove={this.mouseMove}
    //   positionX={this.state.positionX}
    //   positionY={this.state.positionY}
    //   url={url}
    //   windowWidth={this.state.windowWidth}
    //   windowHeight={this.state.windowHeight}
    // >
    //   <Img onLoad={this.onImageLoad} src={url}/>
    // </ImgZoom>
    ];

    return (
      <Modal>
      <Content>
        {content}
      </Content>
      </Modal>
    );
  }
}
