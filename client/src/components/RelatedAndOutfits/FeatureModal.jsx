import React from 'react';
import styled from 'styled-components';


const Modal = styled.div`
  position: absolute;
  top: 100px;
  left: 400px;
  width: 450px;
  max-height: 400px;
  border: 1px solid #b4b4b4;
  background-color: #FAFAFA;
  margin: auto;
  padding: 20px;
`;

const Names = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrValue = styled.small`
  flex-grow: 1;
  flex-basis: 0;
  text-align: left;
`;

const FeatureName = styled.p`
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  margin: 10px 0;
`;

const SelectedValue = styled.small`
  flex-grow: 1;
  flex-basis: 0;
  text-align: right;
`;

export default class FeatureModal extends React.Component{

  getFeatureValue(targetFeature, featureArr) {
    var value = featureArr.reduce((value, obj) => value = obj.feature === targetFeature ? value + obj.value : value, '');
    console.log(value);
    return value;
  }

  render() {
    const {selectedProduct, currFeature, currName, handleCloseModalClick} = this.props;
    console.log('selectedProduct', selectedProduct);
    console.log('selectedFeatures', selectedProduct.features);
    console.log('currFeature', currFeature);
    const allFeatures = [...selectedProduct.features, ...currFeature].map(obj => obj.feature);
    console.log('allFeatures', allFeatures);
    const uniqueFeatures = [...new Set(allFeatures)];
    console.log('uniqueFeatures', uniqueFeatures);
    return(
      <Modal onClick={handleCloseModalClick}>
        <small>COMPARING</small>
        <Names>
          <h5>{currName}</h5>
          <h5>{selectedProduct.name}</h5>
        </Names>
        {uniqueFeatures.map(targetFeature =>
          <Item key={targetFeature}>
            <CurrValue>
              {this.getFeatureValue(targetFeature, currFeature)}
            </CurrValue>
            <FeatureName>{targetFeature}</FeatureName>
            <SelectedValue>
              {this.getFeatureValue(targetFeature, selectedProduct.features)}
            </SelectedValue>
          </Item>
        )}
      </Modal>
    )
  }
}