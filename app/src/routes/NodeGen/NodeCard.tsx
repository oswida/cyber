import { faNetworkWired, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { useAtomValue } from "jotai";
import { language, NodeInfo } from "~/common";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { useNodeGen } from "./useNodeGen";

type NodeCardProps = {
  data: NodeInfo;
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
      height={size !== "small" ? 250 : undefined}
      id={data.id}
      size={size}
    >
      <CardRow css={{ flexWrap: "wrap" }}>
        <Text color="yellow" css={{ marginRight: 10 }}>
          {`${t`hp`.toUpperCase()}:`}
        </Text>
        <Text css={{ marginRight: 25 }}>{data.hp}</Text>
        <Text color="yellow" css={{ marginRight: 10 }}>
          INF:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.inf}</Text>
        <Text color="yellow" css={{ marginRight: 10 }}>
          {`${t`ice`.toUpperCase()}:`}
        </Text>
        <Text>{i18n._(data.ice.substring(1))}</Text>
        {data.black_ice && (
          <FontAwesomeIcon
            icon={faSkull}
            title={t`Black ICE`}
            style={{ marginTop: -3 }}
          />
        )}
      </CardRow>
      {data.activation && (
        <CardRow>
          <Text size="middle" color="pink">
            <Trans>Activation threshold</Trans>: {data.activation}
          </Text>
        </CardRow>
      )}
      <CardRow css={{ marginBottom: 5 }}>
        <Text>
          <Trans>shape</Trans>:
        </Text>
        <Text color="yellow" size="middle">
          {data.shape}
        </Text>
      </CardRow>
      <CardRow css={{ marginBottom: 5 }}>
        <Text>
          <Trans>color</Trans>:
        </Text>
        <Text color="yellow" size="middle">
          {data.color}
        </Text>
      </CardRow>
      <CardRow css={{ marginBottom: 5 }}>
        <Text>
          <Trans>detail</Trans>:
        </Text>
        <Text color="yellow" size="middle">
          {data.detail}
        </Text>
      </CardRow>

      <CardRow>
        <Text color="green" size="middle">
          {data.data}
        </Text>
      </CardRow>
      <RTIconButton icon={faNetworkWired} />
    </Card>
  );
};
