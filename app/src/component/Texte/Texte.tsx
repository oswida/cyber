import { Component, ComponentProps, ParentProps } from "solid-js";
import { TexteStyle } from "./styles.css";

type Props = {
  align?: "right" | "left" | "center";
  size?: "regular" | "middle" | "small" | "xsmall" | "bigger";
  weight?: 400 | 700;
  color?: "primary" | "white" | "pink" | "yellow" | "blue" | "green";
};

export const Texte: Component<ComponentProps<"div"> & Props> = ({
  children,
  style,
  align,
  size,
  weight,
  color,
  ref,
  onClick,
}) => {
  return (
    <div
      class={TexteStyle({
        size: size,
        align: align,
        color: color,
        weight: weight,
        clickable: onClick ? true : undefined,
      })}
      style={style}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
