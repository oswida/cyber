import useLocalStorageState from "use-local-storage-state";
import {
  Button,
  Flex,
  PageContent,
  PageHeader,
  PageRoot,
  Text,
} from "~/component";
import { NodeType } from "~/data";
import { Layout } from "../Layout";
import { NodeCard } from "./NodeCard";
import { useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [data, setData] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });
  const { rollNode } = useNodeGen();

  const generate = () => {
    setData((state) => [...state, ...rollNode()]);
  };

  const clean = () => {
    setData([]);
  };
  return (
    <Layout>
      <PageRoot>
        <PageHeader>
          <Text weight={"700"} css={{ marginLeft: 10 }}>
            Węzeł Infosfery
          </Text>
          <Flex css={{ gap: 10 }}>
            <Button onClick={generate}>Generuj</Button>
            <Button onClick={clean}>Wyczyść</Button>
          </Flex>
        </PageHeader>
        <PageContent>
          {data.map((it) => (
            <NodeCard data={it} key={`${it.name}`}></NodeCard>
          ))}
        </PageContent>
      </PageRoot>
    </Layout>
  );
};
