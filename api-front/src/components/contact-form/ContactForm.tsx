// ContactForm.tsx

import React, { useState, useEffect } from 'react';
import './ContactForm.css'; 

import { Contact } from '../../models/contact.interface';
import { fetchContacts, createContact, updateContact } from '../../service/api-service';
import { User } from '../../models/user.interface';

const ContactForm: React.FC = () => {

    const [users] = useState<User[]>([]); // Alterado para 'users'
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contact, setContact] = useState<Contact>({
        id: '',
        name: '',
        email: '',
        phone: '',
        userEmail: '', // Supondo que você passe o email do usuário como header na API
    });
    const [btnCadastro, setBtnCadastro] = useState(true);

    useEffect(() => {
        // Buscar contatos ao carregar o componente
        fetchContacts().then(data => setContacts(data)).catch(error => console.error('Erro ao buscar contatos', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserEmail = e.target.value;
        setContact(prevContact => ({
            ...prevContact,
            userEmail: selectedUserEmail,
        }));
    };

    const registrarContact = async () => {
        try {
            const newContact = await createContact(contact);
            setContacts([...contacts, newContact]);
            setContact({ id: '', name: '', email: '', phone: '', userEmail: contact.userEmail });
        } catch (error) {
            console.error('Erro ao cadastrar contato', error);
        }
    };

    const editarContact = async () => {
        try {
            const updatedContact = await updateContact(contact.id, contact);
            setContacts(contacts.map(c => c.id === contact.id ? updatedContact : c));
            setBtnCadastro(true);
            setContact({ id: '', name: '', email: '', phone: '', userEmail: contact.userEmail });
        } catch (error) {
            console.error('Erro ao editar contato', error);
        }
    };

    const cancelar = () => {
        setContact({
            id: '',
            name: '',
            email: '',
            phone: '',
            userEmail: '',
        });
        setBtnCadastro(true);
    };

    return (
        <form>
            <nav>
                <h2>Agenda</h2>
            </nav>
            <img src="src/assets/contacts_icon.png" alt="Ícone de Contato" />

            <div className="form-group">
                <label htmlFor="userSelect">
                    <h3>Cadastro de Contato</h3>
                </label>
                <select className="form-control" id="userSelect" value={contact.userEmail} onChange={handleSelectChange}
                    name="userEmail">
                    <option value="" disabled>
                        Selecione um Usuário
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="text" placeholder="Nome" className="form-control" name="name" value={contact.name}
                onChange={handleInputChange} />
            <input type="email" placeholder="Email" className="form-control" name="email" value={contact.email}
                onChange={handleInputChange} />
            <input type="text" placeholder="Telefone" className="form-control" name="phone" value={contact.phone}
                onChange={handleInputChange} />

            {btnCadastro ? (
                <input type="button" value="Cadastrar" className="btn btn-primary" onClick={registrarContact} data-toggle="tooltip"
                    data-placement="bottom" title="Cadastre um contato" />
            ) : (
                <>
                    <input type="button" value="Salvar" className="btn btn-success" onClick={editarContact} />
                    <input type="button" value="Cancelar" className="btn btn-secondary" onClick={cancelar} />
                </>
            )}
        </form>
    );
};

export default ContactForm;
