
import React, { Component } from "react";
import ACTIONS from "../actions/login_actions";
import { connect } from "react-redux";
import {Form,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import _ from 'lodash'

class Login extends Component {
    state = {
        user: {},
        isLoading: true
    }

    componentDidMount(){
      this.props.isAuthorized()
      this.setState({...this.state, isLoading: false})
    }

    handleSubmit = event => {
        if (this.state.user !== {}) {
          // add the item to the store
          this.props.login(this.state.user);
        }
        this.setState({ user: {} });
        event.preventDefault();
      };
    
      handleChange = (event,prop) => {
        let user = this.state.user;
        user[event.target.name] = event.target.value
        this.setState(...this.state, user); 
      };
  
      render() {
        if ( !_.isEmpty(this.props.user) ){
          return <Redirect to='/'></Redirect>
        }

        return (
          <div className="App">
          <header className="App-header">
            <h1 className="App-title">Login</h1>
          </header>
          <div className="signup-container">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
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
    login: item => dispatch(ACTIONS.login(item)),
    isAuthorized: () => dispatch(ACTIONS.isAuthorized())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);