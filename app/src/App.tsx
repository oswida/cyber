import { useAtom } from "jotai";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { language } from "./common";
import { CorpoGen } from "./routes/CorpoGen";
import { JobGen } from "./routes/JobGen";
import { NodeGen } from "./routes/NodeGen";
import { NpcGenView } from "./routes/NpcGenView";
import { PlaceGen } from "./routes/PlaceGen";

function App() {
  const [lang, setLang] = useAtom(language);

  useEffect(() => {
    const l = window.location.search.replace("?lang=", "").trim();
    if (l != "") {
      setLang(l);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CorpoGen />}></Route>
        <Route path="/corpo" element={<CorpoGen />}></Route>
        <Route path="/npc" element={<NpcGenView />}></Route>
        <Route path="/node" element={<NodeGen />}></Route>
        <Route path="/place" element={<PlaceGen />}></Route>
        <Route path="/job" element={<JobGen />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
