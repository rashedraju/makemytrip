import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Redirect } from 'react-router-dom';

import InputEl from '../../component/Form/InputEl/InputEl';
import { updateObject } from '../../shared/utility';
import { Container, Form, Card, Button } from 'react-bootstrap';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: {
        name: {
          type: 'text',
          label: 'Full Name',
          placeholder: 'Full Name',
          value: '',
        },
        email: {
          type: 'email',
          label: "Email",
          placeholder: 'Username/Email',
          value: '',
        },
        password: {
          type: 'password',
          label: "Password",
          placeholder: 'Password',
          value: '',
        },
      },
    };
  }

  inputChangeHandler = (e, key) => {
    const formData = { ...this.state.signupForm };
    const updatedData = updateObject(formData, {
      [key]: {
        ...formData[key],
        value: e.target.value,
      },
    });

    this.setState({ signupForm: updatedData });
  };

  render() {
    const [formElement, formData] = [[], { ...this.state.signupForm }];
    for (const key in formData) {
      formElement.push({
        key,
        ...formData[key]
      });
    }

    const signupData = {
      name: this.state.signupForm.name.value,
      email: this.state.signupForm.email.value,
      password: this.state.signupForm.password.value,
    }

    let redirect = this.props.userAuthData.isAuthenticated ? <Redirect to="/" /> : null;
    return (
      <Container className="my-5">
        {redirect}
        <h4 className="text-center">User Signup</h4>
        <Card className="p-3 w-md-50 mx-auto">
          <Form onSubmit={(e) => {
            e.preventDefault();
            this.props.onSignup(signupData)
          }}>
            {[formElement.map(el => (
              <InputEl
                {...el}
                changed={(e) => this.inputChangeHandler(e, el.key)}
              />
            ))]}
            <Button variant="primary" type="submit" className="w-100 text-center"> SignUp </Button>
          </Form>
        </Card>

      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthData: state.auth.userAuthData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (data) => dispatch(actions.signup(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);