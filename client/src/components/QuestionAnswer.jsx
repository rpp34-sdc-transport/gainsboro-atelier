import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const QABlock = styled.div`
    width: 50%;
    margin: 20px;
    padding: 20px;
`;

const Question = styled.div`
    font-weight: 600;
`;

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
            <Container>
                <h2>Questions and Answers</h2>
            {this.state.qas.map((qa, qaIndex) => 
                <QABlock key={qa.id}>
                    <Question>
                        Q: {qa.question_body}
                    </Question>
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
                            <div key={body} style={{ display: i < 2 || qa.expanded ? 'block' : 'none' }}>
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
                </QABlock>
            )}
            </Container>
        )
    }
}