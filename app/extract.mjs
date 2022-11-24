import fs from "fs";
import glob from "glob";
import { extract } from "react-i18n-mini-parser";

glob("./src/**/*.+(js|ts|tsx)", function (error, files) {
  const { messages } = extract(
    files.map((file) => fs.readFileSync(file, "utf8"))
  );
  fs.writeFileSync(
    "./src/locales/en.json",
    JSON.stringify(messages, null, "  "),
    "utf8"
  );
});
