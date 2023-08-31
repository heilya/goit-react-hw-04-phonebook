import React, { useState, useEffect } from "react";
import { Filter } from "./filter/filter";
import ContactForm from "./contactform/contactform";
import { nanoid } from 'nanoid';
import { ContactList } from "./contactlist/contactlist";

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts"))??[]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);



  const handleSubmitForm = (name, number) => {
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      window.alert("This name is already in the contact list.");
      return;
    }
    setContacts(prevContacts => [...prevContacts, { name, number, id: nanoid() }]);
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const handleDelete = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: '#010101',
    }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmitForm}/>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange}/>
      <ContactList contacts={visibleContacts} onDelete={handleDelete}/>
    </div>
  );
};

export default App;
