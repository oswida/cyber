import { useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  Button,
  Flex,
  PageContent,
  PageHeader,
  PageRoot,
  Text,
} from "~/component";
import { NodeClass, NodeType } from "~/data";
import { Layout } from "../Layout";
import { NodeCard } from "./NodeCard";
import { useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [data, setData] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });
  const { rollNode } = useNodeGen();
  const [modal, setModal] = useState(false);
  const [nclass, setNClass] = useState<NodeClass | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const exportNodes = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        Nazwa: it.name,
        Typ: it.ntype,
        Wygląd: it.look,
        OCHR: it.hp,
        INF: it.inf,
        LOD: it.ice,
        CZARNY_LOD: it.black ? "tak" : "nie",
        Zabezpieczenia: `${it.security}; ${it.more}`,
        Dane: it.data,
      }))
    );
    const link = document.createElement("a");
    link.download = "infonode.json";
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
    link.click();
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
            <Button onClick={() => exportNodes()} title="Eksportuj">
              Eksport
            </Button>
          </Flex>
        </PageHeader>
        <PageContent ref={contentRef}>
          {!modal &&
            data.map((it) => (
              <NodeCard
                data={it}
                key={`${it.name}`}
                id={`${it.name}`}
              ></NodeCard>
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
