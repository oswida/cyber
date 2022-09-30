import { useAtom, useAtomValue } from "jotai";
import {
  genTitles,
  globalStr,
  language,
  nodeClassMenuOpen,
  nodeClassSelected,
} from "~/common";
import { Button, Flex, LinkButton, Modal, Text } from "~/component";
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
          <Button onClick={() => select(key)}>
            {NodeClassDict[lang][key]}
          </Button>
        ))}
        <Button onClick={() => select(undefined)}>
          {globalStr[lang]["any"]}
        </Button>
      </Flex>
    </Modal>
  );
};
