
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  };
  return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
}