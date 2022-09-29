import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { currentPage, language, modalOpen } from "~/common";
import { Button, Flex, PageContent, PageHeader, PageRoot } from "~/component";
import { NpcType } from "~/data";
import { Layout } from "../Layout";
import { NpcCard } from "./NpcCard";
import { useNpcGen } from "./useNpcGen";

export const NpcGenView = () => {
  const [mv, setMV] = useAtom(modalOpen);
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);
  const [data, setData] = useLocalStorageState<NpcType[]>("Cyber_NPCGEN", {
    defaultValue: [] as NpcType[],
  });
  const { rollNpc } = useNpcGen();

  useEffect(() => {
    setCp(lang == "en" ? "NPC" : "Bohater niezależny");
  }, [lang]);

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
          <Flex
            css={{
              gap: 10,
              paddingLeft: 10,
              paddingBottom: 5,
              overflow: "auto",
            }}
          >
            <Button onClick={generate}>
              {lang == "en" ? "Generate" : "Generuj"}
            </Button>
            <Button onClick={clean}>
              {lang == "en" ? "Clear" : "Wyczyść"}
            </Button>
            <Button onClick={exportData} title="Eksportuj">
              {lang == "en" ? "Export" : "Eksport"}
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
