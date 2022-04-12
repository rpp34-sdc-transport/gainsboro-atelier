import React from 'react';
import styled from 'styled-components';


// https://www.w3schools.com/howto/howto_css_modals.asp
const ModalBody = styled.div`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const Content = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 60%;
    justify-content: space-between;
`;

const Close = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

    &:hover {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`
const initState = {
    body: '',
    name: '',
    email: '',
}

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
        this.saveQuestion = this.saveQuestion.bind(this);
        this.updateQuestion = this.updateField.bind(this);
    }

    updateField(value, field) {
        this.setState({
            [field]: value
        })
    }

    saveQuestion() {
        fetch('/qa/questions', {
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
            this.setState({...initState});
            this.props.close();
        })
    }

    render() {
        return (
            <ModalBody style={{ display: this.props.isOpen ? 'block' : 'none' }}>
                <Content >
                    <Close onClick={this.props.close}>&times;</Close>
                    <label>Question</label>
                    <input value={this.state.body} onChange={(e) => this.updateField(e.target.value, 'body')} />
                    <label>Email</label>
                    <input 
                        type='email'
                        value={this.state.email} 
                        onChange={(e) => this.updateField(e.target.value, 'email')} 
                    />
                    <label>Name</label>
                    <input value={this.state.name} onChange={(e) => this.updateField(e.target.value, 'name')} />
                    <button onClick={this.saveQuestion}>Add a question</button>
                </Content>

            </ModalBody>
        )
    }
}