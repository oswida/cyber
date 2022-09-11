import { styled } from "@stitches/react";
import useLocalStorageState from "use-local-storage-state";
import { DelButton, Flex, Text } from "~/component";
import { CardBkgImage } from "./CardBkg";

const CorpoCardRoot = styled("div", {
  padding: 20,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundImage: `url(data:image/svg+xml;base64,${btoa(
    CardBkgImage("#e949f5", 2)
  )})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  backgroundOrigin: "border-box",
  minHeight: 190,
  minWidth: 190,
  "print-color-adjust": "economy",
});

const CorpoCardName = styled(Text, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  maxWidth: 350,
  paddingLeft: 20,
  paddingTop: 30,
  flexWrap: "wrap",
  textTransform: "uppercase",
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
      <DelButton onClick={delItem}>X</DelButton>
      <CorpoCardName weight={700} color="blue">
        {data.name1} {data.name2} {data.name3}
      </CorpoCardName>
      {data.domains && (
        <CorpoRow direction="column">
          <Text size="small" color="yellow">
            Działalność{" "}
          </Text>
          <Text css={{ maxWidth: 250, lineHeight: "1rem" }}>
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
