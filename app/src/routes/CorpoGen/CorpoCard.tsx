import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { CorpoType, genTitles, language, stateGenerator } from "~/common";
import { useStorage } from "~/common/storage";
import { Card, CardRow, RTIconButton, Text } from "~/component";

type CorpoCardProps = {
  data: CorpoType;
  size?: "standard" | "small";
};

export const CorpoCard = ({ data, size }: CorpoCardProps) => {
  const lang = useAtomValue(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();

  const delItem = useCallback(() => {
    const newList: Record<string, CorpoType> = {};
    Object.keys(gen.corpo).forEach((k) => {
      if (k !== data.id && gen.corpo[k]) newList[k] = gen.corpo[k]!!;
    });
    const newState = { ...gen, corpo: newList };
    setGen(newState);
    saveGen(newState);
  }, [gen]);

  return (
    <Card
      color="pink"
      title={data.name}
      titlecolor="blue"
      onDelete={delItem}
      height={size !== "small" ? 170 : undefined}
      size={size}
    >
      {data.operations && (
        <>
          <CardRow css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              {genTitles[lang]["operations"]}
            </Text>
            <Text css={{ maxWidth: 350 }} size="middle">
              {data.operations.join(", ")}
            </Text>
          </CardRow>
        </>
      )}
      {data.gossip && (
        <>
          <CardRow css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              {genTitles[lang]["gossip"]}
            </Text>
            <Text
              color="pink"
              size="middle"
              css={{ maxWidth: 250, lineHeight: "1rem", overflow: "hidden" }}
            >
              {data.gossip}
            </Text>
          </CardRow>
        </>
      )}
      {data.slogan && (
        <>
          <CardRow css={{ alignItems: "start" }}>
            <Text size="small" color="yellow">
              Slogan{" "}
            </Text>

            <Text
              color="green"
              size="middle"
              css={{ maxWidth: 250, lineHeight: "1rem", overflow: "hidden" }}
            >
              {data.slogan}
            </Text>
          </CardRow>
        </>
      )}
      <RTIconButton icon={faEarth} />
    </Card>
  );
};
