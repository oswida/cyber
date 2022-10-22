import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { compare } from "nats.ws/lib/nats-base-client/semver";
import { useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {
  compareStringTime,
  RollHistoryEntry,
  stateRollHistory,
} from "~/common";
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
        {Object.values(rollHistory)
          .sort((a, b) => {
            return compareStringTime(b.time, a.time);
          })
          .map((k) => (
            <RollHistoryItem key={k.id} entry={k} />
          ))}
      </Scrollbars>
    </RollHistoryRoot>
  );
};
