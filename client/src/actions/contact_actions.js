import Api from '../api'

const api = new Api()
// types of action
const Types = {
    CREATE_CONTACT: "CREATE_CONTACT",
    CONTACT_STARTED: "CONTACT_STARTED",
    GET_CONTACTS: "GET_CONTACTS",
    DELETE_CONTACT: "DELETE_CONTACT",
    UNSUCCESSFUL_REQUEST: "UNSUCCESSFUL_REQUEST"
};
// actions
const createItem = (contact) => {
    return dispatch => {
        dispatch({
            type: Types.CONTACT_STARTED
        })

        api.addContact(contact).then((contact) => {
            dispatch({
                type: Types.CREATE_CONTACT,
                payload: contact
            })
        }).catch((err) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: err
            })
        })
    }
}

const getAll = () => {
    return dispatch => {
        dispatch({
            type: Types.CONTACT_STARTED
        })
        api.getAllContacts().then((contacts) => {
            dispatch({
                type: Types.GET_CONTACTS,
                payload: contacts
            })
        }).catch((error) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: error
            })
        })
    }

}

const deleteItem = (id) => {
    return dispatch => {
        dispatch({
            type: Types.CONTACT_STARTED
        })
        api.deleteContact(id).then((response) => {
            dispatch({
                type: Types.DELETE_CONTACT,
                payload: id
            })
        }).catch((error) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: error
            })
        })
    }
}

export default {
    createItem,
    deleteItem,
    getAll,
    Types
};