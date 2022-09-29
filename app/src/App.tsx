import { useAtom } from "jotai";
import { useEffect } from "react";
import "./App.css";
import { language } from "./common";
import { HudLayout } from "./routes/HudLayout";

function App() {
  const [lang, setLang] = useAtom(language);

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
    // <div style={{ width: "100vw", height: "100vh" }}>
    <HudLayout />
    // </div>
  );
  // <HashRouter>
  //   <Routes>
  //     <Route path="/" element={<HudView />}></Route>
  //     <Route path="/corpo" element={<CorpoGen />}></Route>
  //     <Route path="/npc" element={<NpcGenView />}></Route>
  //     <Route path="/node" element={<NodeGen />}></Route>
  //     <Route path="/place" element={<PlaceGen />}></Route>
  //     <Route path="/job" element={<JobGen />}></Route>
  //   </Routes>
  // </HashRouter>
}

export default App;
