import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { currentPage, genTitles, language } from "~/common";
import { GenLayout } from "~/component/GenLayout";

export const PlaceGen = () => {
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(genTitles[lang]["place"]);
  }, [lang]);

  const generate = () => {};

  const clean = () => {};

  const exportCards = () => {};

  return (
    <GenLayout
      headerMenu={{
        generate: generate,
        clear: clean,
        export: exportCards,
      }}
    ></GenLayout>
  );
};
