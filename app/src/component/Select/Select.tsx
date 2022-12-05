import * as select from "@zag-js/select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  ComponentProps,
  createEffect,
  createMemo,
  createUniqueId,
  Setter,
} from "solid-js";
import { SelectMenuStyle, SelectTriggerStyle } from "./styles.css";

export type SelectItemType = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  data: SelectItemType[];
  selected: Accessor<string | undefined>;
  setSelected: Setter<string>;
};

export const Select = ({
  title,
  data,
  selected,
  setSelected,
}: ComponentProps<"div"> & Props) => {
  const selectedItem = createMemo(() => {
    const s = selected();
    if (!s || s == "") return undefined;
    const it = data.filter((it) => it.value == s);
    if (it.length == 0) return undefined;
    return it[0];
  });

  const [state, send] = useMachine(
    select.machine({
      id: createUniqueId(),
      selectedOption: selectedItem(),
      onChange: (item) => {
        if (!item) return;
        const s = data.filter((it) => it.value == item.value);
        if (s.length == 0) return;
        setSelected(s[0].value);
      },
    })
  );

  const api = createMemo(() => select.connect(state, send, normalizeProps));

  return (
    <div>
      <div>
        <button {...api().triggerProps} class={SelectTriggerStyle}>
          <span>{api().selectedOption?.label ?? title}</span>
        </button>
      </div>

      <div {...api().positionerProps}>
        <ul
          {...api().menuProps}
          class={SelectMenuStyle}
          style={{ "list-style-type": "none" }}
        >
          {data.map(({ label, value }) => (
            <li id={value} {...api().getOptionProps({ label, value })}>
              <span>{label}</span>
              {value === api().selectedOption?.value && "✓"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
