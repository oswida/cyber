import * as pressable from "@zag-js/pressable";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { ComponentProps, createMemo, createUniqueId } from "solid-js";
import { ButtonStyle } from "./styles.css";

type Props = {
  onClick?: () => void;
  noupper?: boolean;
  size?: "standard" | "small" | "bigger";
  border?: "standard" | "underline" | "none";
  color?: "green" | "ghost" | "filled";
};

export const Button = ({
  children,
  onClick,
  noupper,
  size,
  border,
  color,
  style,
  title,
  ref,
}: ComponentProps<"button"> & Props) => {
  const [state, send] = useMachine(
    pressable.machine({
      id: createUniqueId(),
      onPress: onClick,
    })
  );

  const api = createMemo(() => pressable.connect(state, send, normalizeProps));

  return (
    <button
      {...api().pressableProps}
      class={ButtonStyle({
        noupper: noupper,
        size: size,
        border: border,
        color: color,
      })}
      style={style}
      title={title}
      ref={ref}
    >
      {children}
    </button>
  );
};
