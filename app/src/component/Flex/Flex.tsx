import { ComponentProps } from "solid-js";
import { FlexStyle } from "./styles.css";

type Props = {
  type?: "column" | "row";
  center?: boolean;
  vcenter?: boolean;
  scrolled?: boolean;
};

export const Flex = ({
  children,
  type,
  center,
  vcenter,

  scrolled,
  style,
  title,
}: ComponentProps<"div"> & Props) => {
  return (
    <div
      class={FlexStyle({
        type: type,
        center: center,
        vcenter: vcenter,
        scrolled: scrolled,
      })}
      style={style}
      title={title}
    >
      {children}
    </div>
  );
};
