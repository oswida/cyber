import useLocalStorageState from "use-local-storage-state";
import {
  Button,
  Flex,
  PageContent,
  PageHeader,
  PageRoot,
  Text,
} from "~/component";
import { NpcType } from "~/data";
import { Layout } from "../Layout";
import { NpcCard } from "./NpcCard";
import { useNpcGen } from "./useNpcGen";

export const NpcGenView = () => {
  const [data, setData] = useLocalStorageState<NpcType[]>("Cyber_NPCGEN", {
    defaultValue: [] as NpcType[],
  });
  const { rollNpc } = useNpcGen();

  const generate = () => {
    setData((state) => [...state, ...rollNpc()]);
  };

  const clean = () => {
    setData([]);
  };

  return (
    <Layout>
      <PageRoot>
        <PageHeader>
          <Text weight={"700"} css={{ marginLeft: 10 }}>
            Postać
          </Text>
          <Flex css={{ gap: 10 }}>
            <Button onClick={generate}>Generuj</Button>
            <Button onClick={clean}>Wyczyść</Button>
          </Flex>
        </PageHeader>
        <PageContent>
          {data.map((it) => (
            <NpcCard data={it} key={`${it.name}-${it.surname}`}></NpcCard>
          ))}
        </PageContent>
      </PageRoot>
    </Layout>
  );
};
