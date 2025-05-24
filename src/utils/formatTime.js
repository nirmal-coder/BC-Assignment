export const formatTime = (date) => {
  const validDate = new Date(date);

  if (isNaN(validDate)) return "Invalid Date";

  let hours = validDate.getHours();
  const minutes = validDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const strHours = hours < 10 ? "0" + hours : hours;
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${strHours}:${strMinutes} ${ampm}`;
};
