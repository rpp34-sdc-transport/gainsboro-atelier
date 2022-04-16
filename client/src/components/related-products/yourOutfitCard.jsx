import React from 'react';
import styled from 'styled-components';

const PrevCard = styled.div`
    left: 0;
`

const ActiveCard = styled.div`
    margin-right: 20px;
`

const NextCard = styled.div`
    right: 0;
`


export default class YourOutfitCard extends React.Component {
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
        // console.log('PROPS IN CARD', this.props);

        if (this.props.cardStyle === 'prevCard') {
            return (
                // <PrevCard>
                <div>

                    <div className="product-data">{this.props.product.category}</div>
                    <div className="product-data">{this.props.product.name}</div>
                    <div className="product-data">{this.props.product.price}</div>
                    <div className="product-data">{this.props.product.rating}</div>
                </div>
                // </PrevCard>
            )
        } else if (this.props.cardStyle === 'activeCard') {
            return (
                <ActiveCard>
                    <div className="product-data">{this.props.product.category}</div>
                    <div className="product-data">{this.props.product.name}</div>
                    <div className="product-data">{this.props.product.price}</div>
                    <div className="product-data">{this.props.product.rating}</div>
                </ActiveCard>
            )
        } else {
            return (
                <div>
                    <div className="product-data">{this.props.product.category}</div>
                    <div className="product-data">{this.props.product.name}</div>
                    <div className="product-data">{this.props.product.price}</div>
                    <div className="product-data">{this.props.product.rating}</div>
                </div>
            )
        }
        
    }

}