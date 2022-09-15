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

  const exportData = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        Imię: it.name,
        Nazwisko: it.surname,
        Zajęcie: it.occupation,
        Wygląd: it.look,
        Cechy: it.traits.join(", "),
        Cel: it.goal,
      }))
    );
    const link = document.createElement("a");
    link.download = "npc.json";
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
    link.click();
  };

  return (
    <Layout>
      <PageRoot>
        <PageHeader>
          <Text
            color="pink"
            weight={"700"}
            css={{ marginLeft: 10, textTransform: "uppercase" }}
          >
            &gt; Postać
          </Text>
          <Flex css={{ gap: 10 }}>
            <Button onClick={generate}>Generuj</Button>
            <Button onClick={clean}>Wyczyść</Button>
            <Button onClick={exportData} title="Eksportuj">
              Eksport
            </Button>
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