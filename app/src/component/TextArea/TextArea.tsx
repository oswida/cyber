import { Component, ComponentProps } from "solid-js";
import { TextAreaStyle } from "./styles.css";

type Props = {
  small?: boolean;
  border?: "none" | "down" | "full";
};

export const TextArea: Component<ComponentProps<"div"> & Props> = ({
  style,
  small,
  border,
  contentEditable,
  ref,
  children,
  onBlur,
}) => {
  return (
    <div
      class={TextAreaStyle({ small: small, border: border })}
      style={style}
      contentEditable={contentEditable}
      ref={ref}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
};
