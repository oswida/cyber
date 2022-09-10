import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainView } from "./routes/MainView";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
