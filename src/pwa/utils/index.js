export const formatDate = millis => {
  const d = new Date(millis);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatTime = millis => {
  const d = new Date(millis);
  const hours = d.getHours();
  const hours12 = hours % 12 || 12;
  const period = hours < 12 ? 'am' : 'pm';
  const minutes = `${d.getMinutes()}`.padStart(2, '0');

  return `${hours12}:${minutes} ${period}`;
};
