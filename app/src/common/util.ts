export const prettyNow = () => {
  var date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const prettyToday = () => {
  var date = new Date();
  return date
    .toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replaceAll(",", "_")
    .replaceAll(" ", "_");
};

export const hasString = (arr: string[], item: string) => {
  const res = arr.filter((it) => it == item);
  return res && res.length > 0;
};

export const doExport = (data: any, filename: string) => {
  if (!data) return;
  const print = JSON.stringify(data, null, "\t");
  const link = document.createElement("a");
  link.download = filename;
  link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
  link.click();
};

export const doImport = (callback: (data: any) => void) => {
  const el = document.createElement("input");
  el.setAttribute("type", "file");
  el.setAttribute("accept", "application/json");
  el.addEventListener("change", function () {
    if (!this.files || this.files.length === 0) return;
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      callback(JSON.parse(event.target.result));
    });
    reader.readAsText(this.files[0]);
  });
  el.click();
};

export const doOpenImage = (callback: (data: any) => void) => {
  const el = document.createElement("input");
  el.setAttribute("type", "file");
  el.setAttribute("accept", "image/*");
  el.addEventListener("change", function () {
    if (!this.files || this.files.length === 0) return;
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      callback(event.target.result);
    });
    reader.readAsDataURL(this.files[0]);
  });
  el.click();
};

export const compareStringTime = (t1: string, t2: string) => {
  const now = new Date();
  const time1 = Date.parse(
    `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${t1}`
  );
  const time2 = Date.parse(
    `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${t2}`
  );
  if (time1 < time2) return -1;
  if (time1 === time2) return 0;
  return 1;
};
