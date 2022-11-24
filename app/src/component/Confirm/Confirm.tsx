import { useI18n } from "@solid-primitives/i18n";
import { Accessor, Component, ParentProps, Setter } from "solid-js";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Flex } from "../Flex";

type Props = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  title: string;
  accept: () => void;
};

export const Confirm: Component<ParentProps & Props> = ({
  title,
  open,
  setOpen,
  accept,
  children,
}) => {
  const [t] = useI18n();

  const ok = () => {
    setOpen(false);
    accept();
  };

  return (
    <Dialog title={title} open={open} setOpen={setOpen}>
      <Flex center type="column" style={{ "margin-top": "50px", gap: "20px" }}>
        {children}
        <Flex style={{ "justify-content": "space-between", gap: "50px" }}>
          <Button onClick={ok}>{t("Yes")}</Button>
          <Button onClick={() => setOpen(false)}>{t("No")}</Button>
        </Flex>
      </Flex>
    </Dialog>
  );
};
