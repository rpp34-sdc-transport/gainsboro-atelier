import React from 'react';
import RelatedProductsCard from './relatedProductsCard.jsx';

export default class RelatedProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render () {
        const products = this.props.products;
        const productsList = products.map((product) => <RelatedProductsCard key={product.id} name={product.name}/>);
        return (
            <div class="carousel">
                <button><</button>
                    {productsList}
                <button>></button>
            </div>
        );
    }
}