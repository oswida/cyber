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

  return (
    <Layout>
      <PageRoot>
        <PageHeader>
          <Text weight={"700"} css={{ marginLeft: 10 }}>
            Korporacja
          </Text>
          <Flex css={{ gap: 10, marginRight: 20 }}>
            <Button onClick={generate}>Generuj</Button>
            <Button onClick={clean}>Wyczyść</Button>
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
