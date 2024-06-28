import { Component } from 'react';
import { Contact } from '../../models/contact.interface';
import { fetchContacts } from '../../service/api-service';

interface ContactTableState {
    contacts: Contact[];
    tabela: boolean;
}

class ContactTable extends Component<object, ContactTableState> {
    constructor(props: object) {
        super(props);
        this.state = {
            contacts: [],
            tabela: true,
        };
    }

    componentDidMount() {
        fetchContacts()
            .then((data) => this.setState({ contacts: data }))
            .catch((error) => console.error('Erro ao buscar contatos', error));
    }

    selecionarContact = (index: number) => {
        // Lógica para selecionar um contato
        console.log(`Selecionar contato at index ${index}`);
    };

    removerContact = (index: number) => {
        // Lógica para remover um contato
        const { contacts } = this.state;
        const updatedContacts = contacts.filter((_, i) => i !== index);
        this.setState({ contacts: updatedContacts });
    };

    render() {
        const { contacts, tabela } = this.state;

        if (!tabela) return null;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuário</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{c.userEmail}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => this.selecionarContact(i)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.removerContact(i)}
                                >
                                    Apagar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default ContactTable;