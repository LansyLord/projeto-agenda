import axios from 'axios';
import { Contact } from '../models/contact.interface';

const api = axios.create({
  baseURL: 'http://localhost:3100', // Substitua pela URL da sua API Node.js
});

export const fetchContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar contatos: ${error}`);
  }
};

export const createContact = async (contact: Contact) => {
  try {
    const response = await api.post('/contacts', contact);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao cadastrar contato: ${error}`);
  }
};

export const updateContact = async (id: string, contact: Contact) => {
  try {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao editar contato: ${error}`);
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar contato: ${error}`);
  }
};
