import React from 'react';
import RelatedProductsCard from './relatedProductsCard.jsx';
import styled from 'styled-components';

const Card = styled.div`
    flex: 1;
    border: 2px solid grey;
    margin-right 15px;
`

const ScrollLeft = styled.button`
    margin-right 10px;
`
const ScrollRight = styled.button`
    margin-right 10px;
`

const CardContainer = styled.div`
    display: flex;
    margin-left 40px;
    margin-right 40px;
`




export default class RelatedProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render () {
        const products = this.props.products;
        const productsList = products.map((product, index) => <RelatedProductsCard key={product.id} name={product.name}/>);
        // console.log("Products: ", products)
        return (
            
            <div className="carousel">
                <CardContainer>
                    <ScrollLeft>Left</ScrollLeft>
                        {products.map((product, index) => {
                            let position = index > 0 ? "nextCard" : index === 0 ?
                                "activeCard" : "prevCard";
                                return (
                                    <Card key={product.id}>
                                        <RelatedProductsCard product={product} cardStyle={position}/>
                                    </Card>
                                )
                        })}
                    <ScrollRight>Right</ScrollRight>
                </CardContainer>
            </div>
        );
    }
}