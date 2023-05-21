import { useEffect } from 'react';
import { useState } from 'react';
import { PhoneBook } from './PhoneBook';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    isInitialRender: true,
  });

  function updateLocalStorage() {
    if (state.isInitialRender) {
      const storedData = localStorage.getItem('myData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setState(() => {
          return {
            contacts: [...parsedData],
            isInitialRender: false,
          };
        });
      }
    } else {
      localStorage.setItem('myData', JSON.stringify(state.contacts));
    }
  }

  useEffect(() => {
    updateLocalStorage();
  }, [state]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <PhoneBook state={state} setState={setState} />
    </div>
  );
};
