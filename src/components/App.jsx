import { useState } from 'react';
import { PhoneBook } from './PhoneBook';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
  });

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
