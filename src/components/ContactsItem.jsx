export const ContactsItem = ({ contact, setState, setSearchResults }) => {
  function deleteContact(contactId) {
    setState(prev => {
      return {
        ...prev,
        contacts: [
          ...prev.contacts.filter(person => {
            return person.id !== contactId;
          }),
        ],
      };
    });
    setSearchResults(prev => {
      return {
        ...prev,
        results: [
          ...prev.results.filter(person => {
            return person.id !== contactId;
          }),
        ],
      };
    });
  }
  return (
    <li>
      {contact.name}
      {': '}
      {contact.number}

      <button type="button" onClick={() => deleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
};
