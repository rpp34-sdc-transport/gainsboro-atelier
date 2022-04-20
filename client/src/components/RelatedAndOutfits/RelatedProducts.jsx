import React from 'react';
import styled from 'styled-components';
import StarRating from '../ReviewAndRating/StarRating.jsx';
import FeatureModal from './FeatureModal.jsx';
import {MdOutlineHideImage, MdOutlineStar} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  gap: 30px;
  position: relative;
`;

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
`;

const TextBox = styled.div`
  padding: 10px;
`;

const Heading5 = styled.h5`
  margin: 5px 0;
`;

const Star = styled(MdOutlineStar)`
  color: #ffc107;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 5px;
  right: 10px;
`;


export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedProduct: '',
    }
    this.handleCompareStarClick = this.handleCompareStarClick.bind(this);
  }

  handleCompareStarClick(num) {
    console.log('num', num);
    this.setState({
      showModal: true,
      selectedProduct: num
    })
  }

  render() {
    const {relatedProducts, currFeature, currName} = this.props;
    return(
      <Container>
        {relatedProducts.map((product, index) => {
          const {id, ratings, name, features, defaultStyle, category} = product;
          const {original_price, sale_price, photos} = defaultStyle;
          console.log('photos', photos);
          return (
            <Card key={id}>
              {!photos || !photos[0].thumbnail_url ?
                <NoImage>
                  <MdOutlineHideImage/>
                </NoImage> :
                <Image url={photos[0].thumbnail_url}>
                </Image>
              }
              <Star onClick={() => this.handleCompareStarClick(index)}/>
              <TextBox>
                <small>{category}</small>
                <Heading5>{name}</Heading5>
                <small>{original_price}</small>
                <StarRating ratings={ratings} showAve={false}/>
              </TextBox>
            </Card>
          )
        })}
        {this.state.showModal &&
          <FeatureModal
            selectedProduct={relatedProducts[this.state.selectedProduct]}
            currFeature={currFeature}
            currName={currName}
          />
        }
      </Container>
    )
  }
}