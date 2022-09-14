import { faNetworkWired, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { NodeType } from "~/data";

export const NodeCard = ({ data }: { data: NodeType }) => {
  const [items, setItems] = useLocalStorageState<NodeType[]>("Cyber_NODEGEN", {
    defaultValue: [] as NodeType[],
  });

  const delItem = () => {
    setItems(items.filter((it) => it.name != data.name));
  };

  return (
    <Card
      title={data.name}
      titlecolor="yellow"
      subtitle={data.ntype}
      onDelete={delItem}
      height={220}
    >
      <CardRow>
        <Text color="yellow" css={{ marginRight: 15 }}>
          OCHR:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.hp}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          INT:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.inf}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          LOD:
        </Text>
        <Text>{data.ice}</Text>
        {data.black && (
          <FontAwesomeIcon
            icon={faSkull}
            title="Czarny LOD"
            style={{ marginTop: -3 }}
          />
        )}
      </CardRow>
      {(data.more || data.security) && (
        <CardRow>
          <Text size="middle" color="pink">
            {[data.more, data.security].filter((it) => it != "").join("; ")}
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
