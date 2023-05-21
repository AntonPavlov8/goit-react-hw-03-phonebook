import { useEffect } from 'react';
import { useState } from 'react';
import { PhoneBook } from './PhoneBook';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    isInitialRender: true,
  });
  console.log('STATE OF SHIT = ', state);
  // Effect for initial data retrieval
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setState(prevState => ({
        ...prevState,
        contacts: [...parsedData],
        isInitialRender: false,
      }));
    }

    return () => {
      console.log('FUCKING UNMOUNT');
      localStorage.setItem('SHIT', 'shit small');
    };
  }, []);

  // Effect for subsequent storage updates
  useEffect(() => {
    if (!state.isInitialRender) {
      console.log('HERE SOME SHIT');
      localStorage.setItem('myData', JSON.stringify(state.contacts));
    }
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
      <button onClick={() => localStorage.setItem('SHIT', 'shit small button')}>
        in local storage?
      </button>
      <PhoneBook state={state} setState={setState} />
    </div>
  );
};
