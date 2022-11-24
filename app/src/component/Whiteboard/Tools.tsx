import { FaSolidPalette } from "solid-icons/fa";
import { ParentProps, createMemo, Switch, Match, Accessor } from "solid-js";
import { useAppData } from "~/common";
import { Button } from "../Button";
import { linecolor, linesize, linesSizeMap, switchTool } from "./canvas";

export const ToolSwitchButton = ({
  tool,
  children,
  canvas,
  title,
}: ParentProps & {
  tool: string;
  title?: string;
  canvas: Accessor<fabric.Canvas | undefined>;
}) => {
  const appData = useAppData();

  const isCurrentTool = createMemo(() => tool == appData?.wbState().tool);
  return (
    <Switch>
      <Match when={isCurrentTool()}>
        <Button
          color="filled"
          onClick={() => switchTool(appData, canvas(), tool)}
          title={title}
        >
          {children}
        </Button>
      </Match>
      <Match when={!isCurrentTool()}>
        <Button
          onClick={() => switchTool(appData, canvas(), tool)}
          title={title}
        >
          {children}
        </Button>
      </Match>
    </Switch>
  );
};

export const ColorSwitchButton = ({
  color,
}: ParentProps & { color: string }) => {
  const apd = useAppData();

  const isCurrentColor = createMemo(() => color == apd?.wbState().brush);
  return (
    <Switch>
      <Match when={!isCurrentColor()}>
        <Button onClick={() => linecolor(apd, color)} border="underline">
          <FaSolidPalette title={color} color={color} />
        </Button>
      </Match>
      <Match when={isCurrentColor()}>
        <Button onClick={() => linecolor(apd, color)}>
          <FaSolidPalette title={color} color={color} />
        </Button>
      </Match>
    </Switch>
  );
};

export const SizeSwitchButton = ({
  index,
  children,
}: ParentProps & { index: number }) => {
  const apd = useAppData();
  const isCurrentSize = createMemo(
    () => apd?.wbState().width === linesSizeMap[index]
  );

  return (
    <Switch>
      <Match when={isCurrentSize()}>
        <Button onClick={() => linesize(apd, index)}>{children}</Button>
      </Match>
      <Match when={!isCurrentSize()}>
        <Button onClick={() => linesize(apd, index)} border="underline">
          {children}
        </Button>
      </Match>
    </Switch>
  );
};
