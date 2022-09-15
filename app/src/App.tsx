import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CorpoGen } from "./routes/CorpoGen";
import { JobGen } from "./routes/JobGen";
import { NodeGen } from "./routes/NodeGen";
import { NpcGenView } from "./routes/NpcGenView";
import { PlaceGen } from "./routes/PlaceGen";

function App() {
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
