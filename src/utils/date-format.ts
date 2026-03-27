export const formatDate = (date: string = ""): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
};

export const serializeDate = (date: string = ""): string => {
  if (!date) return "N/A";
  const datePart = date.split("T");
  const timePart = datePart[1] ? datePart[1].split(":") : ["00", "00"];
  const now = [
    datePart[0],
    [timePart[0].padStart(2, "0"), timePart[1].padStart(2, "0")].join(":"),
  ].join("T");
  return now;
};
