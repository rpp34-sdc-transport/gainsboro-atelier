import React from 'react';
import styled from 'styled-components';

const PrevCard = styled.div`
    left: 0;
`

const ActiveCard = styled.div`
    left: 50%;
    transform: translateX(-50%);
`

const NextCard = styled.div`
    right: 0;
`


export default class RelatedProductsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
        this.revealData = this.revealData.bind(this)
    }
    revealData = (e) => {
        this.setState({
            isHovered: !this.state.isHovered
        })
    }
    render() {
        console.log('PROPS IN CARD', this.props);

        if (this.props.cardStyle === 'prevCard') {
            return (
                <PrevCard>
                    <div className="product-data">{this.props.category}</div>
                    <div className="product-data">{this.props.name}</div>
                    <div className="product-data">{this.props.price}</div>
                    <div className="product-data">{this.props.rating}</div>
                </PrevCard>
            )
        } else if (this.props.cardStyle === 'activeCard') {
            return (
                <ActiveCard>
                    <div className="product-data">{this.props.category}</div>
                    <div className="product-data">{this.props.name}</div>
                    <div className="product-data">{this.props.price}</div>
                    <div className="product-data">{this.props.rating}</div>
                </ActiveCard>
            )
        } else {
            return (
                <NextCard>
                    <div className="product-data">{this.props.category}</div>
                    <div className="product-data">{this.props.name}</div>
                    <div className="product-data">{this.props.price}</div>
                    <div className="product-data">{this.props.rating}</div>
                </NextCard>
            )
        }
        
    }

}