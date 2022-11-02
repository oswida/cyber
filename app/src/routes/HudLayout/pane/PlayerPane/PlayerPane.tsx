import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useAtom, useAtomValue } from "jotai";
import { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  doExport,
  doImport,
  langHud,
  PcInfo,
  prettyToday,
  stateNats,
  statePlayerForm,
  statePlayers,
  stateSessionData,
  topicChars,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Icon, Input, Text } from "~/component";
import { HudPane } from "../../styles";
import { InvInfo } from "./InvInfo";
import { ModInfo } from "./ModInfo";
import { PlayerCard } from "./PlayerCard";
import { PlayerForm } from "./PlayerForm";
import { StatInfo } from "./StatInfo";
import { ListRoot } from "./styles";

export const PlayerPane = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useAtom(statePlayers);
  const [sel, setSel] = useState("");
  const [pf, setPf] = useAtom(statePlayerForm);
  const { savePlayers } = useStorage();
  const sessionData = useAtomValue(stateSessionData);
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const [subformVisible, setSubformVisible] = useState<Record<string, boolean>>(
    {}
  );

  const clear = () => {
    if (!nameRef.current) return;
    nameRef.current.value = "";
  };

  const add = () => {
    if (!nameRef.current || nameRef.current.value.trim() === "") return;
    const newState = { ...players };
    const player: PcInfo = {
      id: uuidv4(),
      name: nameRef.current.value,
      bio: [10, 10],
      psy: [10, 10],
      inf: [10, 10],
      hp: [0, 0],
      armor: 0,
      subscription: "bronze",
      credits: 0,
      cyberdeck: [],
      cybermods: [],
      inventory: [],
      shared: false,
    };
    newState[player.id] = player;
    setPlayers(newState);
    nameRef.current.value = "";
    savePlayers(newState);
  };

  const exportPlayers = () => {
    const filename = `players-${prettyToday()}.json`;
    doExport(players, filename);
  };

  const importPlayers = () => {
    doImport((data: any) => {
      setPlayers(data);
      if (sessionData.hosting) {
        publish(nats.connection, topicChars, [Object.values(data)]);
      }
    });
  };

  const currentItem = useMemo(() => {
    return pf.item;
  }, [pf]);

  const clearPanels = () => {
    setSubformVisible({});
  };

  const cardClick = (k: string) => {
    if (sel === k) return;
    clearPanels();
    setSel(k);
  };

  const showSubform = (
    subform: "cyberdeck" | "cybermod" | "basic" | "stat" | "inventory",
    visible: boolean
  ) => {
    const newState = { ...subformVisible };
    newState[subform] = visible;
    setSubformVisible(newState);
  };

  return (
    <HudPane>
      <Flex css={{ alignItems: "center", width: "90%", margin: 10 }}>
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].name}:
        </Text>
        <Input border="down" css={{ width: "100%" }} ref={nameRef} />
        <Icon color="blue" icon={faDeleteLeft} onClick={clear} />
        <Button
          border="underline"
          noupper
          size="small"
          onClick={add}
          css={{ marginRight: 20 }}
        >
          {langHud[sessionData.lang!!].add}
        </Button>
        <Button border="underline" noupper size="small" onClick={exportPlayers}>
          {langHud[sessionData.lang!!].export}
        </Button>
        <Button border="underline" noupper size="small" onClick={importPlayers}>
          Import
        </Button>
      </Flex>
      <ListRoot>
        {Object.keys(players).map(
          (k) =>
            players[k] && (
              <PlayerCard
                showSubform={showSubform}
                key={k}
                playerId={k}
                onClick={() => cardClick(k)}
                onDoubleClick={() => setPf({ open: true, item: players[k] })}
                selected={sel === k}
              />
            )
        )}
      </ListRoot>
      {subformVisible["cyberdeck"] && sel !== "" && (
        <ModInfo
          item={players[sel]}
          itemType="cyberdeck"
          onClose={() => showSubform("cyberdeck", false)}
        />
      )}
      {subformVisible["cybermod"] && sel !== "" && (
        <ModInfo
          item={players[sel]}
          itemType="cybermods"
          onClose={() => showSubform("cybermod", false)}
        />
      )}
      {subformVisible["inventory"] && sel !== "" && (
        <InvInfo
          item={players[sel]}
          onClose={() => showSubform("inventory", false)}
        />
      )}
      {subformVisible["stat"] && sel !== "" && (
        <StatInfo
          item={players[sel]}
          onClose={() => showSubform("stat", false)}
        />
      )}
      {currentItem && <PlayerForm item={currentItem} />}
    </HudPane>
  );
};
