import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Navbar, Container, Button, Form } from 'react-bootstrap';
import Logo from '../UI/Logo/Logo';
import Modal from '../UI/Modal/Modal';
import { ReactComponent as PersonIcon } from '../../assets/svg/person-circle-outline.svg';
import LoginForm from '../Form/LoginForm/LoginForm';

const Navigation = (props) => {
    const { userAuthData, adminAuthData } = props;
    return (
        <Navbar bg="primary" className="Navigation py-0">
            <Container>
                <Navbar.Brand
                    className="navbar-brand d-flex align-items-center cursor-pointer"
                    onClick={() => {
                        props.history.replace(adminAuthData.isAuthenticated ? '/admin' : '/')
                    }} >
                    <Logo />
                    <span className="text-white font-weight-bold mx-2">MakeMyTrip </span>
                </Navbar.Brand>
                {props.location.pathname !== '/admin-login' ? (
                    <Button onClick={() => {
                        if (userAuthData.isAuthenticated) {
                            const username = userAuthData.username.toLowerCase().replace(' ', '');
                            props.history.replace('/user/' + username);
                        } else if (adminAuthData.isAuthenticated) {
                            props.history.replace('/admin');
                        } else {
                            props.onShowModal();
                        }
                    }} className="login__btn d-flex align-items-center">
                        <PersonIcon fill="#fff" width="28" height="28" />
                        &nbsp;
                        <span>
                            {
                                userAuthData.isAuthenticated || adminAuthData.isAuthenticated ? userAuthData.username || adminAuthData.username : 'Login'
                            }
                        </span>
                    </Button>
                ) : null}

                <Modal
                    show={props.showModal}
                    onHide={() => props.onShowModal()}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        props.onLogin(props.loginForm);
                    }}>
                        {<LoginForm />}
                        <Button type="submit" className="w-100 text-center"> Login </Button>
                        <div className="text-center p-1">Dont have an account? <NavLink to="/user-signup" onClick={() => props.onShowModal()}>SignUp</NavLink></div>
                    </Form>
                </Modal>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        loginForm: {
            ...state.auth.loginForm,
            method: 'userLogin'
        },
        userAuthData: state.auth.userAuthData,
        adminAuthData: state.auth.adminAuthData,
        showModal: state.auth.showLoginModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (data, method) => dispatch(actions.onLogin(data, method)),
        onShowModal: () => dispatch(actions.showLoginModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));