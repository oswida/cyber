import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { currentPage, genTitles, language, stateGenerator } from "~/common";
import { GenLayout } from "~/component/GenLayout";
import { CorpoCard } from "./CorpoCard";
import { useCorpoGen } from "./useCorpoGen";

export const CorpoGen = () => {
  const { generate, clean, exportData, importData } = useCorpoGen();
  const [cp, setCp] = useAtom(currentPage);
  const gen = useAtomValue(stateGenerator);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(genTitles[lang]["corpo"]);
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
      {Object.keys(gen.corpo).map((k) => (
        <CorpoCard data={gen.corpo[k]!!} key={k}></CorpoCard>
      ))}
    </GenLayout>
  );
};
