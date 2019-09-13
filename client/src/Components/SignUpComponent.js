
import React, { Component } from "react";
import ACTIONS from "../actions/login_actions";
import { connect } from "react-redux";
import { Form, Button } from 'react-bootstrap'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'


class Register extends Component {
  state = {
    user: {},
    isLoading: true
  }

  componentDidMount() {
    this.props.isAuthorized()
    this.setState({ ...this.state, isLoading: false })
  }

  handleSubmit = event => {
    const user = this.state.user;
    if (this.state.user !== {}) {
      if (user.password === user.repeatPassword) {
        // add the item to the store
        this.props.register(this.state.user);
      }
    }
    this.setState({ user: {} });
    event.preventDefault();
  };

  handleChange = (event, prop) => {
    let user = this.state.user;
    user[event.target.name] = event.target.value
    this.setState(...this.state, user);
  };

  render() {
    if (!_.isEmpty(this.props.user)) {
      return <Redirect to='/'></Redirect>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up</h1>
        </header>
        <div className="signup-container">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Password" name="username" value={this.state.username} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Repeat Password" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>)
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(ACTIONS.register(user)),
  isAuthorized: () => dispatch(ACTIONS.isAuthorized())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);