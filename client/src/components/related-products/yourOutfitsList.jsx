import React from 'react';
import styled from 'styled-components';
import YourOutfitCard from './yourOutfitCard.jsx';


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

export default class OutfitList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render () {
        var products = this.props.products
        console.log(this.props)
        return (
            <div className = "carousel">
                <CardContainer>
                    <ScrollLeft>Left</ScrollLeft>
                    {products.map((product, index) => {
                            let position = index > 0 ? "nextCard" : index === 0 ?
                                "activeCard" : "prevCard";
                                return (
                                    <Card key={product.id}>
                                        <YourOutfitCard product={product} cardStyle={position}/>
                                    </Card>
                                )
                        })}
                    <ScrollRight>Right</ScrollRight>
                </CardContainer>
            </div>

        )
    }
}