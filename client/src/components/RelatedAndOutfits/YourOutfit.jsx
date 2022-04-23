import React from 'react';
import styled from 'styled-components';
import {Card} from './RelatedProducts.jsx';
import {VscAdd} from 'react-icons/vsc';

const Container = styled.div`
  display: flex;
  padding-left: 50px;
`;

const AddCard = styled(Card)`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AddIcon = styled(VscAdd)`
  & {
    width: 30px;
    height: 30px;
    transition: all 0.5s ease;
  }
  &:hover {
    width: 50px;
    height: 50px;
  }
`;

export default class YourOutfit extends React.Component{


  render() {
    return(
      <Container>
        <AddCard>
          <AddIcon />
          <small>Add to Outfit</small>
        </AddCard>

      </Container>
    )
  }
}