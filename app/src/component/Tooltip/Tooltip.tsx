import * as tooltip from "@zag-js/tooltip";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, ParentProps, Show } from "solid-js";
import { TooltipButtonStyle, TooltipStyle } from "./styles.css";

export const Tooltip = ({ children, text }: ParentProps<{ text: string }>) => {
  const [state, send] = useMachine(
    tooltip.machine({ id: createUniqueId(), openDelay: 1000, closeDelay: 200 })
  );

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));

  return (
    <div>
      <button {...api().triggerProps} class={TooltipButtonStyle}>
        {children}
      </button>
      <Show when={api().isOpen && text.trim() !== ""}>
        <div {...api().positionerProps} class={TooltipStyle}>
          <div {...api().contentProps}>{text}</div>
        </div>
      </Show>
    </div>
  );
};
