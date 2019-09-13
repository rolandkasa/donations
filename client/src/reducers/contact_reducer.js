import ACTIONS from "../actions/contact_actions";
import _ from "lodash";

const defaultState = {
  contacts: []
};

const contactReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      let contact = action.payload.payload;
      let newContact = { id: state.contacts.length + 1, description: contact };
      let newState = _.cloneDeep(state);
      newState.contacts.push(newContact);
      return newState;
    }

    case ACTIONS.Types.GET_CONTACTS : {
      let newState = _.cloneDeep(state)
      newState.contacts = action.payload.payload
      return newState
    }

    case ACTIONS.Types.DELETE_CONTACT: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.contacts, { id: action.payload });
      newState.contacts.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default contactReducer;