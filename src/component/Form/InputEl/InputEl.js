import React from 'react';
import { Form } from 'react-bootstrap';

const inputEl = props => (
    <Form.Group controlId="formBasicEmail">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} placeholder={props.placeholder} onChange={props.changed} />
    </Form.Group>
)

export default inputEl;