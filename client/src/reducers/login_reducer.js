import ACTIONS from "../actions/login_actions";
import _ from "lodash";

const defaultState = {
  user: {}
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.LOGIN: {
      let user = action.payload.payload;
      let newState = _.cloneDeep(state);
      newState.user = user;
      return newState;
    }

    case ACTIONS.Types.LOGOUT : {
      let newState = _.cloneDeep(state)
      newState.user = {}
      return newState
    }

    default:
      return state;
  }
};

export default loginReducer;