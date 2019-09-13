
import React, { Component } from "react";
import {
  withStyles,
  List,
  ListItem,
  IconButton,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ACTIONS from "../actions/contact_actions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
  },
  form:{
    left: "50%",
    textAlign: "center",
    margin: "auto",
    width: "100%"
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class Contact extends Component {
  state = {
      contact: {

      },
      isLoading: true
  };

  generate = () => {
    return this.props.contacts ?  this.props.contacts.map(contact => (
      <ListItem key={contact.id}>
        <div>
          Name: {contact.firstName} {contact.lastName}<br/>
          Company: {contact.company}<br/>
          Phone: {contact.phone}<br/>
        </div>
          <IconButton
            aria-label="Delete"
            onClick={() => {this.handleDelete(contact.id)}}
            value={contact.id}
          >
            <DeleteIcon />
          </IconButton>
      </ListItem>
    )): ""
  };

  componentDidMount(){
    this.props.getAll();
    this.setState({isLoading: false})
  }


  handleSubmit = event => {
    if (this.state.contact !== "") {
      // add the item to the store
      this.props.createItem(this.state.contact);
    }
    this.setState({ contact: "" });
    event.preventDefault();
  };

  handleDelete = id => {
    this.props.deleteItem(id);
  };
  handleChange = (event,prop) => {
    let contact = this.state.contact;
    contact[event.target.name] = event.target.value
    this.setState(...this.state, contact);
  };

  render() {
    const { classes } = this.props;

    return (this.state.isLoading ? "Loading":  
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Contact</h1>
          </header>
          {this.props.user ? (
            <div className={classes.form}>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
              <Button className="fixed-line-height" onClick={this.handleSubmit}>Add</Button>
            </FormControl>
          </form>
        </div>
          ): (<div />)}
        
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
    contacts: state.contactReducer.contacts,
    user: state.auth.user
  });
  
  const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
    getAll: () => dispatch(ACTIONS.getAll())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Contact));