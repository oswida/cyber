import { useAtom, useAtomValue } from "jotai";
import { genMenuOpen, genTitles, language } from "~/common";
import { Flex, LinkButton, Modal, Text } from "~/component";

export type GenMenuProps = {
  extras?: Record<string, string>;
  title?: string;
};

export const GenMenu = ({ extras, title }: GenMenuProps) => {
  const lang = useAtomValue(language);
  const [gm, setGm] = useAtom(genMenuOpen);
  const close = () => {
    setGm(false);
  };

  return (
    <Modal isOpen={gm} onClose={() => setGm(false)}>
      <Flex direction="column" css={{ gap: 10 }}>
        {title && (
          <Text color="blue" align="center">
            {title}
          </Text>
        )}
        {Object.keys(genTitles[lang]).map((key) => (
          <LinkButton to={`/${key}`} onClick={close}>
            {genTitles[lang][key]}
          </LinkButton>
        ))}
        {extras !== undefined &&
          Object.keys(extras).map((key) => (
            <LinkButton to={`${extras[key]}`} onClick={close}>
              {key}
            </LinkButton>
          ))}
      </Flex>
    </Modal>
  );
};
