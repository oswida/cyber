import { recipe } from "@vanilla-extract/recipes";

export const FlexStyle = recipe({
  base: {
    display: "flex",
    gap: "5px",
  },
  variants: {
    type: {
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
    vcenter: {
      true: {
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
    type: "row",
    center: false,
    vcenter: false,
    scrolled: false,
  },
});
