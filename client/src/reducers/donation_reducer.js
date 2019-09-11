import ACTIONS from "../actions/donation_actions";
import _ from "lodash";

const defaultState = {
  donations: []
};

const donationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_DONATION: {
      let donation = action.payload.payload;
      let newState = _.cloneDeep(state);
      newState.donations.push(donation);
      return newState;
    }

    case ACTIONS.Types.LIST_DONATIONS : {
      let newState = _.cloneDeep(state)
      newState.donations = action.payload.payload
      return newState
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.contacts, { id: action.payload.payload });
      newState.contacts.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default donationReducer;