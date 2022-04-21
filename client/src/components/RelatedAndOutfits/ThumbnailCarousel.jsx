import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: absolute;
  top: 40px;
  width: 300px;
  height: 100px;
  background-color: rgba(0,0,0,0.9);
`;



export default class ThumbnailCarousel extends React.Component{

  render() {
    const {thumbnails} = this.props;
    return(
      <Modal>
        {thumbnails.thumbnail_url}
      </Modal>
    )
  }
}