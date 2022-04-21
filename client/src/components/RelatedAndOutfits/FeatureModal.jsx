import React from 'react';
import styled from 'styled-components';


const Modal = styled.div`
  position: absolute;
  z-index: 1;
  top: 200px;
  left: -40px;
  width: 450px;
  max-height: 400px;
  border: 1px solid #b4b4b4;
  background-color: #FAFAFA;
  margin: auto;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
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
    const {selectedName, selectedFeature, currFeature, currName, handleCloseModalClick} = this.props;
    console.log('selectedName', selectedName);
    console.log('selectedFeature', selectedFeature);
    console.log('currFeature', currFeature);
    const allFeatures = [...selectedFeature, ...currFeature].map(obj => obj.feature);
    console.log('allFeatures', allFeatures);
    const uniqueFeatures = [...new Set(allFeatures)];
    console.log('uniqueFeatures', uniqueFeatures);
    return(
      <Modal onClick={handleCloseModalClick}>
        <small>COMPARING</small>
        <Names>
          <h5>{currName}</h5>
          <h5>{selectedName}</h5>
        </Names>
        {uniqueFeatures.map(targetFeature =>
          <Item key={targetFeature}>
            <CurrValue>
              {this.getFeatureValue(targetFeature, currFeature)}
            </CurrValue>
            <FeatureName>{targetFeature}</FeatureName>
            <SelectedValue>
              {this.getFeatureValue(targetFeature, selectedFeature)}
            </SelectedValue>
          </Item>
        )}
      </Modal>
    )
  }
}