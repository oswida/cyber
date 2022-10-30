import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { create, SimpleDrawingBoard } from "simple-drawing-board";
import { stateDrawAutosave, styled, useNats } from "~/common";
import { useStorage } from "~/common/storage";
import { HudPane } from "../../styles";
import { Tools } from "./Tools";
import debounce from "lodash.debounce";
import { useAtomCallback } from "jotai/utils";

const CanvasRoot = styled("div", {
  width: "calc(100% - 10px)",
  padding: "5px",
  height: "calc(100% - 10px)",
  overflow: "auto",
  backgroundColor: "$background50",
});

export const DrawPane = () => {
  const sdb = useRef<SimpleDrawingBoard | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [md, setMd] = useState("draw");
  const { loadDraw, saveDraw } = useStorage();
  const { publish } = useNats();
  const autosave = useAtomCallback(
    useCallback(
      (get, set) => {
        return get(stateDrawAutosave);
      },
      [stateDrawAutosave]
    )
  );

  const save = () => {
    if (!sdb.current) return;
    const data = sdb.current.toDataURL({ type: "image/webp" });
    saveDraw(data);
  };

  const share = () => {
    if (!sdb.current) return;
  };

  useEffect(() => {
    const el = document.getElementById("draw") as HTMLCanvasElement;
    if (!el) return;
    sdb.current = create(el);
    sdb.current.setLineColor("white");
    const data = loadDraw();
    if (data !== "") {
      sdb.current.fillImageByDataURL(data);
    }
    sdb.current.observer.on("drawEnd", async (coords: any) => {
      const asv = await autosave();
      if (asv) debounce(save, 1000)();
    });
  }, []);

  return (
    <HudPane>
      <Tools sdb={sdb} drawMode={md} setDrawMode={setMd} save={save} />
      <CanvasRoot>
        <canvas
          ref={canvasRef}
          id="draw"
          width="1500"
          height="1000"
          style={{ cursor: md === "draw" ? "crosshair" : "grab" }}
        />
      </CanvasRoot>
    </HudPane>
  );
};
