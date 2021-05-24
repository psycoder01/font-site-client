import { useState } from 'react';

export const Home = () => {
  const [home, setHome] = useState('hooome');

  return <h1>{home}</h1>;
};
