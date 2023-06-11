/** Конвертируем в дату */
export const formatDate= (dateString: string) => {
  //! с севера приходило дата неправильного формата, потратил много времени чтоб найти этот пробел
  const date = new Date(dateString.replace(' ', ''));
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() % 100).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

