import React from 'react';
import styled from 'styled-components';
import StarRating from '../ReviewAndRating/StarRating.jsx';
import FeatureModal from './FeatureModal.jsx';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';
import {MdOutlineHideImage, MdOutlineStar, MdArrowForwardIos, MdOutlineArrowBackIosNew} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  gap: 30px;
  position: relative;
`;

const BackArrow = styled.div`
  width: 50px;
  padding-top: 160px;
`;

const BackArrowIcon = styled(MdOutlineArrowBackIosNew)`
  &{
    width: 30px;
    height: 30px;
    transition: all 0.5s ease;
  }
  &:hover {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`

const ForwardArrow = styled.div`
  width: 50px;
  padding-top: 160px;
`;

const ForwardArrowIcon = styled(MdArrowForwardIos)`
  &{
    width: 30px;
    height: 30px;
    transition: all 0.5s ease;
  }
  &:hover {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`

export const Card = styled.div`
  &{
    border: 1px solid #b4b4b4;
    border-radius: 3px;
    width: 250px;
    position: relative;
  }
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const NoImage = styled.div`
  width: 250px;
  height: 300px;
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color:
`;

const Image = styled.div`
  width: 250px;
  height: 300px;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const TextBox = styled.div`
  padding: 10px;
`;

const Heading5 = styled.h5`
  margin: 5px 0;
`;

const Star = styled(MdOutlineStar)`
  &{
    color: ${props => props.color};
    width: 25px;
    height: 25px;
    position: absolute;
    top: 5px;
    right: 10px;
    transition: all 0.5s ease;
  }
  &:hover {
    width: 30px;
    height: 30px;
    cursor: pointer;
    opacity: 1;
  }
`;


export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStar: false,
      showModal: '',
      previewImages: {},
      firstProductIndex: 0,
      showThumbnailCarousel: ''
    }
    this.handleCompareStarClick = this.handleCompareStarClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleMouseEnterImageClick = this.handleMouseEnterImageClick.bind(this);
    this.handleMouseLeaveImageClick = this.handleMouseLeaveImageClick.bind(this);
    this.handleChangePreviewImageClick = this.handleChangePreviewImageClick.bind(this);
  }

  handleCompareStarClick(modal, star) {
    console.log('modal', modal);
    console.log('star', star);
    this.setState({
      showModal: modal,
      clickedStar: star
    })
  }

  handleCloseModalClick() {
    this.setState({showModal: '', clickedStar: false})
  }

  handleForwardArrowClick() {
    this.setState(preState => ({firstProductIndex: preState.firstProductIndex + 1}))
  }

  handleBackArrowClick() {
    this.setState(preState => ({firstProductIndex: preState.firstProductIndex - 1}))
  }

  handleMouseEnterImageClick(str) {
    this.setState({showThumbnailCarousel: str})
  }

  handleMouseLeaveImageClick() {
    this.setState({showThumbnailCarousel: ''})
  }

  handleChangePreviewImageClick(id, index) {
    this.setState(preState => ({previewImages: {...preState.previewImages, [id]: index}}))
  }

  render() {
    const {relatedProducts, currFeature, currName} = this.props;
    return(
      <Container>
        {this.state.firstProductIndex > 0 &&
          <BackArrow>
            <BackArrowIcon onClick={this.handleBackArrowClick}/>
          </BackArrow>
        }
        {relatedProducts.slice(this.state.firstProductIndex, this.state.firstProductIndex + 4).map(product => {
          const {id, ratings, name, features, defaultStyle, category} = product;
          const {original_price, sale_price, photos} = defaultStyle;
          return (
            <Card key={id}>
              {!photos || !photos[0].thumbnail_url ?
                <NoImage>
                  <MdOutlineHideImage/>
                </NoImage> :
                <Image
                  url={this.state.previewImages[id] !== undefined ? photos[this.state.previewImages[id]].thumbnail_url : photos[0].thumbnail_url}
                  onMouseEnter={() => this.handleMouseEnterImageClick(`${id}thumbnailCarousel`)}
                  onMouseLeave={this.handleMouseLeaveImageClick}
                >
                  {this.state.showThumbnailCarousel === `${id}thumbnailCarousel` &&
                    <ThumbnailCarousel
                      id={id}
                      photos={photos}
                      handleChangePreviewImageClick={this.handleChangePreviewImageClick}
                    />
                  }
                  {this.state.showModal === `${id}featureModal` &&
                    <FeatureModal
                      selectedName={name}
                      selectedFeature={features}
                      currFeature={currFeature}
                      currName={currName}
                      handleCloseModalClick={this.handleCloseModalClick}
                    />
                  }
                </Image>
              }
              <Star color={this.state.clickedStar === `${id}star`? '#378f1e' : '#ffc107'} onClick={() => this.handleCompareStarClick(`${id}featureModal`, `${id}star`)}/>
              <TextBox>
                <small>{category}</small>
                <Heading5>{name}</Heading5>
                <small>{original_price}</small>
                <StarRating ratings={ratings} showAve={false}/>
              </TextBox>
            </Card>
          )
        })}
        {relatedProducts[this.state.firstProductIndex + 4] &&
          <ForwardArrow>
            <ForwardArrowIcon onClick={this.handleForwardArrowClick}/>
          </ForwardArrow>
        }
      </Container>
    )
  }
}