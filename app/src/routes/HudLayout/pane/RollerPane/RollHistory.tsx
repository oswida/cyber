import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
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

  return (
    <RollHistoryRoot id="roll-history">
      {rollHistory.map((e) => (
        <RollHistoryItem key={e.id} entry={e} />
      ))}
    </RollHistoryRoot>
  );
};
