import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import { Container, Card, Form, Button } from 'react-bootstrap';
import LoginForm from '../../component/Form/LoginForm/LoginForm';

const adminLogin = props => {
    let redirect = props.adminAuthData.isAuthenticated ? <Redirect to="/admin" /> : null;
    return (
        <Container className="my-5">
            {redirect}
            <h3 className="text-center m-2">Admin Login</h3>
            <Card className="p-3 w-md-50 mx-auto">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    props.onLogin(props.loginForm);
                }}>
                    {<LoginForm />}
                    <Button variant="primary" type="submit" className="w-100 text-center"> Login </Button>
                </Form>
            </Card>

        </Container>
    );
}

const mapStateToProps = state => {
    return {
        loginForm: {
            ...state.auth.loginForm,
            method: 'adminLogin'
        },
        adminAuthData: state.auth.adminAuthData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (data, method) => dispatch(actions.onLogin(data, method))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(adminLogin);