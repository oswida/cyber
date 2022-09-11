import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { CorpoGen } from "./routes/CorpoGen";
import { GRouter } from "./routes/GRouter";
import { Layout } from "./routes/Layout";
import { NpcGenView } from "./routes/NpcGenView";

function App() {
  return (
    <BrowserRouter basename="/cyber/app/dist">
      <Routes>
        <Route path="/" element={<GRouter />}></Route>
        <Route path="/corpo" element={<CorpoGen />}></Route>
        <Route path="/npc" element={<NpcGenView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
