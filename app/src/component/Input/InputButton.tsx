import { ComponentProps } from "solid-js";
import { InputButtonStyle, InputStyle } from "./styles.css";

type Props = {
  size?: "standard" | "small";
};

export const InputButton = ({
  title,
  style,
  ref,
  placeholder,
  size,
  onChange,
}: ComponentProps<"input"> & Props) => {
  return (
    <input
      class={InputButtonStyle({
        size: size,
      })}
      style={style}
      title={title}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};
