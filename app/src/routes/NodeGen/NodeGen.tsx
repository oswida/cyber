import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  currentPage,
  genTitles,
  globalStr,
  language,
  nodeClassMenuOpen,
  nodeClassSelected,
} from "~/common";
import {
  Flex,
  PageContent,
  PageHeader,
  PageRoot,
  GenLayout,
} from "~/component";
import { NodeClassDict, NodeType } from "~/data";
import { ClassMenu } from "./ClassMenu";
import { NodeCard } from "./NodeCard";
import { useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [data, setData] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });
  const [, setCp] = useAtom(currentPage);
  const { rollNode } = useNodeGen();
  const contentRef = useRef<HTMLDivElement>(null);
  const lang = useAtomValue(language);
  const [, setCm] = useAtom(nodeClassMenuOpen);
  const [nc, setNc] = useAtom(nodeClassSelected);

  useEffect(() => {
    setCp(
      `${genTitles[lang]["node"]} (${
        nc ? NodeClassDict[lang][nc] : globalStr[lang]["any"]
      })`
    );
  }, [lang, nc]);

  const generate = () => {
    setData((state) => [...state, ...rollNode(nc)]);
  };

  const clean = () => {
    setData([]);
  };

  const exportNodes = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        name: it.name,
        class: it.ntype,
        look: it.look,
        hp: it.hp,
        inf: it.inf,
        ice: it.ice,
        black_ice: it.black ? true : false,
        security: `${it.security}; ${it.more}`,
        data: it.data,
      }))
    );
    const link = document.createElement("a");
    link.download = "infonode.json";
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
    link.click();
  };

  const selectClass = () => {
    setCm(true);
  };

  return (
    <>
      <GenLayout
        headerMenu={{
          generate: generate,
          clear: clean,
          export: exportNodes,
          nodeclass: selectClass,
        }}
      >
        {data.map((it) => (
          <NodeCard data={it} key={`${it.name}`} id={`${it.name}`}></NodeCard>
        ))}{" "}
      </GenLayout>
      <ClassMenu title={globalStr[lang]["node class"]} />
    </>
  );
};
