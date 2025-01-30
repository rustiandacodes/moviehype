import React from 'react';

export const Home = () => {
  console.log(import.meta.env.VITE_SOME_KEY); // "123"
  console.log(import.meta.env.VITE_DB_PASSWORD); // undefined

  return <div>Home</div>;
};
