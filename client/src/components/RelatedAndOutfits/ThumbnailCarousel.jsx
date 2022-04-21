import React from 'react';
import styled from 'styled-components';
import {MdArrowForwardIos, MdOutlineArrowBackIosNew} from 'react-icons/md';


const Modal = styled.div`
  position: absolute;
  z-index: 1;
  top: 250px;
  left: -20px;
  width: 400px;
  height: 150px;
  background-color: rgba(0,0,0,0.9);
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  padding: 0 5px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 100px;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;

const BackArrow = styled.div`
  width: 20px;
`;

const BackArrowIcon = styled(MdOutlineArrowBackIosNew)`
  &{
    width: 20px;
    height: 20px;
    transition: all 0.5s ease;
    color: #ebebeb;
  }
  &:hover {
    cursor: pointer;
    color: #ffffff;
  }
`

const ForwardArrow = styled.div`
  width: 20px;
`;

const ForwardArrowIcon = styled(MdArrowForwardIos)`
  &{
    width: 20px;
    height: 20px;
    transition: all 0.5s ease;
    color: #ebebeb;
  }
  &:hover {
    cursor: pointer;
    color: #ffffff;
  }
`;


export default class ThumbnailCarousel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstImageIndex: 0
    }
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
  }

  handleForwardArrowClick() {
    this.setState(preState => ({firstImageIndex: preState.firstImageIndex + 1}))
  }

  handleBackArrowClick() {
    this.setState(preState => ({firstImageIndex: preState.firstImageIndex - 1}))
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
        {photos.slice(this.state.firstImageIndex, this.state.firstImageIndex+4).map((photo, index) =>
          <Thumbnail key={index} url={photo.thumbnail_url} onClick={() => handleChangePreviewImageClick(id, this.state.firstImageIndex + index)}></Thumbnail>
        )}
        {photos[this.state.firstImageIndex + 4] &&
          <ForwardArrow>
            <ForwardArrowIcon onClick={this.handleForwardArrowClick}/>
          </ForwardArrow>
        }
      </Modal>
    )
  }
}