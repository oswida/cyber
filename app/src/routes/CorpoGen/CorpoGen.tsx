import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { currentPage, language } from "~/common";
import { Button, Flex, PageContent, PageHeader, PageRoot } from "~/component";
import { Layout } from "../Layout";
import { CorpoCard, CorpoType } from "./CorpoCard";
import { useCorpoGen } from "./useCorpoGen";

export const CorpoGen = () => {
  const { rollCorpo } = useCorpoGen();
  const [data, setData] = useLocalStorageState<CorpoType[]>("Cyber_CORPOGEN", {
    defaultValue: [] as CorpoType[],
  });
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(lang == "en" ? "Corporation" : "Korporacja");
  }, [lang]);

  const generate = () => {
    setData((state) => [...state, rollCorpo()]);
  };

  const clean = () => {
    setData([]);
  };

  const exportData = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        Nazwa: `${it.name1} ${it.name3}`,
        Działalność: it.domains.join(", "),
        Slogan: it.slogan,
      }))
    );
    const link = document.createElement("a");
    link.download = "zaibatsu.json";
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
            <CorpoCard
              data={it}
              key={`${it.name1}-${it.name2}-${it.name3}`}
            ></CorpoCard>
          ))}
        </PageContent>
      </PageRoot>
    </Layout>
  );
};
