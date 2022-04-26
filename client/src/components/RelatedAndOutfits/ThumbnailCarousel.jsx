import React from 'react';
import styled from 'styled-components';
import {MdArrowForwardIos, MdOutlineArrowBackIosNew} from 'react-icons/md';


const Modal = styled.div`
  position: absolute;
  z-index: 1;
  top: 300px;
  left: 0;
  width: 250px;
  height: 120px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
`;

const Carousel = styled.div`
  width: 210px;
  height: 50px;
  overflow: hidden;
  position: relative;
`
const Content = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 0;
  left: ${props => props.absoluteLeft}px;
  transition: all 1s ease;
`;

const Thumbnail = styled.img`
  &{
    width: 45px;
    height: 50px;
    border-radius: 5px;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:hover {
    border: 1px solid #535353;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;

const BackArrow = styled.div`
  width: 15px;
`;

const BackArrowIcon = styled(MdOutlineArrowBackIosNew)`
  &{
    width: 15px;
    height: 15px;
    transition: all 0.5s ease;
    color: #b4b4b4;
  }
  &:hover {
    cursor: pointer;
    color: #535353;
  }
`

const ForwardArrow = styled.div`
  width: 15px;
`;

const ForwardArrowIcon = styled(MdArrowForwardIos)`
  &{
    width: 15px;
    height: 15px;
    transition: all 0.5s ease;
    color: #b4b4b4;
  }
  &:hover {
    cursor: pointer;
    color: #535353;
  }
`;


export default class ThumbnailCarousel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstImageIndex: 0,
      absoluteLeft: 0
    }
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
  }

  handleForwardArrowClick() {
    this.setState(preState => ({
      firstImageIndex: preState.firstImageIndex + 1,
      absoluteLeft: preState.absoluteLeft - 55
    }))
  }

  handleBackArrowClick() {
    this.setState(preState => ({
      firstImageIndex: preState.firstImageIndex - 1,
      absoluteLeft: preState.absoluteLeft + 55
    }))
  }

  render() {
    const {id, photos, handleChangePreviewImageClick} = this.props;
    console.log('photos', photos);
    return(
      <Modal>
        {this.state.firstImageIndex > 0 &&
          <BackArrow>
            <BackArrowIcon onClick={this.handleBackArrowClick}/>
          </BackArrow>
        }
        <Carousel>
          <Content absoluteLeft={this.state.absoluteLeft}>
            {photos.map((photo, index) =>
              <Thumbnail key={index} url={photo.thumbnail_url} onClick={() => handleChangePreviewImageClick(id, index)}></Thumbnail>
            )}
          </Content>
        </Carousel>
        {photos[this.state.firstImageIndex + 4] &&
          <ForwardArrow>
            <ForwardArrowIcon onClick={this.handleForwardArrowClick}/>
          </ForwardArrow>
        }
      </Modal>
    )
  }
}