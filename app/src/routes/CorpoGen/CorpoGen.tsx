import useLocalStorageState from "use-local-storage-state";
import {
  Button,
  Flex,
  PageContent,
  PageHeader,
  PageRoot,
  Text,
} from "~/component";
import { Layout } from "../Layout";
import { CorpoCard, CorpoType } from "./CorpoCard";
import { useCorpoGen } from "./useCorpoGen";

export const CorpoGen = () => {
  const { rollCorpo } = useCorpoGen();
  const [data, setData] = useLocalStorageState<CorpoType[]>("Cyber_CORPOGEN", {
    defaultValue: [] as CorpoType[],
  });
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
          <Text
            color="pink"
            weight={"700"}
            css={{ marginLeft: 10, textTransform: "uppercase" }}
          >
            &gt; Korporacja
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
