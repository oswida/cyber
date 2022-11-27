import { debounce } from "@solid-primitives/scheduled";
import { ComponentProps, Match, Switch } from "solid-js";
import { InputStyle } from "./styles.css";

type Props = {
  underline?: boolean | "blue";
  center?: boolean;
  small?: boolean;
  middle?: boolean;
  transparent?: boolean;
};

export const Input = ({
  underline,
  center,
  title,
  style,
  ref,
  placeholder,
  small,
  transparent,
  onChange,
  onInput,
  value,
  middle,
  onBlur,
}: ComponentProps<"input"> & Props) => {
  return (
    <Switch>
      <Match when={value !== undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            small: small,
            middle: middle,
            transparent: transparent,
          })}
          style={style}
          title={title}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          value={value}
        />
      </Match>
      <Match when={value === undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            small: small,
          })}
          style={style}
          title={title}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
        />
      </Match>
    </Switch>
  );
};
