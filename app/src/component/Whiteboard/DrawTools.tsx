import {
  fa1,
  fa2,
  fa3,
  fa4,
  faArrowPointer,
  faCircle,
  faEraser,
  faFileExport,
  faFileImport,
  faFont,
  faLinesLeaning,
  faPalette,
  faPencil,
  faShareAlt,
  faSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import {
  doExport,
  doImport,
  prettyToday,
  stateNats,
  themeColors,
  topicDraw,
  useNats,
} from "~/common";
import { useNotify } from "~/common/notify";
import { WhiteboardState } from "~/component/Whiteboard/types";
import { Button } from "../Button";
import { Flex } from "../Flex";

type Props = {
  wbState: WhiteboardState;
  setWbState: React.Dispatch<React.SetStateAction<WhiteboardState>>;
  switchTool: (tool: string) => void;
  clearCanvas: () => void;
  canvasJson: () => any;
  canvasFromJson: (data: any) => void;
};

export const DrawTools = ({
  wbState,
  setWbState,
  switchTool,
  clearCanvas,
  canvasJson,
  canvasFromJson,
}: Props) => {
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const { notify } = useNotify();

  const linecolor = (color: string) => {
    setWbState((prev) => ({ ...prev, brush: color, tool: "select" }));
  };

  const linesSizeMap = [1, 2, 4, 8];

  const linesize = (s: number) => {
    setWbState((prev) => ({ ...prev, width: linesSizeMap[s], tool: "select" }));
  };

  const importImage = () => {
    doImport(async (data: any) => {
      canvasFromJson(data);
    });
  };

  const exp = () => {
    const data = canvasJson();
    const filename = `draw-${prettyToday()}.json`;
    doExport(data, filename);
  };

  const share = () => {
    const data = canvasJson();
    publish(nats.connection, topicDraw, { data: data });
    notify("Image published", 3000);
  };

  return (
    <Flex
      css={{
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        backgroundColor: "$background",
        padding: 6,
        borderBottom: `solid 1px $background300`,
      }}
    >
      <Flex>
        <Button
          color={wbState.tool === "select" ? "filled" : undefined}
          onClick={() => switchTool("select")}
        >
          <FontAwesomeIcon icon={faArrowPointer} title="Select" />
        </Button>
        <Button
          color={wbState.tool === "pencil" ? "filled" : undefined}
          onClick={() => switchTool("pencil")}
        >
          <FontAwesomeIcon icon={faPencil} title="Pencil" />
        </Button>
        <Button
          color={wbState.tool === "line" ? "filled" : undefined}
          onClick={() => switchTool("line")}
        >
          <FontAwesomeIcon icon={faLinesLeaning} title="Line" />
        </Button>
        <Button
          color={wbState.tool === "rect" ? "filled" : undefined}
          onClick={() => switchTool("rect")}
        >
          <FontAwesomeIcon icon={faSquare} title="Rect" />
        </Button>
        <Button
          color={wbState.tool === "circle" ? "filled" : undefined}
          onClick={() => switchTool("circle")}
        >
          <FontAwesomeIcon icon={faCircle} title="Circle" />
        </Button>
        <Button onClick={() => switchTool("text")}>
          <FontAwesomeIcon icon={faFont} title="Text" />
        </Button>
        <Button
          color={wbState.tool === "eraser" ? "filled" : undefined}
          onClick={() => switchTool("eraser")}
        >
          <FontAwesomeIcon icon={faEraser} title="Eraser" />
        </Button>
        <Button onClick={() => clearCanvas()} css={{ marginLeft: 20 }}>
          <FontAwesomeIcon icon={faTrash} title="Clear" />
        </Button>
      </Flex>

      <Flex>
        <Button
          onClick={() => linecolor("white")}
          border={wbState.brush === "white" ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={faPalette} title="White" color="white" />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.blue)}
          border={wbState.brush === themeColors.blue ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Blue"
            color={themeColors.blue}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.yellow)}
          border={
            wbState.brush === themeColors.yellow ? undefined : "underline"
          }
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Yellow"
            color={themeColors.yellow}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.green)}
          border={wbState.brush === themeColors.green ? undefined : "underline"}
        >
          <FontAwesomeIcon
            icon={faPalette}
            title="Green"
            color={themeColors.green}
          />
        </Button>
        <Button
          onClick={() => linecolor(themeColors.pink)}
          border={wbState.brush === themeColors.pink ? undefined : "underline"}
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
          border={wbState.width === linesSizeMap[0] ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa1} />
        </Button>
        <Button
          onClick={() => linesize(1)}
          border={wbState.width === linesSizeMap[1] ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa2} />
        </Button>
        <Button
          onClick={() => linesize(2)}
          border={wbState.width === linesSizeMap[2] ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa3} />
        </Button>
        <Button
          onClick={() => linesize(3)}
          border={wbState.width === linesSizeMap[3] ? undefined : "underline"}
        >
          <FontAwesomeIcon icon={fa4} />
        </Button>
      </Flex>

      <Flex>
        <Button onClick={share} border="none">
          <FontAwesomeIcon icon={faShareAlt} title="Share" />
        </Button>
        <Button onClick={importImage} border="none">
          <FontAwesomeIcon icon={faFileImport} title="Import" />
        </Button>
        <Button onClick={exp} border="none">
          <FontAwesomeIcon icon={faFileExport} title="Export" />
        </Button>
      </Flex>
    </Flex>
  );
};
