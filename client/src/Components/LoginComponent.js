
import React, { Component } from "react";
import {
  withStyles,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import ACTIONS from "../actions/login_actions";
import { connect } from "react-redux";
import _ from 'lodash'

const styles = theme => ({

})

class Login extends Component {
    state = {
        user: {},
        isLoading: true
    }

    componentDidMount(){
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

      handleLogoutIntent = event => {
          this.props.logout()
      }
  
      render() {
        const { classes } = this.props;
        return ( this.state.isLoading ? "Loading": !_.isEmpty(this.props.user) ? 
          <div>
            <FormControl>
                  <Button onClick={this.handleLogoutIntent}>Logout</Button>
                </FormControl>
          </div>
        :
          (<div>
            <div className={classes.form}>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <FormControl>
                  <TextField
                    label="Email"
                    id="margin-dense"
                    value={this.state.user.email}
                    className={classes.textField}
                    margin="dense"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                  id="standard-password-input"
                  label="Password"
                  value={this.state.user.password}
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  name="password"
                  onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <Button onClick={this.handleSubmit}>Login</Button>
                </FormControl>
              </form>
            </div>
          </div>)
        );
      }

}

const mapStateToProps = state => ({
    user: state.auth.user
  });
  
  const mapDispatchToProps = dispatch => ({
    login: item => dispatch(ACTIONS.login(item)),
    logout: () => dispatch(ACTIONS.logout())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Login));