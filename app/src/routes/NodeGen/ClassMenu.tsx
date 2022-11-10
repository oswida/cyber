import { i18n } from "@lingui/core";
import { Trans } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { language, nodeClassMenuOpen, nodeClassSelected } from "~/common";
import { Button, Flex, Modal, Text } from "~/component";
import { dictNodeClass, dictNodeClassTrans } from "~/data";

export type ClassMenuProps = {
  title: string;
};

export const ClassMenu = ({ title }: ClassMenuProps) => {
  const [cm, setCm] = useAtom(nodeClassMenuOpen);
  const [nc, setNc] = useAtom(nodeClassSelected);

  const close = () => {
    setCm(false);
  };

  const select = (nclass: string | undefined) => {
    setNc(nclass);
    setCm(false);
  };

  return (
    <Modal isOpen={cm} onClose={close}>
      <Flex direction="column" css={{ gap: 10 }}>
        {title && (
          <Text color="blue" align="center">
            {title}
          </Text>
        )}
        {dictNodeClass.map((key) => (
          <Button onClick={() => select(key)} key={key}>
            {i18n._(dictNodeClassTrans[key])}
          </Button>
        ))}
        <Button onClick={() => select(undefined)}>
          <Trans>any</Trans>
        </Button>
      </Flex>
    </Modal>
  );
};
