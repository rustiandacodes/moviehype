import React from 'react';

export const HeaderSection = (props) => {
  return (
    <div className="dark:text-seasalt text-xl font-bold p-2">
      <p className="border-l-4 w-fit px-2 border-red-500">{props.title}</p>
    </div>
  );
};
