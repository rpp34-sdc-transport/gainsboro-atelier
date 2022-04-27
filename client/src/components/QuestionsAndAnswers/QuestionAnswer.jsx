import React from 'react';
import styled from 'styled-components';

import { AnswersGroup } from './Answers.jsx';
import { ModalQuestion } from './ModalQuestion.jsx';
import { ModalAnswer } from './ModalAnswer.jsx';
import { withAnalytics } from '../HOCs/withAnalytics.js';
import { Question } from './Question.jsx';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchBar = styled.input`
    width: 50%;
    height: 50px;
`;

const QABlock = styled.div`
    width: 50%;
    margin: 20px;
    padding: 20px;
`;

const ButtonsContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
`

const Button = styled.button`
  background: transparent;
  border: 2px solid #d4d4d4;
  color: #525252;
  padding: 15px 30px;
  margin-right: 40px;
`;

// By default, on page load up to two questions should be displayed. Therefore, initial showCount is 2
export class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qas: [],
            showCount: 2,
            modalQuestionOpen: false,
            modalAnswerOpen: false,
            selectedQuestion: null,
            searchTerm: ''
        }
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.openQuestionModal = this.openQuestionModal.bind(this);
        this.closeQuestionModal = this.closeQuestionModal.bind(this);
        this.openAnswerModal = this.openAnswerModal.bind(this);
        this.closeAnswerModal = this.closeAnswerModal.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    setSearchTerm(searchTerm) {
        this.setState({ searchTerm });
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
        const { qas, searchTerm, modalQuestionOpen, selectedQuestion, modalAnswerOpen } = this.state;
        let qasToRender = [];
        if (searchTerm !== '') {
            qasToRender = qas.filter((qa) => qa.question_body.includes(searchTerm));
        } else {
            qasToRender = qas.slice(0, this.state.showCount);
        }

        return (
            <Container>
                <h2>Questions and Answers</h2>
                <SearchBar type="text" placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' onChange={(e) => this.setSearchTerm(e.target.value)}  />
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
                        <Question qa={qa} productId={this.props.productId}/>
                        <AnswersGroup answers={answersPrioritizingSeller} />
                    </QABlock>);
                })}
                <ButtonsContainer>
                    <Button type="button" onClick={() => this.expandQABlocks()}>
                        MORE ANSWERED QUESTIONS
                    </Button>
                    <Button type="button" onClick={() => this.openQuestionModal()}>
                        ADD A QUESTION +
                    </Button>
                </ButtonsContainer>
                <ModalQuestion
                    isOpen={modalQuestionOpen}
                    close={() => this.closeQuestionModal()}
                    productId={this.props.productId}
                    overview={this.props.overview}
                >
                    Placeholder
                </ModalQuestion>

                <ModalAnswer
                    questionId={selectedQuestion}
                    isOpen={modalAnswerOpen}
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

// export default QuestionAnswer;
export default withAnalytics(QuestionAnswer, 'questionAnswer');
