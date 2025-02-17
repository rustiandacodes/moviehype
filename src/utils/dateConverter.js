export const dateConverter = (d) => {
  const date = new Date(d);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return day;
};
