import { debounce } from "@solid-primitives/scheduled";
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
  onInput,
}) => {
  return (
    <div
      class={TextAreaStyle({ small: small, border: border })}
      style={style}
      contentEditable={contentEditable}
      ref={ref}
      onBlur={onBlur}
      onInput={onInput}
      spellcheck={false}
    >
      {children}
    </div>
  );
};
