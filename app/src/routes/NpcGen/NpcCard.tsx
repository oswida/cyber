import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAtomValue } from "jotai";
import { globalStr, language, NpcType } from "~/common";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { useNpcGen } from "./useNpcGen";

type NpcCardProps = {
  data: NpcType;
  size?: "standard" | "small";
};

export const NpcCard = ({ data, size }: NpcCardProps) => {
  const lang = useAtomValue(language);
  const { deleteNpc } = useNpcGen();

  return (
    <Card
      title={`${data.name} ${data.surname}`}
      subtitle={data.occupation}
      onDelete={() => deleteNpc(data.id)}
      size={size}
    >
      <CardRow>
        <Text size="middle" css={{ maxWidth: 350, marginBottom: 10 }}>
          {data.look}
        </Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          {globalStr[lang]["traits"]}
        </Text>
        <Text color="pink" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.traits.join(", ")}
        </Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          {globalStr[lang]["goal"]}
        </Text>
        <Text color="green" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.goal}
        </Text>
      </CardRow>
      <RTIconButton icon={faUser} />
    </Card>
  );
};
