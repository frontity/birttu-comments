// Support Safari on iOS > 9 & < 10
const padZeros = value => `${'0'.repeat(2 - `${value}`.length)}${value}`;

export const formatDate = millis => {
  const d = new Date(millis);
  const year = d.getFullYear();
  const month = padZeros(d.getMonth() + 1);
  const day = padZeros(d.getDate());

  return `${year}-${month}-${day}`;
};

export const formatTime = millis => {
  const d = new Date(millis);
  const hours = d.getHours();
  const hours12 = hours % 12 || 12;
  const period = hours < 12 ? 'am' : 'pm';
  const minutes = padZeros(d.getMinutes());

  return `${hours12}:${minutes} ${period}`;
};
