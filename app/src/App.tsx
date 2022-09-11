import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./routes/Layout";
import { NpcGenView } from "./routes/NpcGenView";

function App() {
  return (
    <BrowserRouter basename="/cyber/app/dist">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<NpcGenView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
