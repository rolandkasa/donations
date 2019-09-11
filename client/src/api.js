export default class Api{
    url = 'http://localhost:8080'

    addContact = (contact) => {
        return fetch(`${this.url}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
          }).then(res => res.json())
    }

    getAllContacts = () => {
        return fetch(`${this.url}/contact`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
    }

    donate = (donation) => {
        return fetch(`${this.url}/donate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation),
          }).then(response => response.json())
    }

    getDonations = () => {
        return fetch(`${this.url}/donations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).then(response => response.json())
    }
}