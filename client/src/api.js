export default class Api{
    url = 'http://localhost:8080'

    addContact = (contact) => {
        return fetch(`${this.url}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(contact),
          }).then(res => res.json())
    }

    getAllContacts = () => {
        return fetch(`${this.url}/contact`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
    }

    login = (user) => {
        return fetch(`${this.url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(user),
          }).then(res => res.json())
    }

    logout = () => {
        return fetch(`${this.url}/logout`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
    }

    donate = (donation) => {
        return fetch(`${this.url}/donate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation),
            credentials: 'same-origin',
          }).then(response => response.json())
    }

    getDonations = () => {
        return fetch(`${this.url}/donations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).then(response => response.json())
    }
}