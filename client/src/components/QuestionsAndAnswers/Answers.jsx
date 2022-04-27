import React from 'react';
import styled from 'styled-components';
import {MdCheckCircle, MdOutlineClose} from 'react-icons/md'


const VoteLink = styled.a`
  & {
    display: inline-block;
    width: 25px;
    margin-left: 5px;
    cursor: pointer;
    text-decoration: underline;
    color: #378f1e;
  }

  &:hover {
    font-weight: 900;
  }
`;

const Count = styled.span`
  margin: 0 6px;
`;

const CheckCircle = styled(MdCheckCircle)`
  color: #378f1e;s
`

const Message = styled.span`
  color: #378f1e;
  margin-left: 5px;
`;


const Button = styled.button`
  background: transparent;
  border: 2px solid #d4d4d4;
  color: #525252;
  padding: 15px 30px;
  margin-right: 40px;
`;

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpfulVoted: false,
            reported: this.props.reported || false 
        }
        this.saveHelpful = this.saveHelpful.bind(this);
    }
    
    saveHelpful() {
        fetch(`/qa/answers/${this.props.id}/helpful`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
                product_id: this.props.productId
            })
        })
        .then(() => {
            this.setState({
                helpfulVoted: true,
            })
        })
    }

    report() {
        fetch(`/qa/answers/${this.props.id}/report`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
                product_id: this.props.productId
            })
        })
        .then(() => {
            this.setState({
                reported: true,
            })
        })
    }
    
    render() {
        var formatedDate = new Date(this.props.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return (
        <>
            <div key={this.props.body} >
                <span style={{ fontWeight: 600 }}>A:</span> {this.props.body}
            </div>
            <small>
                by {this.props.answerer_name}, {formatedDate} | Helpful? 
                {this.state.helpfulVoted ? 
                    <>
                        <Count>({this.props.helpfulness + 1})</Count>
                        <CheckCircle />
                        <Message>Thank you for your feedback.</Message>
                    </> :
                    <>
                        <VoteLink onClick={() => this.saveHelpful()}>Yes</VoteLink>
                        <Count>({this.props.helpfulness})</Count>
                    </> 
                }
            <span>| </span>
            {this.state.reported ? 
                    <>
                        <VoteLink>Reported</VoteLink>
                    </> :
                    <>
                        <VoteLink onClick={() => this.report()}>Report</VoteLink>
                    </> 
            }
             </small>
        </>
        )
    }
}

export class AnswersGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
        this.flipExpanded = this.flipExpanded.bind(this);
    }

    flipExpanded() {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    // Up to two answers should display for each question.
    render() {
        const answersToRender = this.state.expanded ? this.props.answers : this.props.answers.slice(0, 2);

        return (
        <>
            {answersToRender.map((ans) => <Answer key={ans.body} {...ans} />)}
            <button onClick={this.flipExpanded}>
                {this.state.expanded ? 'Show less answers' : 'Load more answers'}
            </button>
        </>)
    }
}


