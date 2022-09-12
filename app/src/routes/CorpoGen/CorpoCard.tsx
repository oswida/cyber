import { styled } from "@stitches/react";
import useLocalStorageState from "use-local-storage-state";
import { DelButton, Flex, Text } from "~/component";

const CorpoCardRoot = styled("div", {
  padding: 20,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minWidth: 190,
  maxWidth: 350,
  borderBottom: "solid 1px #f2f230",
  borderRight: "solid 1px #f2f230",
  borderRadius: "20px 0px",
  outlineOffset: 2,
  outline: "solid 1px #e949f5",
  marginTop: 3,
});

const CorpoCardName = styled(Text, {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  maxWidth: 350,
  flexWrap: "wrap",
  textTransform: "uppercase",
  borderBottom: "solid 1px #2c84fa",
  paddingBottom: 5,
  paddingLeft: 10,
  marginBottom: 5,
});

const CorpoRow = styled(Flex, {
  marginLeft: 10,
  marginRight: 10,
  gap: 1,
});

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
    <CorpoCardRoot>
      <DelButton onClick={delItem}>x</DelButton>
      <CorpoCardName weight={700} color="blue">
        {data.name1} {data.name2} {data.name3}
      </CorpoCardName>
      {data.domains && (
        <CorpoRow direction="column">
          <Text size="small" color="yellow">
            Działalność{" "}
          </Text>
          <Text css={{ maxWidth: 350, lineHeight: "1rem" }}>
            {data.domains.join(", ")}
          </Text>
        </CorpoRow>
      )}
      {data.slogan && (
        <CorpoRow direction="column">
          <Text size="small" color="yellow">
            Slogan{" "}
          </Text>
          <Text css={{ maxWidth: 250, lineHeight: "1rem" }}>{data.slogan}</Text>
        </CorpoRow>
      )}
      {/* <NpcRow>
        <Text color="pink">{data.occupation}</Text>
      </NpcRow>
      <NpcRow>
        <Text css={{ maxWidth: 250, lineHeight: "1rem" }} size="small">
          {data.look}
        </Text>
      </NpcRow>
      <NpcRow>
        <Text size="small" color="yellow">
          Cechy{" "}
        </Text>
        <Text color="pink" css={{ maxWidth: 250, lineHeight: "1rem" }}>
          {data.traits.join(", ")}
        </Text>
      </NpcRow>
      <NpcRow>
        <Text size="small" color="yellow">
          Cel{" "}
        </Text>
        <Text color="green" css={{ maxWidth: 250, lineHeight: "1rem" }}>
          {data.goal}
        </Text>
      </NpcRow> */}
    </CorpoCardRoot>
  );
};
