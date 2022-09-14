import { useState } from "react";
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
import { NodeClass, useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [data, setData] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });
  const { rollNode } = useNodeGen();
  const [modal, setModal] = useState(false);
  const [nclass, setNClass] = useState<NodeClass | undefined>(undefined);

  const generate = (ntype?: NodeClass) => {
    setData((state) => [...state, ...rollNode(ntype)]);
  };

  const clean = () => {
    setData([]);
  };

  const select = (ntype?: NodeClass) => {
    setNClass(ntype);
    setModal(false);
  };

  return (
    <Layout>
      <PageRoot>
        <PageHeader>
          <Text
            weight={"700"}
            color="pink"
            css={{ marginLeft: 10, textTransform: "uppercase" }}
          >
            &gt; Węzeł Infosfery
          </Text>
          <Flex css={{ gap: 10 }}>
            <Button
              onClick={() => setModal(true)}
              title="Klasa węzła"
              css={{ color: "$pink" }}
            >
              {nclass && `${nclass}`}
              {!nclass && "Dowolny"}
            </Button>
            <Button onClick={() => generate(nclass)} title="Generuj">
              Generuj
            </Button>
            <Button onClick={clean} title="Wyczyść">
              WYCZYŚĆ
            </Button>
          </Flex>
        </PageHeader>
        <PageContent>
          {!modal &&
            data.map((it) => (
              <NodeCard data={it} key={`${it.name}`}></NodeCard>
            ))}
          {modal && (
            <Flex direction="column" css={{ gap: 10 }}>
              <Button onClick={() => select(undefined)}>Dowolny</Button>
              <Button onClick={() => select("Publiczny")}>Publiczny</Button>
              <Button onClick={() => select("Prywatny")}>Prywatny</Button>
              <Button onClick={() => select("Prywatny strzeżony")}>
                Prywatny strzeżony
              </Button>
              <Button onClick={() => select("Rządowy")}>Rządowy</Button>
              <Button onClick={() => select("Korporacyjny")}>
                Korporacyjny
              </Button>
              <Button onClick={() => select("Wojskowy")}>Wojskowy</Button>
              <Button onClick={() => select("SI")}>SI</Button>

              <Button onClick={() => setModal(false)}>Anuluj</Button>
            </Flex>
          )}
        </PageContent>
      </PageRoot>
    </Layout>
  );
};
