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
            data.results.sort((a, b) => {
                return b.question_helpfulness - a.question_helpfulness
            });
            // add expanded to show 2 or more answers
            const qas = data.results.map((qa) => ({ ...qa, expanded: false }))
            this.setState({ qas })
        });
      }

    expandAnswers(qaIndex) {
        const qas = [...this.state.qas];
        qas[qaIndex].expanded = true;

        this.setState({ qas })
    }

    render() {
        return (
            <div style={{width: '50%'}}>
                <h2>Questions and Answers</h2>
            {this.state.qas.map((qa, qaIndex) => 
                <div style={{
                        boxShadow: '10px 10px 5px grey',
                        margin: '20px',
                        padding: '20px',
                        }}
                >
                    <div className='question' style={{ fontWeight: 600 }}>
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
                        .map(({ body, date, helpfulness, photos }, i) => (
                            <div style={{ display: i < 2 || qa.expanded ? 'block' : 'none' }}>
                                <span style={{ fontWeight: 600 }}>A:</span> {body}
                            </div>
                        ))}
                    </div>
                    <button 
                        style={{ display: qa.expanded || Object.values(qa.answers).length < 2 ? 'none' : 'block' }}
                        onClick={() => this.expandAnswers(qaIndex)}
                    >
                        Load more answers
                    </button>
                </div>
            )}
            </div>
            
        )
    }
}