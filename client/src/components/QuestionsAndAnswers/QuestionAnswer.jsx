import React from 'react';
import styled from 'styled-components';

import { AnswersGroup } from './Answers.jsx';
import { ModalQuestion } from './ModalQuestion.jsx';
import { ModalAnswer } from './ModalAnswer.jsx';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const QABlock = styled.div`
    width: 50%;
    margin: 20px;
    padding: 20px;
`;

const BoldSpan = styled.span`
    font-weight: 600;
`;

const Question = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
`;

const QuestionAction = styled.span`
    text-decoration: underline;
    cursor: pointer;
`

// By default, on page load up to two questions should be displayed. Therefore, initial showCount is 2
export default class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qas: [],
            showCount: 2,
            modalQuestionOpen: false,
            modalAnswerOpen: false,
            selectedQuestion: null,
        }
        this.openQuestionModal = this.openQuestionModal.bind(this);
        this.closeQuestionModal = this.closeQuestionModal.bind(this);
        this.openAnswerModal = this.openAnswerModal.bind(this);
        this.closeAnswerModal = this.closeAnswerModal.bind(this);
        this.getData = this.getData.bind(this);
    }
    
    componentDidMount() {
        this.getData();
    }
    
    // Questions should appear in order of ‘helpfulness’, corresponding to how many users have indicated that the question was helpful. 
    getData() {
        fetch(`/qa/questions?product_id=${this.props.productId}`)
        .then(response => response.json())
        .then(data => {
            data.results.sort((a, b) => {
                return b.question_helpfulness - a.question_helpfulness
            });
            this.setState({ qas: data.results })
        });
    }
    
    // The remaining questions/answers should be hidden until the user loads them using the “More Answered Questions” button
    expandQABlocks() {
        if (this.state.qas.length > this.state.showCount) {
            this.setState({ showCount: this.state.showCount + 2 })
        }
    }

    openQuestionModal() {
        this.setState({
            modalQuestionOpen: true
        })
    }

    closeQuestionModal() {
        this.getData();
        this.setState({
            modalQuestionOpen: false
        })
    }

    openAnswerModal(id) {
        this.setState({
            modalAnswerOpen: true,
            selectedQuestion: id,
        })
    }

    closeAnswerModal() {
        this.getData();
        this.setState({
            modalAnswerOpen: false
        })
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
                    <QABlock key={qa.question_id}>
                        <Question>
                            Q: {qa.question_body}
                            <QuestionAction onClick={() => this.openAnswerModal(qa.question_id)}>Add answer</QuestionAction>
                        </Question>
                        <AnswersGroup answers={answersPrioritizingSeller} />
                    </QABlock>);
                })}
                
                <button onClick={() => this.expandQABlocks()}>
                    MORE ANSWERED QUESTIONS
                </button>

                <button onClick={() => this.openQuestionModal()}>
                    ADD A QUESTION +
                </button>

                <ModalQuestion 
                    isOpen={this.state.modalQuestionOpen}
                    close={() => this.closeQuestionModal()}
                    productId={this.props.productId}
                    overview={this.props.overview}
                >
                    Placeholder
                </ModalQuestion>

                <ModalAnswer 
                    questionId={this.state.selectedQuestion}
                    isOpen={this.state.modalAnswerOpen}
                    close={() => this.closeAnswerModal()}
                    productId={this.props.productId}
                    overview={this.props.overview}
                >
                    Placeholder
                </ModalAnswer>

            </Container>
        )
    }
}

 
