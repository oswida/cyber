import * as tabs from "@zag-js/tabs";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For } from "solid-js";
import {
  TabsRootStyle,
  TabsTriggerGroupStyle,
  TabsTriggerStyle,
} from "./styles.css";

export type TabsDesc = {
  label: string;
  value: string;
  content: any;
};

export const Tabs = ({
  items,
  onTabChange,
}: {
  items: TabsDesc[];
  onTabChange?: (name: string) => void;
}) => {
  const [state, send] = useMachine(
    tabs.machine({
      value: items.length > 0 ? items[0].value : undefined,
      id: createUniqueId(),
      onChange: (e: any) => {
        if (onTabChange) onTabChange(e.value);
      },
    })
  );
  const api = createMemo(() => tabs.connect(state, send, normalizeProps));

  return (
    <div {...api().rootProps} class={TabsRootStyle}>
      <div {...api().triggerGroupProps} class={TabsTriggerGroupStyle}>
        <For each={items}>
          {(item) => (
            <button
              {...api().getTriggerProps({ value: item.value })}
              class={TabsTriggerStyle}
            >
              {item.label}
            </button>
          )}
        </For>
      </div>
      <For each={items}>
        {(item) => (
          <div {...api().getContentProps({ value: item.value })}>
            {item.content}
          </div>
        )}
      </For>
    </div>
  );
};
