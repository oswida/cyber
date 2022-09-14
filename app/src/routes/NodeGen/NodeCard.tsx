import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
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
    >
      <CardRow>
        <Text color="yellow" css={{ marginRight: 15 }}>
          OCHR:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.ochr}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          INT:
        </Text>
        <Text css={{ marginRight: 25 }}>{data.int}</Text>
        <Text color="yellow" css={{ marginRight: 15 }}>
          LOD:
        </Text>
        <Text>{data.lod}</Text>
      </CardRow>
      {(data.more || data.personel) && (
        <CardRow>
          <Text size="small" color="pink">
            {[data.more, data.personel].filter((it) => it != "").join("; ")}
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
