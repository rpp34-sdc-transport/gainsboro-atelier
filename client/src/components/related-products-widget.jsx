import React from 'react';
import RelatedProductsList from './related-products/relatedProductsList.jsx';
import OutfitList from './related-products/yourOutfitsList.jsx'

export default class RelatedProductsWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            relatedProducts: [
                {id: 1, category: "shirts", name: "white t-shirt", price: 19.99, rating: 4}, 
                {id: 2, category: "pants", name: "jeans", price: 39.99, rating: 5},
                {id: 3, category: "hats", name: "blue beanie", price: 14.99, rating: 2},
                {id: 4, category: "socks", name: "black no-show socks (5 pairs)", price: 9.99, rating: 3}
            ],
            outfit: [
                {id: 1, category: "shirts", name: "white t-shirt", price: 19.99, rating: 4}, 
                {id: 2, category: "pants", name: "jeans", price: 39.99, rating: 5},
                {id: 3, category: "hats", name: "blue beanie", price: 14.99, rating: 2},
                {id: 4, category: "socks", name: "black no-show socks (5 pairs)", price: 9.99, rating: 3}
            ]
        }
    }
    

    render() {
        return (
            <div className="relatedProductsWidget">
                <h2>Related Products</h2>
                <RelatedProductsList products={this.state.relatedProducts}/>
                <h2>Your Outfit</h2>
                <OutfitList products={this.state.outfit}/>
            </div>
        )
    }
}