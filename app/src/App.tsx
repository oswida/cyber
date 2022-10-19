import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { language, stateNats, stateSessionData, useNats } from "./common";
import { useStorage } from "./common/storage";
import { Connect } from "./routes/Connect";
import { CorpoGen } from "./routes/CorpoGen";
import { HudLayout } from "./routes/HudLayout";
import { JobGen } from "./routes/JobGen";
import { NodeGen } from "./routes/NodeGen";
import { NpcGen } from "./routes/NpcGen";
import { PlaceGen } from "./routes/PlaceGen";

function App() {
  const [lang, setLang] = useAtom(language);
  const sessionData = useAtomValue(stateSessionData);
  const { connectNats } = useNats();
  const nats = useAtomValue(stateNats);
  const {
    loadSessionData,
    updateStoreSize,
    loadGen,
    loadBoardNotes,
    loadPrivateNotes,
    loadPlayers,
    loadRolls,
  } = useStorage();

  useEffect(() => {
    const re = new RegExp(".*(lang=[a-zA-Z]+).*", "i");
    const res = window.location.href.match(re);
    if (res && res[1]) {
      const l = res[1].replace("lang=", "").trim();
      if (l != "") {
        setLang(l);
      }
    }
    loadSessionData();
    loadGen();
    loadBoardNotes();
    loadPrivateNotes();
    loadPlayers();
    loadRolls();
    updateStoreSize();
  }, []);

  useEffect(() => {
    if (nats.connection === null) {
      connectNats(sessionData);
    }
  }, [sessionData]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HudLayout />}></Route>
        <Route path="/corpo" element={<CorpoGen />}></Route>
        <Route path="/npc" element={<NpcGen />}></Route>
        <Route path="/node" element={<NodeGen />}></Route>
        <Route path="/place" element={<PlaceGen />}></Route>
        <Route path="/job" element={<JobGen />}></Route>
        <Route path="/connect" element={<Connect />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
