import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { Contacts } from './Contacts';
export const PhoneBook = prop => {
  const nameInput = useRef(null);

  const pattern = {
    name: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    tel: '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
  };

  const { state, setState } = prop;

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    if (
      state.contacts.filter(contact => {
        return contact.name === name;
      }).length === 0
    ) {
      form.reset();
      setState(prev => {
        let newNumber;
        switch (number.length) {
          case 10: {
            const string1 = number.substring(0, 3);
            const string2 = number.substring(3, 6);
            const string3 = number.substring(6, 10);
            newNumber = `${string1}-${string2}-${string3}`;
            break;
          }
          case 12: {
            if (number[0] === '+') {
              const string1 = number.substring(0, 2);
              const string2 = number.substring(2, 5);
              const string3 = number.substring(5, 8);
              const string4 = number.substring(8, 12);
              newNumber = `${string1}-${string2}-${string3}-${string4}`;
            }
            break;
          }
          default:
            newNumber = number;
            break;
        }
        return {
          ...prev,
          contacts: [
            ...prev.contacts,
            {
              id: nanoid(),
              name: name,
              number: newNumber,
            },
          ],
        };
      });
    } else {
      alert(`${name} is already in contacts.`);
      nameInput.current.focus();
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: '1px #000 solid',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '280px',
          padding: '48px 24px',
        }}
      >
        <span>Name</span>
        <input
          ref={nameInput}
          type="text"
          name="name"
          pattern={pattern.name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
        />
        <span>Number</span>
        <input
          type="tel"
          name="number"
          pattern={pattern.tel}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button action="submit">Add contact</button>
      </form>
      <Contacts state={state} setState={setState} />
    </div>
  );
};
