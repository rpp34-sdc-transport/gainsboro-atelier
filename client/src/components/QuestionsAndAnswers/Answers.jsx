import React from 'react';

const Answer = (props) =>  {
    const { body, date, helpfulness, photos } = props;

    return (
        <div key={body} >
            <span style={{ fontWeight: 600 }}>A:</span> {body}
        </div>
    );

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


