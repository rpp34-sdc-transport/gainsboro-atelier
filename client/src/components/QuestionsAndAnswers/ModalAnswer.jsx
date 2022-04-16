import React from 'react';
import styled from 'styled-components';

import { UploadPhotos } from './UploadPhotos.jsx';


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
    photos: [],
}

export class ModalAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
        this.saveQuestion = this.saveQuestion.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    updateField(value, field) {
        this.setState({
            [field]: value
        })
    }

    saveQuestion() {
        fetch(`/qa/questions/${this.props.questionId}/answers`, {
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
                    <h5>Submit your Answer</h5>
                    <h7>{this.props.overview.name}: {this.props.question}</h7>
                    <label>Your Answer *</label>
                    <input value={this.state.body} onChange={(e) => this.updateField(e.target.value, 'body')} />
                    <label>What is your nickname *</label>
                    <input value={this.state.name} onChange={(e) => this.updateField(e.target.value, 'name')} 
                    placeholder='Example: jack543!'/>
                    <label>For privacy reasons, do not use your full name or email address</label>
                    <label>Your email *</label>
                    <input 
                        type='email'
                        value={this.state.email} 
                        onChange={(e) => this.updateField(e.target.value, 'email')}
                        placeholder='Example: jack@email.com'
                    />
                    <label>For authentication reasons, you will not be emailed</label>
                    <UploadPhotos 
                        limit={5}
                        photos={this.state.photos}
                        updatePhotos={(photos) => this.updateField(photos, 'photos')} 
                    />
                    <button onClick={this.saveQuestion}>Submit answer</button>
                </Content>

            </ModalBody>
        )
    }
}