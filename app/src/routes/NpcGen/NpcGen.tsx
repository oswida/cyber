import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import {
  currentPage,
  genTitles,
  language,
  modalOpen,
  stateGenerator,
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
    setCp(genTitles[lang]["npc"]);
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
        <NpcCard data={gen.npc[k]!!} key={k}></NpcCard>
      ))}
    </GenLayout>
  );
};
