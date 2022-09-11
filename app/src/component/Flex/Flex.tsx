import { styled } from "@stitches/react";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    center: {
      true: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  defaultVariants: {
    direction: "row",
  },
});
