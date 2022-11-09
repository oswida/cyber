import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { stateDrawCache, styled } from "~/common";
import { useStorage } from "~/common/storage";
import { Flex } from "../Flex";
import { DrawTools } from "./DrawTools";
import { WhiteboardState } from "./types";
import { useCanvas } from "./useCanvas";

const Root = styled("div", {
  backgroundColor: "$background",
  width: "calc(100% - 0px)",
  height: "calc(100% - 40px)",
  overflow: "auto",
});

export const Whiteboard = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [wbState, setWbState] = useState<WhiteboardState>({
    brush: "white",
    fill: "transparent",
    tool: "pencil",
    width: 1,
  });
  const { initCanvas, switchTool, clearCanvas, canvasJson, canvasFromJson } =
    useCanvas(canvasRef, wbState, setWbState);
  const { loadDraw, saveDraw } = useStorage();
  const drawCache = useAtomValue(stateDrawCache);

  const save = (e: any) => {
    if (!canvasRef.current) return;
    saveDraw(canvasRef.current.toJSON());
  };

  useEffect(() => {
    if (!boardRef.current || canvasRef.current) return;
    canvasRef.current = initCanvas(1920, 1080);
    const data = loadDraw();
    if (data) {
      canvasRef.current.loadFromJSON(data, () => {});
    }
    canvasRef.current.on("object:added", save);
    canvasRef.current.on("object:modified", save);
    canvasRef.current.on("object:removed", save);
    canvasRef.current.on("canvas:cleared", save);
    switchTool("pencil");
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current || !drawCache) return;
    canvasFromJson(drawCache);
    saveDraw(drawCache);
  }, [drawCache]);

  return (
    <Flex direction="column" style={{ height: "100%", width: "100%" }}>
      <DrawTools
        wbState={wbState}
        setWbState={setWbState}
        switchTool={switchTool}
        clearCanvas={clearCanvas}
        canvasJson={canvasJson}
        canvasFromJson={canvasFromJson}
      />
      <Root ref={boardRef}>
        <canvas id="whiteboardCanvas" />
      </Root>
    </Flex>
  );
};
