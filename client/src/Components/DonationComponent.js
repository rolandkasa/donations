
import React, { Component } from "react";
import {
  withStyles,
  List,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import {Table} from 'react-bootstrap'
import ACTIONS from "../actions/donation_actions";
import USER_ACTIONS from '../actions/login_actions'
import { connect } from "react-redux";
import moment from 'moment'

const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
    }
  });
  
  class Donation extends Component {
    state = {
        donation: {

        },
        isLoading: true
    };
  
    generate = () => { 
      const total = this.props.donations.reduce((acc, curr) => {
        return acc + Number(curr.amount)
      }, 0)
      return (<Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {this.props.donations ?  this.props.donations.map(donation => (
        <tr>
           <td>{donation.user.email}</td>
           <td>{donation.amount} RON</td>
           <td>{moment(donation.createdAt).format('Y-MMMM-D')}</td>
        </tr>
      )): ""}
        </tbody>
        <p><b>Total donated since start: {total} RON</b></p>
      </Table>)
    };

    componentDidMount(){
      this.props.listDonations();
      this.setState({isLoading: false})
    }
  
  
    handleSubmit = event => {
      const user = this.props.user
      if (this.state.donation !== "" && user) {
        let donation = this.state.donation
        donation.user = user._id

        // add the item to the store
        this.props.donate(donation);
      }
      this.setState({ donation: "" });
      event.preventDefault();
    };
  
    handleChange = (event,prop) => {
      let donation = this.state.donation;
      donation[event.target.name] = event.target.value
      this.setState(...this.state, donation);
    };
  
    render() {
      const { classes } = this.props;
  
      return ( this.state.isLoading ? "Loading": 
        <div>
          {this.props.user ? (
            <div className={classes.form}>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <FormControl>
                <TextField
                  label="Amount"
                  id="margin-dense"
                  value={this.state.donation.amount}
                  className={classes.textField}
                  margin="dense"
                  name="amount"
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl>
                <Button className="fixed-line-height" onClick={this.handleSubmit}>Donate</Button>
              </FormControl>
            </form>
          </div>
          ) : (<div/>)}
          
          <div className={classes.demo}>
            <Grid item container justify="space-evenly" alignItems="center">
              <div>
                <List dense={false}>{this.generate()}</List>
              </div>
            </Grid>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
    donations: state.donationReducer.donations,
    user: state.auth.user
  });
  
const mapDispatchToProps = dispatch => ({
    donate: item => dispatch(ACTIONS.donate(item)),
    listDonations: () => dispatch(ACTIONS.listDonations()),
    isAuthorized: () => dispatch(USER_ACTIONS.isAuthorized())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Donation));