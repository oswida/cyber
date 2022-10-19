import { useAtom, useAtomValue } from "jotai";
import { PcInfo, statePlayers, themeColors } from "~/common";
import { ContentItem } from "./styles";
import { Text, Flex } from "~/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarth,
  faPowerOff,
  faStop,
  faStopCircle,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { useStorage } from "~/common/storage";

type Props = {
  playerId: string;
  selected: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
};

export const PlayerCard = ({
  playerId,
  selected,
  onClick,
  onDoubleClick,
}: Props) => {
  const [players, setPlayers] = useAtom(statePlayers);
  const item: PcInfo | undefined = players[playerId];
  const { savePlayers } = useStorage();

  const tooltip = () => {
    if (!item) return "";
    //TODO: more descriptions
    return `${item.name}\nSubscription: ${item.subscription}`;
  };

  const cmTooltip = () => {
    if (!item) return "";
    const tt = item.cybermods.map((it) => {
      let res = `${it.name}: ${it.description}`;
      if (!it.need_activation) {
        res = res + " (R)";
      } else if (it.activated) {
        res = res + " (A)";
      }
      return res;
    });
    return tt.join("\n");
  };

  const cdTooltip = () => {
    if (!item) return "";
    const tt = item.cyberdeck.map((it) => {
      let res = `${it.name}: ${it.description}`;
      if (it.activated) {
        res = res + " (A)";
      }
      return res;
    });
    return tt.join("\n");
  };

  const invTooltip = () => {
    if (!item) return "";
    const tt = item.inventory.map((it) => {
      let res = `${it.description}`;
      if (it.fatigue) {
        res = res + " (F)";
      }
      return res;
    });
    return tt.join("\n");
  };

  const activatedCybermods = useMemo(() => {
    if (!item) return [];
    return item.cybermods.filter((m) => {
      return m.need_activation && m.activated;
    });
  }, [item, item?.cybermods]);

  const activatedPrograms = useMemo(() => {
    if (!item) return [];
    return item.cyberdeck.filter((m) => {
      return m.need_activation && m.activated;
    });
  }, [item, item?.cyberdeck]);

  const fatiguedSlots = useMemo(() => {
    if (!item) return [];
    return item.inventory.filter((s) => s.fatigue);
  }, [item, item?.inventory]);

  const deactivateCybermods = () => {
    if (!item) return;
    const nc = [...item.cybermods];
    nc.forEach((it) => {
      it.activated = false;
    });
    const newState = { ...players };
    newState[item.id] = { ...item, cybermods: nc };
    setPlayers(newState);
    savePlayers(newState);
    alert("Cybermods deactivated");
  };

  const deactivatePrograms = () => {
    if (!item) return;
    const nc = [...item.cyberdeck];
    nc.forEach((it) => {
      it.activated = false;
    });
    const newState = { ...players };
    newState[item.id] = { ...item, cyberdeck: nc };
    setPlayers(newState);
    savePlayers(newState);
    alert("Cyberdeck programs deactivated");
  };

  return (
    <ContentItem
      selected={selected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      css={{ justifyContent: "space-between" }}
    >
      <Flex direction="column" css={{ gap: 10 }}>
        <Text title={tooltip()} color="green">
          {item?.name}
        </Text>
        <Flex css={{ gap: 10 }}>
          <Text size="middle">BIO: </Text>
          <Text size="middle" color="yellow">
            {item?.bio[0]}/{item?.bio[1]}
          </Text>
          <Text size="middle">PSY: </Text>
          <Text size="middle" color="yellow">
            {item?.psy[0]}/{item?.psy[1]}
          </Text>
          <Text size="middle">INF: </Text>
          <Text size="middle" color="yellow">
            {item?.inf[0]}/{item?.inf[1]}
          </Text>

          <Text size="middle">HP: </Text>
          <Text size="middle" color="yellow">
            {item?.hp[0]}/{item?.hp[1]}
          </Text>
          <Text size="middle">Armor: </Text>
          <Text size="middle" color="yellow">
            {item?.armor}
          </Text>
        </Flex>
        <Flex css={{ gap: 10 }}>
          <Text size="middle" title={invTooltip()}>
            Items:{" "}
          </Text>
          <Text size="middle" color="yellow">
            {fatiguedSlots.length}/{item?.inventory?.length}
          </Text>
          <Text size="middle" title={cmTooltip()}>
            Cybermods:{" "}
          </Text>
          <Text size="middle" color="yellow">
            {activatedCybermods.length}/{item?.cybermods?.length}
          </Text>
          <FontAwesomeIcon
            icon={faPowerOff}
            title="Deactivate all cybermods"
            onClick={deactivateCybermods}
          />
          <Text size="middle" title={cdTooltip()}>
            Cyberdeck:{" "}
          </Text>
          <Text size="middle" color="yellow">
            {activatedPrograms.length}/{item?.cyberdeck?.length}
          </Text>
          <FontAwesomeIcon
            icon={faStopCircle}
            title="Deactivate all programs"
            onClick={deactivatePrograms}
          />
        </Flex>
      </Flex>
      {item && item.shared && (
        <FontAwesomeIcon
          icon={faEarth}
          style={{ alignSelf: "start" }}
          title="Shared character"
          color={themeColors.blue}
        />
      )}
    </ContentItem>
  );
};
