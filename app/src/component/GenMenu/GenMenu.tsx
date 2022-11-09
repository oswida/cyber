import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { genMenuOpen, genTitles, language } from "~/common";
import { LinkButton } from "../Button";
import { Flex } from "../Flex";
import { Modal } from "../Modal";
import { Text } from "../Text";

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
        {Object.keys(genTitles).map((key) => (
          <LinkButton to={`/${key}`} onClick={close} key={`${key}`}>
            {genTitles[key]}
          </LinkButton>
        ))}
        {extras !== undefined &&
          Object.keys(extras).map((key) => (
            <LinkButton to={`${extras[key]}`} onClick={close} key={`${key}`}>
              {key}
            </LinkButton>
          ))}
      </Flex>
    </Modal>
  );
};
