import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://64c1271ffa35860baea015c0.mockapi.io/contacts',
});

export async function fetchAllContacts() {
    const { data } = await instance.get('');
    return data;
}
export async function addContact(contact) {
    const { data } = await instance.post('', contact);
    return data;
}
export async function deleteContact(id) {
    const { data } = await instance.delete(`/${id}`);
    return data;
}
