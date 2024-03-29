import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './container/container';
import ContactForm from './contactForm/contactForm';
import ContactsList from './contactsList/contactsList';
import Filter from './filter/filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    if (this.state.contacts.find(el => el.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  formSubmitHandler = data => {
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
