import React from 'react'

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
        return (
            <div className="carousel-item">
                <div className="product-data">{this.props.category}</div>
                <div className="product-data">{this.props.name}</div>
                <div className="product-data">{this.props.price}</div>
                <div className="product-data">{this.props.rating}</div>
            </div>
        );
    }

}