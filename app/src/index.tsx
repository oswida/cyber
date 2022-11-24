/* @refresh reload */

import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { render } from "solid-js/web";
import { extractQueryParam, loadTranslation } from "./common";
import App from "./App";
import { Router, hashIntegration } from "@solidjs/router";

let lang = extractQueryParam("lang");
if (lang === "") lang = "en";
const messages = await loadTranslation(lang);
const dict: Record<string, any> = {};
dict[lang] = messages;
const langContext = createI18nContext(dict, lang);

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
