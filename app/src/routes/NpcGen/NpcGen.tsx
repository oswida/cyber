import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { currentPage, genTitles, language, modalOpen } from "~/common";
import { NpcType } from "~/data";
import { GenLayout } from "~/component/GenLayout";
import { NpcCard } from "./NpcCard";
import { useNpcGen } from "./useNpcGen";

export const NpcGen = () => {
  const [mv, setMV] = useAtom(modalOpen);
  const [cp, setCp] = useAtom(currentPage);
  const lang = useAtomValue(language);
  const [data, setData] = useLocalStorageState<NpcType[]>("Cyber_NPCGEN", {
    defaultValue: [] as NpcType[],
  });
  const { rollNpc } = useNpcGen();

  useEffect(() => {
    setCp(genTitles[lang]["npc"]);
  }, []);

  const generate = () => {
    setData((state) => [...state, ...rollNpc()]);
  };

  const clean = () => {
    setData([]);
  };

  const exportData = () => {
    if (data.length == 0) return;
    const print = JSON.stringify(
      data.map((it) => ({
        Imię: it.name,
        Nazwisko: it.surname,
        Zajęcie: it.occupation,
        Wygląd: it.look,
        Cechy: it.traits.join(", "),
        Cel: it.goal,
      }))
    );
    const link = document.createElement("a");
    link.download = "npc.json";
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
        <NpcCard data={it} key={`${it.name}-${it.surname}`}></NpcCard>
      ))}
    </GenLayout>
  );
};
