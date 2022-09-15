import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@stitches/react";
import { Link } from "react-router-dom";

export const Button = styled("div", {
  color: "#ffffff",
  "&:hover": {
    color: "#0fff50",
    textDecoration: "none",
    outline: "none",
    cursor: "pointer",
  },
  textTransform: "uppercase",
  padding: 5,
  paddingLeft: 7,
  paddingRight: 7,
  border: "solid 1px #0fff50",
  borderRadius: 5,
  backgroundColor: "transparent",
  userSelect: "none",
});

export const LinkButton = styled(Link, {
  color: "#ffffff",
  "&:hover": {
    color: "#0fff50",
  },
  textTransform: "uppercase",
  padding: 5,
  border: "solid 1px #0fff50",
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
