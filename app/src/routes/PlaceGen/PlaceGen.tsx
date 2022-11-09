import { t } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { currentPage, language } from "~/common";
import { GenLayout } from "~/component/GenLayout";

export const PlaceGen = () => {
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(t`Place`);
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
