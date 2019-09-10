// types of action
const Types = {
    CREATE_CONTACT: "CREATE_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT"
  };
  // actions
  const createItem = contact => ({
    type: Types.CREATE_CONTACT,
    payload: contact
  });
  
  const deleteItem = id => ({
    type: Types.DELETE_CONTACT,
    payload: id
  });
  
  export default {
    createItem,
    deleteItem,
    Types
  };