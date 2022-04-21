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
  font-size: 30px;
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

const Card = styled.div`
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
    color: #ffc107;
    opacity: ${props => props.opacitys};
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
      showModal: false,
      selectedProduct: '',
      firstProductIndex: 0,
      showThumbnailCarousel: false
    }
    this.handleCompareStarClick = this.handleCompareStarClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleMouseEnterImageClick = this.handleMouseEnterImageClick.bind(this);

  }

  handleCompareStarClick(num) {
    console.log('num', num);
    this.setState({
      showModal: true,
      selectedProduct: num,
      clickedStar: true
    })
  }

  handleCloseModalClick() {
    this.setState({showModal: false, selectedProduct: '', clickedStar: false})
  }

  handleForwardArrowClick() {
    this.setState(preState => ({firstProductIndex: preState.firstProductIndex + 1}))
  }

  handleBackArrowClick() {
    this.setState(preState => ({firstProductIndex: preState.firstProductIndex - 1}))
  }

  handleMouseEnterImageClick(num) {
    this.setState({showThumbnailCarousel: true, selectedProduct: num})
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
        {relatedProducts.slice(this.state.firstProductIndex, this.state.firstProductIndex + 4).map((product, index) => {
          const {id, ratings, name, features, defaultStyle, category} = product;
          const {original_price, sale_price, photos} = defaultStyle;
          console.log('photos', photos);
          return (
            <Card key={id}>
              {!photos || !photos[0].thumbnail_url ?
                <NoImage>
                  <MdOutlineHideImage/>
                </NoImage> :
                <Image url={photos[0].thumbnail_url} onMouseEnter={this.handleMouseEnterImageClick}>
                  {this.state.selectedProduct === index && this.state.showThumbnailCarousel && <ThumbnailCarousel thumbnails={product.defaultStyle.photos}/>}
                </Image>
              }
              <Star opacity={this.state.selectedProduct === index && this.state.clickedStar? 1 : 0.5} onClick={() => this.handleCompareStarClick(index)}/>
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
        {this.state.showModal &&
          <FeatureModal
            selectedProduct={relatedProducts[this.state.selectedProduct]}
            currFeature={currFeature}
            currName={currName}
            handleCloseModalClick={this.handleCloseModalClick}
          />
        }
      </Container>
    )
  }
}