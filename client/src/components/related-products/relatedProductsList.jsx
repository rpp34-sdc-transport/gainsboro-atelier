import React from 'react';
import RelatedProductsCard from './relatedProductsCard.jsx';
import styled from 'styled-components';
import Carousel from 'styled-components-carousel';


const Card = styled.div`
    position: absolute'
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 100vh;

    margin: auto;
`

const CardContainer = styled.div`
    position: relative;
    width: 32rem;
    height: 22rem;
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
        console.log("Products: ", products)
        return (
            
            <div className="carousel">
                <button>Back</button>
                    <CardContainer>
                        {products.map((product, index) => {
                            let position = index > 0 ? "nextCard" : index === 0 ?
                                "activeCard" : "prevCard";
                                return (
                                    <Card key={product.id}>
                                        <RelatedProductsCard name={product.name} cardStyle={position}/>
                                    </Card>
                                )
                        })}
                    </CardContainer>
                <button>Forward</button>
            </div>
        );
    }
}