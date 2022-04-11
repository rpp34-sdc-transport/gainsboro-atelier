import React from 'react';
import styled from 'styled-components';

import { AnswersGroup } from './Answers.jsx';
import { Modal } from './Modal.jsx';

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
            qas: [],
            showCount: 2,
            modalOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        fetch(`/qa/questions?product_id=${this.props.productId}`)
        .then(response => response.json())
        .then(data => {
            data.results.sort((a, b) => {
                return b.question_helpfulness - a.question_helpfulness
            });
            this.setState({ qas: data.results })
        });
      }

    expandQABlocks() {
        if (this.state.qas.length > this.state.showCount) {
            this.setState({ showCount: this.state.showCount + 2 })
        }
    }

    openModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    addQuestion() {
        // create new question ID, store new info

    }

    render() {
        const qasToRender = this.state.qas.slice(0, this.state.showCount);

        return (
            <Container>
                <h2>Questions and Answers</h2>
                {qasToRender.map((qa) => {
                    const answersPrioritizingSeller = Object.values(qa.answers).sort((a, b) => {
                        if (a.answerer_name === 'Seller') {
                            return -1;
                        } else if (b.answerer_name === 'Seller') {
                            return 1;
                        }
                        return 0;
                    });

                    return (
                    <QABlock key={qa.id}>
                        <Question>
                            Q: {qa.question_body}
                        </Question>
                        <AnswersGroup answers={answersPrioritizingSeller} />
                        
                    </QABlock>);
                })}
                <button onClick={() => this.expandQABlocks()}>
                    MORE ANSWERED QUESTIONS
                </button>
                <button onClick={() => this.openModal()}>
                    ADD A QUESTION +
                </button>
                <Modal 
                    isOpen={this.state.modalOpen}
                    close={() => this.closeModal()}
                >
                    Hello World
                </Modal>
            </Container>
        )
    }
}

/*

                const answersToRender = qa.expandedAns ? answersPrioritizingSeller : answersPrioritizingSeller.slice(0 ,2);

{/* <div>
    {answersToRender.map(({ body, date, helpfulness, photos }, i) => (
        <div key={body}>
            <BoldSpan>A:</BoldSpan> {body}
        </div>
    ))}
</div>
<button onClick={() => this.expandAnswers(qaIndex)}>
    {qa.expandedAns ? 'Show less' : 'Load more answers'}
</button>
*/