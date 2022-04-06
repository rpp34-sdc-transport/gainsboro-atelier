import React from 'react';

export default class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qas: []
        }
    }

    componentDidMount() {
        fetch(`/qa/questions?product_id=${this.props.productId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                qas: data.results.sort((a, b) => {
                    return b.question_helpfulness - a.question_helpfulness
                })
            })
        });
      }

    render() {
        return (
            <div>
            {this.state.qas.map((qa) => 
                <>
                    <div className='question'>
                        Q: {qa.question_body}
                    </div>
                    <div>
                        {Object.values(qa.answers).sort((a, b) => {
                            if (a.answerer_name === 'Seller') {
                                return -1;
                            } else if (b.answerer_name === 'Seller') {
                                return 1;
                            }

                            return 0;
                        })
                        .map(({ body, date, helpfulness, photos }) => (
                            <div>
                                A: {body}
                            </div>
                        ))}
                    </div>
                </>
            )}
            </div>
            
        )
    }
}