import { faNetworkWired, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import useLocalStorageState from "use-local-storage-state";
import { globalStr, language } from "~/common";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { NodeType } from "~/data";

export const NodeCard = ({ data, id }: { data: NodeType; id: string }) => {
  const lang = useAtomValue(language);
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
      id={id}
    >
      <CardRow>
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
