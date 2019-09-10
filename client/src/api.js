export default class Api{
    url = 'http://localhost:8080'

    addContact = (contact) => {
        const response = fetch(`${this.url}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
          })
        return response
    }
}