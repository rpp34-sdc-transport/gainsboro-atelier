import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  width: 450px;
  max-height: 400px;
  border: 1px solid #b4b4b4;
  background-color: #FAFAFA;
  position: absolute;
  top: 100px;
  left: 200px;
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
  render() {
    const {selectedProduct, currFeature, currName} = this.props;
    const allFeatures = [...selectedProduct.features, ...currFeature].map(obj => obj.feature);
    console.log('selectedFeatures', selectedProduct.features);
    console.log('currFeature', currFeature);
    console.log('allFeatures', allFeatures);
    const uniqueFeatures = [...new Set(allFeatures)];
    console.log('uniqueFeatures', uniqueFeatures);
    return(
      <Modal>
        <small>COMPARING</small>
        <Names>
          <h5>{currName}</h5>
          <h5>{selectedProduct.name}</h5>
        </Names>
        {uniqueFeatures.map(targetFeature =>
          <Item>
            <CurrValue>
              {currFeature.reduce((value, obj) => {
                if (obj.feature === targetFeature) {
                  return value = value + obj.value
                }
                return value;
              }, '')}
            </CurrValue>
            <FeatureName>{targetFeature}</FeatureName>
            <SelectedValue>
              {selectedProduct.features.reduce((value, obj) => {
                if (obj.feature === targetFeature) {
                  return value = value + obj.value
                }
                return value;
              }, '')}
            </SelectedValue>
          </Item>
        )}
      </Modal>
    )
  }
}