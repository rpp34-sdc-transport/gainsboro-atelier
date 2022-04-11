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

export class Modal extends React.Component {

    render() {
        return (
            <ModalBody style={{ display: this.props.isOpen ? 'block' : 'none' }}>
                <Content >
                    <Close onClick={this.props.close}>&times;</Close>
                    <p>Some text in the Modal..</p>
                </Content>

            </ModalBody>
        )
    }
}