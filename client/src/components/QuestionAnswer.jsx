import React from 'react';

export default class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props);
        this,state = {
            
                }
    }

    componentDidMount() {
        fetch(`/qa/questions?product_id=${this.props.productId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                qa: data.results
            })
        });
      }

    render() {
        return (
            <div>hello</div>
        )
    }
}