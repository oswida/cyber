import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import {
  currentPage,
  genTitles,
  globalStr,
  language,
  nodeClassMenuOpen,
  nodeClassSelected,
  stateGenerator,
} from "~/common";
import { GenLayout } from "~/component";
import { NodeClassDict } from "~/data";
import { ClassMenu } from "./ClassMenu";
import { NodeCard } from "./NodeCard";
import { useNodeGen } from "./useNodeGen";

export const NodeGen = () => {
  const [, setCp] = useAtom(currentPage);
  const { generate, clean, exportData, importData } = useNodeGen();
  const lang = useAtomValue(language);
  const [, setCm] = useAtom(nodeClassMenuOpen);
  const nc = useAtomValue(nodeClassSelected);
  const gen = useAtomValue(stateGenerator);

  useEffect(() => {
    setCp(
      `${genTitles[lang]["node"]} (${
        nc ? NodeClassDict[lang][nc] : globalStr[lang]["any"]
      })`
    );
  }, [lang, nc]);

  const selectClass = () => {
    setCm(true);
  };

  return (
    <>
      <GenLayout
        headerMenu={{
          generate: generate,
          clear: clean,
          export: exportData,
          import: importData,
          nodeclass: selectClass,
        }}
      >
        {Object.keys(gen.node).map((k) => (
          <NodeCard data={gen.node[k]!!} key={k}></NodeCard>
        ))}{" "}
      </GenLayout>
      <ClassMenu title={globalStr[lang]["node class"]} />
    </>
  );
};
