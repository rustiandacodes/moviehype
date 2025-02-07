import React from 'react';

export const Button = (props) => {
  const { desc } = props;
  return (
    <div className="flex justify-center">
      <button className="bg-red-500 md:w-xs w-full text-seasalt p-2 rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition duration-300">{desc}</button>
    </div>
  );
};
