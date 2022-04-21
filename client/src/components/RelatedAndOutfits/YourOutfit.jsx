import React from 'react';
import styled from 'styled-components';
import {Card} from './RelatedProducts.jsx';
import {VscAdd} from 'react-icons/vsc';

const Container = styled.div`
  display: flex;
`;

const AddCard = styled(Card)`
  height: 300px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AddIcon = styled(VscAdd)`
`;

export default class YourOutfit extends React.Component{

  render() {
    return(
      <Container>
        <AddCard>
          <VscAdd />
          <small>Add to Outfit</small>
        </AddCard>
      </Container>
    )
  }
}