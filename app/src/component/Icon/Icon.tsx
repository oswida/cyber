import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "~/common";

export const Icon = styled(FontAwesomeIcon, {
  variants: {
    color: {
      primary: {
        color: "$fontPrimary",
      },
      green: {
        color: "$green",
      },
      pink: {
        color: "$pink",
      },
      blue: {
        color: "$blue",
      },
      yellow: {
        color: "$yellow",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
