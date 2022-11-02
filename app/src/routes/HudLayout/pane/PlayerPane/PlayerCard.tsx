import {
  faEarth,
  faPowerOff,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  langHud,
  PcInfo,
  statePlayers,
  stateSessionData,
  styled,
  themeColors,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Flex, Text } from "~/component";
import { ContentItem } from "./styles";

type Props = {
  playerId: string;
  selected: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  showSubform?: (
    subform: "cyberdeck" | "cybermod" | "basic" | "stat" | "inventory",
    visible: boolean
  ) => void;
};

const ClickableText = styled(Text, {
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bolder",
  },
});

export const PlayerCard = ({
  playerId,
  selected,
  onClick,
  onDoubleClick,
  showSubform,
}: Props) => {
  const [players, setPlayers] = useAtom(statePlayers);
  const item: PcInfo | undefined = players[playerId];
  const { savePlayers } = useStorage();
  const sessionData = useAtomValue(stateSessionData);

  const tooltip = () => {
    if (!item) return "";
    //TODO: more descriptions
    return `${item.name}\nSubscription: ${item.subscription}`;
  };

  const cmTooltip = () => {
    if (!item || !item.cybermods) return "";
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
    if (!item || !item.cyberdeck) return "";
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
    if (!item || !item.inventory) return "";
    const tt = item.inventory.map((it) => {
      let res = `${it.description}`;
      if (it.fatigue) {
        res = res + " (F)";
      }
      return res;
    });
    return tt.join("\n");
  };

  const showCyberdeck = () => {
    if (!showSubform) return;
    showSubform("cyberdeck", true);
  };

  const showCybermods = () => {
    if (!showSubform) return;
    showSubform("cybermod", true);
  };

  const showInventory = () => {
    if (!showSubform) return;
    showSubform("inventory", true);
  };

  const showStat = () => {
    if (!showSubform) return;
    showSubform("stat", true);
  };

  const activatedCybermods = useMemo(() => {
    if (!item || !item.cybermods) return [];
    return item.cybermods.filter((m) => {
      return m.need_activation && m.activated;
    });
  }, [item, item?.cybermods]);

  const activatedPrograms = useMemo(() => {
    if (!item || !item.cyberdeck) return [];
    return item.cyberdeck.filter((m) => {
      return m.need_activation && m.activated;
    });
  }, [item, item?.cyberdeck]);

  const fatiguedSlots = useMemo(() => {
    if (!item || !item.inventory) return [];
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
          <ClickableText size="middle" onClick={showStat}>
            BIO:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {item?.bio ? item?.bio[0] : 0}/{item?.bio ? item?.bio[1] : 0}
          </Text>
          <ClickableText size="middle" onClick={showStat}>
            PSY:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {item?.psy ? item?.psy[0] : 0}/{item?.psy ? item?.psy[1] : 0}
          </Text>
          <ClickableText size="middle" onClick={showStat}>
            INF:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {item?.inf ? item?.inf[0] : 0}/{item?.inf ? item?.inf[1] : 0}
          </Text>

          <ClickableText size="middle" onClick={showStat}>
            {langHud[sessionData.lang!!].hp}:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {item?.hp ? item?.hp[0] : 0}/{item?.hp ? item?.hp[1] : 0}
          </Text>
          <ClickableText size="middle" onClick={showStat}>
            {langHud[sessionData.lang!!].armor}:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {item?.armor}
          </Text>
          {item?.deprived && (
            <Text size="middle" color="pink" css={{ marginLeft: 30 }}>
              {langHud[sessionData.lang!!].deprived}
            </Text>
          )}
        </Flex>
        <Flex css={{ gap: 10 }}>
          <ClickableText
            size="middle"
            title={invTooltip()}
            onClick={showInventory}
          >
            {langHud[sessionData.lang!!].items}:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {fatiguedSlots.length}/{item?.inventory?.length}
          </Text>
          <ClickableText
            size="middle"
            title={cmTooltip()}
            onClick={showCybermods}
          >
            {langHud[sessionData.lang!!].cybermods}:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {activatedCybermods.length}/{item?.cybermods?.length}
          </Text>
          {activatedCybermods.length > 0 && (
            <FontAwesomeIcon
              icon={faPowerOff}
              title={langHud[sessionData.lang!!].deactivate_cybermods}
              onClick={deactivateCybermods}
            />
          )}
          <ClickableText
            size="middle"
            title={cdTooltip()}
            onClick={showCyberdeck}
          >
            {langHud[sessionData.lang!!].cyberdeck}:{" "}
          </ClickableText>
          <Text size="middle" color="yellow">
            {activatedPrograms.length}/{item?.cyberdeck?.length}
          </Text>
          {activatedPrograms.length > 0 && (
            <FontAwesomeIcon
              icon={faStopCircle}
              title={langHud[sessionData.lang!!].deactivate_programs}
              onClick={deactivatePrograms}
            />
          )}
        </Flex>
      </Flex>
      {item && item.shared && (
        <FontAwesomeIcon
          icon={faEarth}
          style={{ alignSelf: "start" }}
          title={langHud[sessionData.lang!!].shared_character}
          color={themeColors.blue}
        />
      )}
    </ContentItem>
  );
};
