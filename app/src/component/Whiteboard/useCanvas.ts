import { fabric } from "fabric";
import { useCallback } from "react";
import { themeColors } from "~/common";
import { WhiteboardState } from "./types";

export const useCanvas = (
  canvasRef: React.RefObject<fabric.Canvas | undefined>,
  wbState: WhiteboardState,
  setWbState: React.Dispatch<React.SetStateAction<WhiteboardState>>
) => {
  let mouseDown = false;
  let drawInstance: any;
  let origX: number;
  let origY: number;

  const stopDrawing = () => {
    mouseDown = false;
  };

  const removeCanvasListener = (canvas: fabric.Canvas) => {
    canvas.off("mouse:down");
    canvas.off("mouse:move");
    canvas.off("mouse:up");
  };

  const startAddLine = (canvas: fabric.Canvas) => {
    return (e: any) => {
      mouseDown = true;
      let pointer = canvas.getPointer(e);
      drawInstance = new fabric.Line(
        [pointer.x, pointer.y, pointer.x, pointer.y],
        {
          strokeWidth: wbState.width,
          stroke: wbState.brush,
          selectable: false,
        }
      );

      canvas.add(drawInstance);
      canvas.requestRenderAll();
    };
  };

  const startDrawingLine = (canvas: fabric.Canvas) => {
    return (e: any) => {
      if (mouseDown) {
        const pointer = canvas.getPointer(e);
        drawInstance.set({
          x2: pointer.x,
          y2: pointer.y,
        });
        drawInstance.setCoords();
        canvas.requestRenderAll();
      }
    };
  };

  function startAddRect(canvas: fabric.Canvas) {
    return (e: any) => {
      mouseDown = true;

      const pointer = canvas.getPointer(e);
      origX = pointer.x;
      origY = pointer.y;

      drawInstance = new fabric.Rect({
        stroke: wbState.brush,
        strokeWidth: wbState.width,
        fill: wbState.fill ? wbState.fill : "transparent",
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        selectable: false,
      });

      canvas.add(drawInstance);

      drawInstance.on("mousedown", (e: any) => {
        if (wbState.tool === "eraser") {
          canvas.remove(e.target);
        }
      });
    };
  }

  function startDrawingRect(canvas: fabric.Canvas) {
    return (e: any) => {
      if (mouseDown) {
        const pointer = canvas.getPointer(e);

        if (pointer.x < origX) {
          drawInstance.set("left", pointer.x);
        }
        if (pointer.y < origY) {
          drawInstance.set("top", pointer.y);
        }
        drawInstance.set({
          width: Math.abs(pointer.x - origX),
          height: Math.abs(pointer.y - origY),
        });
        drawInstance.setCoords();
        canvas.renderAll();
      }
    };
  }

  function startAddEllipse(canvas: fabric.Canvas) {
    return (e: any) => {
      mouseDown = true;

      const pointer = canvas.getPointer(e);
      origX = pointer.x;
      origY = pointer.y;
      drawInstance = new fabric.Ellipse({
        stroke: wbState.brush,
        strokeWidth: wbState.width,
        fill: wbState.fill ? wbState.fill : "transparent",
        left: origX,
        top: origY,
        cornerSize: 7,
        objectCaching: false,
        selectable: false,
      });

      canvas.add(drawInstance);
    };
  }

  function startDrawingEllipse(canvas: fabric.Canvas) {
    return (e: any) => {
      if (mouseDown) {
        const pointer = canvas.getPointer(e);
        if (pointer.x < origX) {
          drawInstance.set("left", pointer.x);
        }
        if (pointer.y < origY) {
          drawInstance.set("top", pointer.y);
        }
        drawInstance.set({
          rx: Math.abs(pointer.x - origX) / 2,
          ry: Math.abs(pointer.y - origY) / 2,
        });
        drawInstance.setCoords();
        canvas.renderAll();
      }
    };
  }

  const removeActiveObject = () => {
    if (!canvasRef.current) return;
    const objs = canvasRef.current.getActiveObjects();
    objs.forEach((it) => {
      if (!canvasRef.current) return;
      canvasRef.current.remove(it);
    });
  };

  const initCanvas = (width: number, height: number) => {
    const canvas = new fabric.Canvas("whiteboardCanvas", { height, width });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.borderColor = themeColors.background300; //"#4447A9";
    fabric.Object.prototype.cornerColor = themeColors.background300;
    fabric.Object.prototype.cornerSize = 6;
    fabric.Object.prototype.padding = 10;
    fabric.Object.prototype.borderDashArray = [5, 5];

    return canvas;
  };

  const cleanToolEnv = () => {
    if (!canvasRef.current) return;
    canvasRef.current.selection = false;
    canvasRef.current.hoverCursor = "auto";
    canvasRef.current.isDrawingMode = false;
    canvasRef.current
      .getObjects()
      .map((item) => item.set({ selectable: false }));
    canvasRef.current.discardActiveObject().requestRenderAll();
  };

  const switchTool = (tool: string) => {
    if (!canvasRef.current) return;

    if (tool === "pencil" && wbState.tool !== "pencil") {
      removeCanvasListener(canvasRef.current);
      canvasRef.current.freeDrawingBrush.width = wbState.width;
      canvasRef.current.isDrawingMode = true;
      canvasRef.current.freeDrawingBrush.color = wbState.brush;
    } else if (tool === "select") {
      canvasRef.current.isDrawingMode = false;
      removeCanvasListener(canvasRef.current);
      canvasRef.current
        .getObjects()
        .map((item) => item.set({ selectable: true }));
      canvasRef.current.hoverCursor = "all-scroll";
    } else if (tool === "line") {
      removeCanvasListener(canvasRef.current);
      canvasRef.current.on("mouse:down", startAddLine(canvasRef.current));
      canvasRef.current.on("mouse:move", startDrawingLine(canvasRef.current));
      canvasRef.current.on("mouse:up", stopDrawing);

      cleanToolEnv();
    } else if (tool === "rect") {
      removeCanvasListener(canvasRef.current);

      canvasRef.current.on("mouse:down", startAddRect(canvasRef.current));
      canvasRef.current.on("mouse:move", startDrawingRect(canvasRef.current));
      canvasRef.current.on("mouse:up", stopDrawing);

      cleanToolEnv();
    } else if (tool === "circle") {
      removeCanvasListener(canvasRef.current);
      canvasRef.current.on("mouse:down", startAddEllipse(canvasRef.current));
      canvasRef.current.on(
        "mouse:move",
        startDrawingEllipse(canvasRef.current)
      );
      canvasRef.current.on("mouse:up", stopDrawing);
      cleanToolEnv();
    } else if (tool === "text") {
      removeCanvasListener(canvasRef.current);
      canvasRef.current.isDrawingMode = false;
      const text = new fabric.Textbox("text", {
        left: 100,
        top: 100,
        fill: wbState.brush,
        editable: true,
        fontFamily: "Oxanium",
      });
      canvasRef.current.add(text);
      canvasRef.current.renderAll();
      setWbState((prev) => ({ ...prev, tool: "select" }));
      return;
    } else if (tool === "eraser") {
      removeCanvasListener(canvasRef.current);
      canvasRef.current.on("mouse:up", removeActiveObject);
      canvasRef.current.isDrawingMode = false;
      canvasRef.current
        .getObjects()
        .map((item) => item.set({ selectable: true }));
      canvasRef.current.hoverCursor = "all-scroll";
    }
    setWbState((prev) => ({ ...prev, tool: tool }));
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    canvasRef.current.getObjects().forEach((item) => {
      if (!canvasRef.current) return;
      if (item !== canvasRef.current.backgroundImage) {
        canvasRef.current.remove(item);
      }
    });
  };

  const canvasJson = () => {
    if (!canvasRef.current) return {};
    return canvasRef.current.toJSON();
  };

  const canvasFromJson = (data: any) => {
    if (!canvasRef.current) return;
    canvasRef.current.loadFromJSON(data, () => {});
  };

  return {
    initCanvas,
    clearCanvas,
    removeCanvasListener,
    switchTool,
    removeActiveObject,
    canvasJson,
    canvasFromJson,
  };
};
