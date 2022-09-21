import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { currentPage, language } from "~/common";
import { Button, Flex, PageContent, PageHeader, PageRoot } from "~/component";
import { NodeClass, NodeType } from "~/data";
import { Layout } from "../Layout";
import { NodeCard } from "./NodeCard";
import { useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [data, setData] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });
  const [cp, setCp] = useAtom(currentPage);
  const { rollNode } = useNodeGen();
  const [modal, setModal] = useState(false);
  const [nclass, setNClass] = useState<NodeClass | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(lang == "en" ? "Infonode" : "Infowęzeł");
  }, [lang]);

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

  const nodeClassName: Record<string, any> = {
    pl: {
      Dowolny: "Dowolny",
      Publiczny: "Publiczny",
      Prywatny: "Prywatny",
      "Prywatny strzeżony": "Prywatny strzeżony",
      Rządowy: "Rządowy",
      Wojskowy: "Wojskowy",
      Korporacyjny: "Korporacyjny",
      SI: "SI",
    },
    en: {
      Dowolny: "Any",
      Publiczny: "Public",
      Prywatny: "Private",
      "Prywatny strzeżony": "Private secured",
      Rządowy: "Government",
      Wojskowy: "Military",
      Korporacyjny: "Corporation",
      SI: "AI",
    },
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
            <Button
              onClick={() => setModal(true)}
              title="Klasa węzła"
              css={{ color: "$pink" }}
            >
              {nclass && `${nodeClassName[lang][nclass]}`}
              {!nclass && `${nodeClassName[lang]["Dowolny"]}`}
            </Button>
            <Button onClick={() => generate(nclass)} title="Generuj">
              {lang == "en" ? "Generate" : "Generuj"}
            </Button>
            <Button onClick={clean} title="Wyczyść">
              {lang == "en" ? "Clear" : "Wyczyść"}
            </Button>
            <Button onClick={() => exportNodes()} title="Eksportuj">
              {lang == "en" ? "Export" : "Eksport"}
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
              <Button onClick={() => select(undefined)}>
                {lang == "en" ? "Any" : "Dowolny"}
              </Button>
              <Button onClick={() => select("Publiczny")}>
                {lang == "en" ? "Public" : "Publiczny"}
              </Button>
              <Button onClick={() => select("Prywatny")}>
                {lang == "en" ? "Private" : "Prywatny"}
              </Button>
              <Button onClick={() => select("Prywatny strzeżony")}>
                {lang == "en" ? "Private secured" : "Prywatny strzeżony"}
              </Button>
              <Button onClick={() => select("Rządowy")}>
                {lang == "en" ? "Government" : "Rządowy"}
              </Button>
              <Button onClick={() => select("Korporacyjny")}>
                {lang == "en" ? "Corporation" : "Korporacyjny"}
              </Button>
              <Button onClick={() => select("Wojskowy")}>
                {lang == "en" ? "Military" : "Wojskowy"}
              </Button>
              <Button onClick={() => select("SI")}>
                {lang == "en" ? "AI" : "SI"}
              </Button>

              <Button onClick={() => setModal(false)}>
                {lang == "en" ? "Cancel" : "Anuluj"}
              </Button>
            </Flex>
          )}
        </PageContent>
      </PageRoot>
    </Layout>
  );
};
