import { combineReducers } from 'redux'
import contactReducer from './contact_reducer'
import donationReducer from './donation_reducer'

export default combineReducers({
    contactReducer,
    donationReducer
})