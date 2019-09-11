
import React, { Component } from "react";
import {
  withStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import ACTIONS from "../actions/donation_actions";
import { connect } from "react-redux";

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
      return this.props.donations ?  this.props.donations.map(donation => (
        <ListItem key={donation.id}>
          <div>
            Email: {donation.user.email}<br/>
            Amount: {donation.amount}<br/>
            Donated At: {donation.createdAt}
          </div>
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      )): ""
    };
  
    componentDidMount(){
      this.props.listDonations();
      this.setState({isLoading: false})
    }
  
  
    handleSubmit = event => {
      if (this.state.donation !== "") {
        // add the item to the store
        this.props.donate(this.state.donation);
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
          <div className={classes.form}>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <h3>Donations</h3>
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
                <Button onClick={this.handleSubmit}>Donate</Button>
              </FormControl>
            </form>
          </div>
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
    donations: state.donationReducer.donations
  });
  
const mapDispatchToProps = dispatch => ({
    donate: item => dispatch(ACTIONS.donate(item)),
    listDonations: () => dispatch(ACTIONS.listDonations()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Donation));