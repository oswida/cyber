import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Trans } from "@lingui/macro";
import { useAtomValue } from "jotai";
import { language, NpcInfo } from "~/common";
import { Card, CardRow, RTIconButton, Text } from "~/component";
import { useNpcGen } from "./useNpcGen";

type NpcCardProps = {
  data: NpcInfo;
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
          {data.look}. {data.gear}.
        </Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          <Trans>Traits</Trans>
        </Text>
        <Text color="pink" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.traits.join(", ")}
        </Text>
      </CardRow>
      <CardRow>
        <Text size="small" color="yellow">
          <Trans>Goal</Trans>
        </Text>
        <Text color="green" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.goal}
        </Text>
      </CardRow>
      <RTIconButton icon={faUser} />
    </Card>
  );
};
