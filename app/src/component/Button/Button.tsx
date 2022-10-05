import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { styled } from "~/common";

export const Button = styled("div", {
  color: "$fontPrimary",
  outline: "none",
  textTransform: "uppercase",

  borderRadius: 5,
  backgroundColor: "transparent",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "$background200",
    textDecoration: "none",
    cursor: "pointer",
  },
  variants: {
    size: {
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
      },
      small: {
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: "small",
      },
      "x-small": {
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: "x-small",
      },
    },
    noupper: {
      true: {
        textTransform: "none",
      },
    },
    border: {
      standard: {
        border: "solid 1px $blue",
      },
      underline: {
        borderBottom: "solid 1px $blue",
      },
      none: {
        border: "none",
      },
    },
    color: {
      green: {
        borderColor: "$green",
        color: "$green",
        "&:hover": {
          fontWeight: "bolder",
        },
      },
    },
  },
  defaultVariants: {
    size: "standard",
    border: "standard",
  },
});

export const LinkButton = styled(Link, {
  color: "$fontPrimary",
  "&:hover": {
    color: "$blue",
  },
  textTransform: "uppercase",
  padding: 5,
  border: "solid 1px $blue",
  borderRadius: 5,
});

export const LeftTopButton = styled("div", {
  position: "absolute",
  top: 10,
  left: 10,
  variants: {
    hcolor: {
      red: {
        "& :hover": {
          color: "$red",
        },
      },
      yellow: {
        "& :hover": {
          color: "$yellow",
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    hcolor: "none",
  },
});

export const RightBottomButton = styled("div", {
  position: "absolute",
  bottom: 10,
  right: 10,
  variants: {
    hcolor: {
      red: {
        "& :hover": {
          color: "$red",
        },
      },
      yellow: {
        "& :hover": {
          color: "$yellow",
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    hcolor: "none",
  },
});

export const LeftBottomButton = styled("div", {
  position: "absolute",
  bottom: 5,
  left: 5,
});

export const LTIconButton = ({
  icon,
  onClick,
  hoverColor,
}: {
  icon: IconDefinition;
  onClick: () => void;
  hoverColor?: "none" | "red" | "yellow";
}) => {
  return (
    <LeftTopButton onClick={onClick} hcolor={hoverColor}>
      <FontAwesomeIcon icon={icon} />
    </LeftTopButton>
  );
};

export const RTIconButton = ({
  icon,
  onClick,
  hoverColor,
}: {
  icon: IconDefinition;
  onClick?: () => void;
  hoverColor?: "none" | "red" | "yellow";
}) => {
  return (
    <RightBottomButton onClick={onClick} hcolor={hoverColor}>
      <FontAwesomeIcon icon={icon} />
    </RightBottomButton>
  );
};

export const LBIconButton = ({
  icon,
  onClick,
}: {
  icon: IconDefinition;
  onClick?: () => void;
}) => {
  return (
    <LeftBottomButton onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </LeftBottomButton>
  );
};

export const InputButton = styled("input", {
  "-moz-appearance": "textfield",
  appearance: "textfield",
  "& .-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  fontFamily: "Oxanium !important",
  fontSize: "$2 !important",
  color: "$fontPrimary",
  outline: "none",
  border: "solid 1px $blue",
  borderRadius: 5,
  textAlign: "center",
  backgroundColor: "transparent",
  "&:hover": {
    color: "$blue",
    textDecoration: "none",
    cursor: "pointer",
  },
  variants: {
    size: {
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
      },
      small: {
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: "x-small",
      },
    },
  },
  defaultVariants: {
    size: "standard",
  },
});
