import React, { useState } from 'react';
import './style.css';
import GetData from './getData.js';
import NameFull from './getName.js';

export default function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log('clicking');
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={handleDecrement}> Decrement </button>
      <p>{counter}</p>
      {/* <GetData /> */}

      <NameFull />
    </div>
  );
}
