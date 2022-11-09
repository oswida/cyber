import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { Trans } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import {
  CorpoInfo,
  genTitles,
  language,
  stateGenerator,
  toCorpoInfo,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Card, CardRow, RTIconButton, Text } from "~/component";

type CorpoCardProps = {
  data: CorpoInfo | undefined;
  size?: "standard" | "small";
};

export const CorpoCard = ({ data, size }: CorpoCardProps) => {
  const lang = useAtomValue(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();

  const delItem = useCallback(() => {
    if (!data) return;
    const newList: Record<string, CorpoInfo> = {};
    Object.keys(gen.corpo).forEach((k) => {
      if (k !== data.id && gen.corpo[k] !== undefined)
        newList[k] = toCorpoInfo(gen.corpo[k]);
    });
    const newState = { ...gen, corpo: newList };
    setGen(newState);
    saveGen(newState);
  }, [gen]);

  return (
    <Card
      color="pink"
      title={data ? data.name : ""}
      titlecolor="blue"
      onDelete={delItem}
      height={size !== "small" ? 250 : undefined}
      size={size}
    >
      {data?.operations && (
        <>
          <CardRow direction="column" css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              <Trans>Operations</Trans>
            </Text>
            <Text css={{ maxWidth: 350 }} size="middle">
              {data?.operations.join(", ")}
            </Text>
          </CardRow>
        </>
      )}
      {data?.gossip && (
        <>
          <CardRow direction="column" css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              <Trans>Gossip</Trans>
            </Text>
            <Text
              color="pink"
              size="middle"
              css={{ maxWidth: 350, lineHeight: "1rem", overflow: "hidden" }}
            >
              {data?.gossip}
            </Text>
          </CardRow>
        </>
      )}
      {data?.resources && (
        <>
          <CardRow direction="column" css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              <Trans>Resources</Trans>{" "}
            </Text>

            <Text
              color="green"
              size="middle"
              css={{ maxWidth: 350, lineHeight: "1rem", overflow: "hidden" }}
            >
              {data?.resources.join(",")}
            </Text>
          </CardRow>
        </>
      )}
      {data?.employeeProfile && (
        <>
          <CardRow direction="column" css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              <Trans>Employee Profile</Trans>{" "}
            </Text>

            <Text
              color="white"
              size="middle"
              css={{ maxWidth: 350, lineHeight: "1rem", overflow: "hidden" }}
            >
              {data?.employeeProfile}
            </Text>
          </CardRow>
        </>
      )}
      <RTIconButton icon={faEarth} />
    </Card>
  );
};
