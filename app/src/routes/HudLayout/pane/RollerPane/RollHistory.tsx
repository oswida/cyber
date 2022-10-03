import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { RollHistoryEntry, stateRollHistory } from "~/common";
import { Flex, Text } from "~/component";
import { RollHistoryRoot } from "./styles";

const RollHistoryItem = ({ entry }: { entry: RollHistoryEntry }) => {
  return (
    <Flex title={`${entry.time} ${entry.comment}`}>
      <Text color="yellow">{entry.user}</Text>
      <Text>{entry.data}</Text>
    </Flex>
  );
};

export const RollHistory = () => {
  const [rollHistory] = useAtom(stateRollHistory);
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollToBottom();
  }, [rollHistory]);

  return (
    <RollHistoryRoot id="roll-history">
      <Scrollbars ref={ref as any}>
        {rollHistory.map((h) => (
          <RollHistoryItem key={h.id} entry={h} />
        ))}
      </Scrollbars>
    </RollHistoryRoot>
  );
};
