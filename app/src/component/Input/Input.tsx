import { ComponentProps, Match, Switch } from "solid-js";
import { InputStyle } from "./styles.css";

type Props = {
  underline?: boolean | "blue";
  center?: boolean;
  small?: boolean;
  middle?: boolean;
};

export const Input = ({
  underline,
  center,
  title,
  style,
  ref,
  placeholder,
  small,
  onChange,
  onInput,
  value,
  middle,
}: ComponentProps<"input"> & Props) => {
  return (
    <Switch>
      <Match when={value}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            small: small,
            middle: middle,
          })}
          style={style}
          title={title}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onInput={onInput}
          value={value}
        />
      </Match>
      <Match when={!value}>
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
          onInput={onInput}
        />
      </Match>
    </Switch>
  );
};
