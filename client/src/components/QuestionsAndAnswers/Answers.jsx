

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    flipExpanded() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const { body, date, helpfulness, photos } = this.props;

        return (
            <>
                <div key={body} style={{ display: i < 2 || this.expanded ? 'block' : 'none' }}>
                    <span style={{ fontWeight: 600 }}>A:</span> {body}
                </div>
                <button 
                    onClick={() => this.flipExpanded}
                >
                    {this.state.expanded ? 'Show less answers' : 'Load more answers'}
                </button>
            </>
        );
    }
}
