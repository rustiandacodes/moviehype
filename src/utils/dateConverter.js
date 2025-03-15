export const dateConverter = (d) => {
  const date = new Date(d);
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return day;
};

export const yearConverter = (d) => {
  return d.slice(0, 4);
};
