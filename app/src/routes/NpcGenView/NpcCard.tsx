import { faUser } from "@fortawesome/free-solid-svg-icons";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { NpcType } from "~/data";

export const NpcCard = ({ data }: { data: NpcType }) => {
  const [items, setItems] = useLocalStorageState<NpcType[]>("Cyber_NPCGEN", {
    defaultValue: [] as NpcType[],
  });

  const delItem = () => {
    setItems(
      items.filter((it) => it.name != data.name || it.surname != data.surname)
    );
  };

  return (
    <Card
      title={`${data.name} ${data.surname}`}
      subtitle={data.occupation}
      onDelete={delItem}
    >
      <CardRow>
        <Text css={{ maxWidth: 350, marginBottom: 10 }}>{data.look}</Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          Cechy{" "}
        </Text>
        <Text color="pink" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.traits.join(", ")}
        </Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          Cel{" "}
        </Text>
        <Text color="green" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.goal}
        </Text>
      </CardRow>
      <RTIconButton icon={faUser} />
    </Card>
  );
};
