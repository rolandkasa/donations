import Api from '../api'

const api = new Api()
// types of action
const Types = {
    CREATE_CONTACT: "CREATE_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT",
    UNSUCCESSFUL_REQUEST: "UNSUCCESSFUL_REQUEST"
};
// actions
const createItem = (contact) => {
    api.addContact(contact).then((contact) => {
        return {
            type: Types.CREATE_CONTACT,
            payload: contact
        }
    }).catch((err) => {
        return {
            type: Types.UNSUCCESSFUL_REQUEST,
            payload: null,
            error: err
        } 
    })
}

const deleteItem = id => ({
    type: Types.DELETE_CONTACT,
    payload: id
});

export default {
    createItem,
    deleteItem,
    Types
};