import { StretchBarConfig } from "react-tile-pane";
import { globalCss } from "~/common";

export const stretchBarStyles = globalCss({
  ".stretchBar": {
    background: "$darkblue",
    width: 1,
    height: 1,
    transition: "233ms",
    transitionProperty: "background",
    opacity: 0.3,
  },
  ".stretchBar:hover": {
    background: "$blue",
    height: 3,

    width: 3,
  },
});

stretchBarStyles();

export const stretchBarConfig: StretchBarConfig = {
  position: "middle",
  className: "stretchBar",
  style: (isRow: boolean) => ({
    cursor: isRow ? "ew-resize" : "ns-resize",
  }),
};
