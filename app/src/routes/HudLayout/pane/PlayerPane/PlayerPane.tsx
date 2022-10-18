import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { v4 as uuidv4 } from "uuid";
import { PcInfo, statePlayerForm, statePlayers } from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Icon, Input, Text } from "~/component";
import { HudPane } from "../../styles";
import { PlayerCard } from "./PlayerCard";
import { PlayerForm } from "./PlayerForm";
import { ListRoot } from "./styles";

export const PlayerPane = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useAtom(statePlayers);
  const [sel, setSel] = useState("");
  const [pf, setPf] = useAtom(statePlayerForm);
  const { savePlayers } = useStorage();

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

  const exportPlayers = () => {};

  const importPlayers = () => {
    //TODO: share data
  };

  return (
    <HudPane>
      <Flex css={{ alignItems: "center", width: "90%", margin: 10 }}>
        <Text color="yellow" size="small">
          Name:
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
          Add
        </Button>
        <Button border="underline" noupper size="small" onClick={exportPlayers}>
          Export
        </Button>
        <Button border="underline" noupper size="small" onClick={importPlayers}>
          Import
        </Button>
      </Flex>
      <ListRoot>
        <Scrollbars>
          {Object.keys(players).map(
            (k) =>
              players[k] && (
                <PlayerCard
                  key={k}
                  playerId={k}
                  onClick={() => setSel(k)}
                  onDoubleClick={() => setPf({ open: true, item: players[k] })}
                  selected={sel === k}
                />
              )
          )}
        </Scrollbars>
      </ListRoot>
      <PlayerForm item={pf.item} />
    </HudPane>
  );
};
