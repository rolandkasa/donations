
import React, { Component } from "react";
import ACTIONS from "../actions/login_actions";
import { connect } from "react-redux";
import _ from 'lodash'
import { Redirect } from 'react-router-dom'


class Logout extends Component {
    componentWillMount(){
        this.props.logout()
    }

    render() {
        return (<Redirect to="/"/>)
    }

}

const mapStateToProps = state => ({
    user: state.auth.user
});
  
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(ACTIONS.logout()),
    isAuthorized: () => dispatch(ACTIONS.isAuthorized())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);