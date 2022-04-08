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

const BoldSpan = styled.span`
    font-weight: 600;
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
            const qas = data.results.map((qa) => ({ ...qa, expanded: false }))
            this.setState({ qas })
        });
      }

    expandAnswers(qaIndex) {
        const qas = [...this.state.qas];
        qas[qaIndex].expanded = !qas[qaIndex].expanded;
        this.setState({ qas })
    }

    render() {
        return (
            <Container>
                <h2>Questions and Answers</h2>
            {this.state.qas.map((qa, qaIndex) => {
                const answersPrioritizingSeller = Object.values(qa.answers).sort((a, b) => {
                    if (a.answerer_name === 'Seller') {
                        return -1;
                    } else if (b.answerer_name === 'Seller') {
                        return 1;
                    }
                    return 0;
                });

                const answersToRender = qa.expanded ? answersPrioritizingSeller : answersPrioritizingSeller.slice(0 ,2);

                return (<QABlock key={qa.id}>
                    <Question>
                        Q: {qa.question_body}
                    </Question>
                    <div>
                        {answersToRender.map(({ body, date, helpfulness, photos }, i) => (
                            <div key={body}>
                                <BoldSpan>A:</BoldSpan> {body}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.expandAnswers(qaIndex)}>
                        {qa.expanded ? 'Show less' : 'Load more answers'}
                    </button>
                </QABlock>);
            }
            )}
            </Container>
        )
    }
}