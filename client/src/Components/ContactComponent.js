
import React, { Component } from "react";
import {
  withStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ACTIONS from "../actions/contact_actions";
import { connect } from "react-redux";
import { stat } from "fs";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class Contact extends Component {
  state = {
      contact: {

      }
  };

  generate = () => {
    return this.props.contacts.map(contact => (
      <ListItem key={contact.id}>
        <ListItemText primary={contact.description} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={this.handleDelete}
            value={contact.id}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };


  handleSubmit = event => {
    if (this.state.contact !== "") {
      // add the item to the store
      this.props.createItem(this.state.contact);
    }
    this.setState({ contact: "" });
    event.preventDefault();
  };

  handleDelete = event => {
    this.props.deleteItem(event.target.value);
  };
  handleChange = (event,prop) => {
    let contact = this.state.contact;
    contact[event.target.name] = event.target.value
    this.setState(...this.state, contact);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <h3>Donation Contacts</h3>
            <FormControl>
              <TextField
                label="Email"
                id="margin-dense"
                value={this.state.contact.email}
                className={classes.textField}
                margin="dense"
                name="email"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Name"
                id="margin-dense"
                value={this.state.contact.name}
                className={classes.textField}
                margin="dense"
                name="name"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Phone"
                id="margin-dense"
                value={this.state.contact.phone}
                className={classes.textField}
                margin="dense"
                name="phone"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl>
              <Button onClick={this.handleSubmit}>Add</Button>
            </FormControl>
          </form>
        </div>
        <div>
          <Grid item container justify="space-evenly" alignItems="center">
            <div className={classes.demo}>
              <List dense={false}>{this.generate()}</List>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    contacts: state.contacts
  });
  
  const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Contact));