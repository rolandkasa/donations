import axios from 'axios'
const transport = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080' 
})

export default class Api{

    addContact = (contact) => {
        return transport.post(`/contact`, contact).then(res => res.data)
    }

    deleteContact = (id) => {
        return transport.delete(`/contact/${id}`).then(res => res.data)
    }

    getAllContacts = () => {
        return transport.get(`/contact`).then(res => res.data)
    }

    login = (user) => {
        return transport.post(`/login`,user).then(res => res.data)
    }

    register = (user) => {
        return transport.post('/user',user).then(res => res.data)
    }

    isAuthorized = () => {
        return transport.get('/is-authorized').then(res => res.data)
    }

    logout = () => {
        return transport.get(`/logout`).then(res => res.data)
    }

    donate = (donation) => {
        return transport.post(`/donate`, donation).then(res => res.data)
    }

    getDonations = () => {
        return transport.get(`/donations`).then(res => res.data)
    }
}