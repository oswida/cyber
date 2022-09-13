export const hasString = (arr: string[], item: string) => {
  const res = arr.filter((it) => it == item);
  return res && res.length > 0;
};
