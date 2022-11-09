import { Trans } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { language, nodeClassMenuOpen, nodeClassSelected } from "~/common";
import { Button, Flex, Modal, Text } from "~/component";
import { NodeClassDict } from "~/data";

export type ClassMenuProps = {
  title: string;
};

export const ClassMenu = ({ title }: ClassMenuProps) => {
  const lang = useAtomValue(language);
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
        {Object.keys(NodeClassDict[lang]).map((key) => (
          <Button onClick={() => select(key)} key={key}>
            {NodeClassDict[lang][key]}
          </Button>
        ))}
        <Button onClick={() => select(undefined)}>
          <Trans>any</Trans>
        </Button>
      </Flex>
    </Modal>
  );
};
