import { faNetworkWired, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import { globalStr, language, NodeType } from "~/common";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { useNodeGen } from "./useNodeGen";

type NodeCardProps = {
  data: NodeType;
  size?: "standard" | "small";
};

export const NodeCard = ({ data, size }: NodeCardProps) => {
  const lang = useAtomValue(language);
  const { deleteNode } = useNodeGen();

  return (
    <Card
      title={data.name}
      titlecolor="yellow"
      subtitle={data.node_class}
      onDelete={() => deleteNode(data.id)}
      height={size !== "small" ? 220 : undefined}
      id={data.id}
      size={size}
    >
      <CardRow css={{ flexWrap: "wrap" }}>
        <Text color="yellow" css={{ marginRight: 15 }}>
          {`${globalStr[lang]["hp"].toUpperCase()}:`}
        </Text>
        <Text css={{ marginRight: 25 }}>{data.hp}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          INF:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.inf}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          {`${globalStr[lang]["ice"].toUpperCase()}:`}
        </Text>
        <Text>{data.ice}</Text>
        {data.black_ice && (
          <FontAwesomeIcon
            icon={faSkull}
            title="Czarny LOD"
            style={{ marginTop: -3 }}
          />
        )}
      </CardRow>
      {(data.more_security || data.security) && (
        <CardRow>
          <Text size="middle" color="pink">
            {[data.more_security, data.security]
              .filter((it) => it != "")
              .join("; ")}
          </Text>
        </CardRow>
      )}
      <CardRow>
        <Text color="yellow">{data.look}</Text>
      </CardRow>

      <CardRow>
        <Text color="green">{data.data}</Text>
      </CardRow>
      <RTIconButton icon={faNetworkWired} />
    </Card>
  );
};
