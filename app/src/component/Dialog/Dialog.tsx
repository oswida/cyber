import { useI18n } from "@solid-primitives/i18n";
import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createUniqueId,
  ParentProps,
  Setter,
  Show,
} from "solid-js";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Texte } from "../Texte";
import {
  CloseButtonStyle,
  DialogBackdropStyle,
  DialogContentStyle,
  DialogUnderlayStyle,
} from "./styles.css";

type Props = {
  title?: string;
  opacity?: "less" | "more" | "full";
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

export const Dialog: Component<ParentProps & Props> = ({
  children,
  open,
  setOpen,
  title,
  opacity,
}) => {
  const [state, send] = useMachine(
    dialog.machine({
      id: createUniqueId(),
      onClose: () => {
        setOpen(false);
      },
    })
  );
  const api = createMemo(() => dialog.connect(state, send, normalizeProps));
  const [t] = useI18n();

  createEffect(() => {
    if (open()) api().open();
    else api().close();
  });

  const close = () => {
    setOpen(false);
  };

  return (
    <Show when={api().isOpen}>
      <div>
        <div
          {...api().backdropProps}
          class={DialogBackdropStyle({ opacity: opacity })}
        />
        <div id="underlay" {...api().underlayProps} class={DialogUnderlayStyle}>
          <div {...api().contentProps} class={DialogContentStyle}>
            <Flex type="column">
              <Flex
                style={{
                  "justify-content": "space-between",
                  "padding-left": "20px",
                  "margin-bottom": "20px",
                  "margin-top": "10px",
                }}
              >
                <Texte color="yellow">{title}</Texte>
                <div
                  title={t("Close")}
                  onClick={close}
                  class={CloseButtonStyle}
                >
                  ×
                </div>
              </Flex>
              {children}
            </Flex>
          </div>
        </div>
      </div>
    </Show>
  );
};
