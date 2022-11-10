import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import {
  currentPage,
  language,
  nodeClassMenuOpen,
  nodeClassSelected,
  stateGenerator,
  toNodeInfo,
} from "~/common";
import { GenLayout } from "~/component";
import { dictNodeClassTrans } from "~/data";
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
      `${t`Infosphere node`} (${
        nc !== undefined ? i18n._(dictNodeClassTrans[nc]) : i18n._("any")
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
          <NodeCard data={toNodeInfo(gen.node[k])} key={k}></NodeCard>
        ))}{" "}
      </GenLayout>
      <ClassMenu title={t`node class`} />
    </>
  );
};
