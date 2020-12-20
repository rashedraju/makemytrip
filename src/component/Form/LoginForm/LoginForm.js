import React from 'react';
import { Form } from 'react-bootstrap';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const login = (props) => {
    return (
        <Aux>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Username/Enter email" onChange={(e) => {
                    e.persist();
                    props.onChanged('email', e.target.value)
                }} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => {
                    e.persist();
                    props.onChanged('password', e.target.value)
                }} />
                <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>
        </Aux>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onChanged: (key, value) => dispatch(actions.inputChanged(key, value))
    }
}

export default connect(null, mapDispatchToProps)(login);