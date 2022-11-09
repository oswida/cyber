import { t } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import {
  currentPage,
  language,
  modalOpen,
  stateGenerator,
  toNpcInfo,
} from "~/common";
import { GenLayout } from "~/component/GenLayout";
import { NpcCard } from "./NpcCard";
import { useNpcGen } from "./useNpcGen";

export const NpcGen = () => {
  const [mv, setMV] = useAtom(modalOpen);
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);
  const gen = useAtomValue(stateGenerator);

  const { generate, clean, exportData, importData } = useNpcGen();

  useEffect(() => {
    setCp(t`NPC`);
  }, [lang]);

  return (
    <GenLayout
      headerMenu={{
        generate: generate,
        clear: clean,
        export: exportData,
        import: importData,
      }}
    >
      {Object.keys(gen.npc).map((k) => (
        <NpcCard data={toNpcInfo(gen.npc[k])} key={k}></NpcCard>
      ))}
    </GenLayout>
  );
};
