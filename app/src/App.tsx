import { useAtom } from "jotai";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  inodSessionKey,
  language,
  sessionDataType,
  stateSessionData,
} from "./common";
import { CorpoGen } from "./routes/CorpoGen";
import { HudLayout } from "./routes/HudLayout";
import { JobGen } from "./routes/JobGen";
import { NodeGen } from "./routes/NodeGen";
import { NpcGen } from "./routes/NpcGen";
import { PlaceGen } from "./routes/PlaceGen";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [lang, setLang] = useAtom(language);
  const [session, setSession] = useAtom(stateSessionData);

  useEffect(() => {
    const sessionData = localStorage.getItem(inodSessionKey);
    if (!sessionData) {
      const sd = { username: "none", browserID: uuidv4() } as sessionDataType;
      localStorage.setItem(inodSessionKey, JSON.stringify(sd));
      setSession(sd);
    } else {
      setSession(JSON.parse(sessionData));
    }
  }, []);

  useEffect(() => {
    const re = new RegExp(".*(lang=[a-zA-Z]+).*", "i");
    const res = window.location.href.match(re);
    if (res && res[1]) {
      const l = res[1].replace("lang=", "").trim();
      if (l != "") {
        setLang(l);
      }
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HudLayout />}></Route>
        <Route path="/corpo" element={<CorpoGen />}></Route>
        <Route path="/npc" element={<NpcGen />}></Route>
        <Route path="/node" element={<NodeGen />}></Route>
        <Route path="/place" element={<PlaceGen />}></Route>
        <Route path="/job" element={<JobGen />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
