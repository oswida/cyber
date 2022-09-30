import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { currentPage, genTitles, language } from "~/common";
import { GenLayout } from "~/component/GenLayout";
import { CorpoCard, CorpoType } from "./CorpoCard";
import { useCorpoGen } from "./useCorpoGen";

export const CorpoGen = () => {
  const { rollCorpo } = useCorpoGen();
  const [data, setData] = useLocalStorageState<CorpoType[]>("Cyber_CORPOGEN", {
    defaultValue: [] as CorpoType[],
  });
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);

  useEffect(() => {
    setCp(genTitles[lang]["corpo"]);
  }, [lang]);

  const generate = () => {
    setData((state) => [...state, rollCorpo()]);
  };

  const clean = () => {
    setData([]);
  };

  const exportData = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        Nazwa: `${it.name1} ${it.name3}`,
        Działalność: it.domains.join(", "),
        Slogan: it.slogan,
      }))
    );
    const link = document.createElement("a");
    link.download = "zaibatsu.json";
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
    link.click();
  };

  return (
    <GenLayout
      headerMenu={{
        generate: generate,
        clear: clean,
        export: exportData,
      }}
    >
      {data.map((it) => (
        <CorpoCard
          data={it}
          key={`${it.name1}-${it.name2}-${it.name3}`}
        ></CorpoCard>
      ))}
    </GenLayout>
  );
};
