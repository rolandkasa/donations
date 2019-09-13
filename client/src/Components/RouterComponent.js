
import React, { Component } from "react";
import ACTIONS from "../actions/login_actions";
import { connect } from "react-redux";
import App from '../App';
import Register from '../Components/SignUpComponent'
import Login from '../Components/LoginComponent'
import Logout from '../Components/LogoutComponent'
import Contact from '../Components/ContactComponent'
import '../index.css';
// import packageJson from '../../package.json';
import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import logo from '../image2vector.svg'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class RouterComponent extends Component {
  componentDidMount() {
    this.props.isAuthorized()
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg">

            <Navbar.Brand href="/"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink exact activeClassName="activeRoute" to="/">Donate</NavLink>
                <NavLink activeClassName="activeRoute" to='/contact'>Contact</NavLink>
                {!this.props.user ? <NavLink activeClassName="activeRoute" to="/register">Sign-up</NavLink> : ""}
                {this.props.user ?
                  <NavLink className="navbar-right" to='/logout'>Logout</NavLink>
                  :
                  <NavLink activeClassName="activeRoute" to='/login'>Login</NavLink>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={App} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/contact' component={Contact} />
        </div>
        {/* {packageJson.version} */}
      </Router>
    )
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  isAuthorized: () => dispatch(ACTIONS.isAuthorized())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterComponent);