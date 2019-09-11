import Api from '../api'

const api = new Api()
// types of action
const Types = {
    DONATION_STARTED: "DONATION_STARTED",
    LIST_DONATIONS: "LIST_DONATIONS",
    CREATE_DONATION: "CREATE_DONATION",
    DELETE_DONATION: "DELETE_DONATION",
    UNSUCCESSFUL_DONATION_REQUEST: "UNSUCCESSFUL_REQUEST"
};
// actions
const donate = (donation) => {
    return dispatch => {
        dispatch({
            type: Types.DONATION_STARTED
        })

        api.donate(donation).then((donation) => {
            dispatch({
                type: Types.CREATE_DONATION,
                payload: donation
            })
        }).catch((err) => {
            dispatch({
                type: Types.UNSUCCESSFUL_DONATION_REQUEST,
                payload: null,
                error: err
            })
        })
    }
}

const listDonations = () => {
    return dispatch => {
        dispatch({
            type: Types.DONATION_STARTED
        })

        api.getDonations().then((donations) => {
            dispatch({
                type: Types.LIST_DONATIONS,
                payload: donations
            })
        }).catch((err) => {
            dispatch({
                type: Types.UNSUCCESSFUL_DONATION_REQUEST,
                payload: null,
                error: err
            })
        })
    }
}

export default {
    donate,
    listDonations,
    Types
};