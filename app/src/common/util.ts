export const prettyNow = () => {
  var date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const hasString = (arr: string[], item: string) => {
  const res = arr.filter((it) => it == item);
  return res && res.length > 0;
};
