import { useAtomValue } from "jotai";
import { language } from "~/common";
import { Button, Flex } from "~/component";

export const RollerPane = () => {
  const lang = useAtomValue(language);

  return (
    <Flex>
      <Flex></Flex>
      <Flex direction="column" scrolled>
        <Button>d4</Button>
        <Button>d6</Button>
        <Button>d8</Button>
        <Button>d10</Button>
        <Button>d20</Button>
      </Flex>
    </Flex>
  );
};
