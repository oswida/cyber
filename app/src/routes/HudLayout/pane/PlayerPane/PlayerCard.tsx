import { useAtomValue } from "jotai";
import { PcInfo, statePlayers } from "~/common";
import { ContentItem } from "./styles";
import { Text, Flex } from "~/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth } from "@fortawesome/free-solid-svg-icons";

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
  const players = useAtomValue(statePlayers);
  const item: PcInfo | undefined = players[playerId];

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

  return (
    <ContentItem
      selected={selected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      css={{ justifyContent: "space-between" }}
    >
      <Flex direction="column">
        <Text title={tooltip()}>{item?.name}</Text>
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
        </Flex>
        <Flex css={{ gap: 10 }}>
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
          <Text size="middle">Items: {item?.inventory?.length}</Text>
          <Text size="middle" title={cmTooltip()}>
            Cybermods: {item?.cybermods?.length}
          </Text>
          <Text size="middle">Cyberdeck: {item?.cyberdeck?.length}</Text>
        </Flex>
      </Flex>
      {item && item.shared && (
        <FontAwesomeIcon icon={faEarth} style={{ alignSelf: "center" }} />
      )}
    </ContentItem>
  );
};
