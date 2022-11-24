/* @refresh reload */

import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { render } from "solid-js/web";
import { extractQueryParam } from "./common";
import App from "./App";
import { Router, hashIntegration } from "@solidjs/router";
import { messages_en } from "./locales/en/en";
import { messages_pl } from "./locales/pl/pl";

const dictionaries = {
  en: messages_en,
  pl: messages_pl,
};

let lang = extractQueryParam("lang");
if (lang === "") lang = "en";
const langContext = createI18nContext(dictionaries, lang);

render(
  () => (
    <I18nContext.Provider value={langContext}>
      <Router source={hashIntegration()}>
        <App />
      </Router>
    </I18nContext.Provider>
  ),
  document.getElementById("root") as HTMLElement
);
