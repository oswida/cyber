import { styled } from "@stitches/react";

export const Flex = styled("div", {
  display: "flex",
  gap: 5,

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
    scrolled: {
      true: {
        overflow: "auto",
      },
    },
  },
  defaultVariants: {
    direction: "row",
    center: false,
  },
});
