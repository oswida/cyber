import { faGears, faToolbox, faTools } from "@fortawesome/free-solid-svg-icons";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardRow, RTIconButton, Text } from "~/component";

export type CorpoType = {
  name1: string;
  name2: string;
  name3: string;
  domains: string[];
  slogan: string;
};

export const CorpoCard = ({ data }: { data: CorpoType }) => {
  const [items, setItems] = useLocalStorageState<CorpoType[]>(
    "Cyber_CORPOGEN",
    {
      defaultValue: [] as CorpoType[],
    }
  );

  const delItem = () => {
    setItems(
      items.filter(
        (it) =>
          it.name1 != data.name1 ||
          it.name2 != data.name2 ||
          it.name3 != data.name3
      )
    );
  };

  return (
    <Card
      color="pink"
      title={`${data.name1} ${data.name2} ${data.name3}`}
      titlecolor="blue"
      onDelete={delItem}
      height={150}
    >
      {data.domains && (
        <>
          <CardRow>
            <Text size="small" color="yellow">
              Działalność{" "}
            </Text>
          </CardRow>
          <CardRow>
            <Text css={{ maxWidth: 350 }}>{data.domains.join(", ")}</Text>
          </CardRow>
        </>
      )}
      {data.slogan && (
        <>
          <CardRow>
            <Text size="small" color="yellow">
              Slogan{" "}
            </Text>
          </CardRow>
          <CardRow>
            <Text css={{ maxWidth: 250, lineHeight: "1rem" }}>
              {data.slogan}
            </Text>
          </CardRow>
        </>
      )}
      <RTIconButton icon={faTools} />
    </Card>
  );
};
