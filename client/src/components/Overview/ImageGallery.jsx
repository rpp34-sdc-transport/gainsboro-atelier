import React from 'react';

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    }
  }

  render() {
    const {currentStyle, photos} = this.props;
    const thumbnails = photos.map((photo) => <img src={photo.thumbnail_url}></img>);

    return (
      <div>
        {/* {thumbnails}
        {photos.length > 0 ? <img src={photos[currentStyle]['url']}></img>:''} */}
      </div>
    );
  }
}