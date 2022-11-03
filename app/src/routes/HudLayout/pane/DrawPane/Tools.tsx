import {
  fa0,
  fa1,
  fa2,
  fa3,
  fa4,
  fa8,
  faEraser,
  faFileExport,
  faImage,
  faPalette,
  faPencil,
  faRedo,
  faSave,
  faShare,
  faShareAlt,
  faTrashAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { SimpleDrawingBoard } from "simple-drawing-board";
import {
  doOpenImage,
  doSaveImage,
  prettyToday,
  stateDrawAutosave,
  stateNats,
  themeColors,
  topicDraw,
  useNats,
} from "~/common";
import { useNotify } from "~/common/notify";
import { Button, Flex } from "~/component";
import { IMAGE_QUALITY } from "./consts";

type Props = {
  sdb: React.MutableRefObject<SimpleDrawingBoard | null>;
  setDrawMode: (value: string) => void;
  drawMode: string;
  save: () => void;
};

const lineSizeMap: Record<string, number[]> = {
  draw: [1, 2, 4, 8],
  erase: [5, 7, 11, 13],
};

export const Tools = ({ sdb, setDrawMode, drawMode, save }: Props) => {
  const [clr, setClr] = useState("white");
  const [sz, setSz] = useState(1);
  const [autosave, setAutosave] = useAtom(stateDrawAutosave);
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const { notify } = useNotify();

  const setMode = (er: boolean) => {
    if (!sdb.current) return;
    sdb.current.toggleMode();
    setDrawMode(sdb.current.mode);
    sdb.current.setLineSize(lineSizeMap[sdb.current.mode][sz]);
  };

  const undo = () => {
    if (!sdb.current) return;
    sdb.current.undo();
  };

  const redo = () => {
    if (!sdb.current) return;
    sdb.current.redo();
  };

  const clear = () => {
    if (!sdb.current) return;
    sdb.current.clear();
    save();
  };

  const linecolor = (color: string) => {
    if (!sdb.current) return;
    sdb.current.setLineColor(color);
    setClr(color);
  };

  const linesize = (s: number) => {
    if (!sdb.current) return;
    sdb.current.setLineSize(lineSizeMap[drawMode][s]);
    setSz(s);
  };

  const image = () => {
    doOpenImage(async (data: any) => {
      if (!sdb.current) return;
      await sdb.current.fillImageByDataURL(data);
      save();
    });
  };

  const toggleAutosave = () => {
    if (!autosave) save();
    setAutosave(!autosave);
  };

  const exp = () => {
    if (!sdb.current) return;
    const data = sdb.current.toDataURL({
      type: "image/webp",
      quality: IMAGE_QUALITY,
    });
    const filename = `draw-${prettyToday()}.webp`;
    doSaveImage(data, filename);
  };

  const share = () => {
    if (!sdb.current) return;
    const data = sdb.current.toDataURL({
      type: "image/webp",
      quality: IMAGE_QUALITY,
    });
    publish(nats.connection, topicDraw, { data: data });
    notify("Image published", 3000);
  };

  return (
    <Flex
      css={{ alignItems: "center", justifyContent: "space-between", gap: 20 }}
    >
      <Flex>
        <Button
          color={drawMode === "draw" ? "filled" : undefined}
          onClick={() => setMode(false)}
        >
          <FontAwesomeIcon icon={faPencil} title="Draw" />
        </Button>
        <Button
          color={drawMode === "erase" ? "filled" : undefined}
          onClick={() => setMode(true)}
        >
          <FontAwesomeIcon icon={faEraser} title="Erase" />
        </Button>
      </Flex>
      <Flex>
        <Button onClick={undo}>
          <FontAwesomeIcon icon={faUndo} title="Undo" />
        </Button>
        <Button onClick={redo}>
          <FontAwesomeIcon icon={faRedo} title="Redo" />
        </Button>
      </Flex>

      <Flex>
        <Button
          onClick={() => linecolor("white")}
          border={clr === "white" ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={faPalette} title="White" color="white" />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.blue)}
          border={clr === themeColors.blue ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Blue"
            color={themeColors.blue}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.yellow)}
          border={clr === themeColors.yellow ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Yellow"
            color={themeColors.yellow}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.green)}
          border={clr === themeColors.green ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Green"
            color={themeColors.green}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.pink)}
          border={clr === themeColors.pink ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Pink"
            color={themeColors.pink}
          />
        </Button>
      </Flex>
      <Flex>
        <Button
          onClick={() => linesize(0)}
          border={sz === 0 ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa1} />
        </Button>
        <Button
          onClick={() => linesize(1)}
          border={sz === 1 ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa2} />
        </Button>
        <Button
          onClick={() => linesize(2)}
          border={sz === 2 ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa3} />
        </Button>
        <Button
          onClick={() => linesize(3)}
          border={sz === 3 ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa4} />
        </Button>
      </Flex>

      <Flex>
        <Button onClick={share}>
          <FontAwesomeIcon icon={faShareAlt} title="Share" />
        </Button>
        <Button onClick={image}>
          <FontAwesomeIcon icon={faImage} title="Load image" />
        </Button>
        <Button onClick={exp}>
          <FontAwesomeIcon icon={faFileExport} title="Export" />
        </Button>
        <Button
          onClick={toggleAutosave}
          color={autosave ? "filled" : undefined}
        >
          <FontAwesomeIcon icon={faSave} title="Autosave" />
        </Button>
      </Flex>

      <Button onClick={clear} css={{ marginLeft: 40 }}>
        <FontAwesomeIcon icon={faTrashAlt} title="Clear" />
      </Button>
    </Flex>
  );
};
