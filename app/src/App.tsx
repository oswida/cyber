import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { CorpoGen } from "./routes/CorpoGen";
import { NodeGen } from "./routes/NodeGen";
import { NpcGenView } from "./routes/NpcGenView";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CorpoGen />}></Route>
        <Route path="/corpo" element={<CorpoGen />}></Route>
        <Route path="/npc" element={<NpcGenView />}></Route>
        <Route path="/node" element={<NodeGen />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
