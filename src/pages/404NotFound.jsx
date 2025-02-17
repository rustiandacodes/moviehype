import React from 'react';
import notFound from '../assets/notfound.png';

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen theme-switch">
      <img className="md:w-1/2" src={notFound} alt="not found " />
    </div>
  );
};
