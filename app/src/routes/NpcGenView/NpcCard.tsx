import { styled } from "@stitches/react";
import useLocalStorageState from "use-local-storage-state";
import { DelButton, Flex, Text } from "~/component";
import { NpcType } from "~/data";

const NpcCardRoot = styled("div", {
  padding: 20,
  position: "relative",
  display: "flex",
  flexDirection: "column",

  maxWidth: 350,
  borderBottom: "solid 1px #f2f230",
  borderRight: "solid 1px #f2f230",
  borderRadius: "20px 0px",
  outlineOffset: 2,
  outline: "solid 1px #0fff50",
  marginTop: 3,
});

const NpcCardName = styled(Text, {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  paddingBottom: 5,
  paddingLeft: 10,
  marginBottom: 5,
  maxWidth: 350,
  textTransform: "uppercase",
});

const NpcRow = styled(Flex, {
  marginLeft: 10,
  marginRight: 10,
  alignItems: "center",
  gap: 5,
});

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
    <NpcCardRoot>
      <DelButton onClick={delItem}>X</DelButton>
      <NpcCardName weight={700} color="blue">
        {data.name} {data.surname}
      </NpcCardName>
      <NpcRow>
        <Text color="pink">{data.occupation}</Text>
      </NpcRow>
      <NpcRow>
        <Text css={{ maxWidth: 350, lineHeight: "1rem" }}>{data.look}</Text>
      </NpcRow>
      <NpcRow>
        <Text size="small" color="yellow">
          Cechy{" "}
        </Text>
        <Text color="pink" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.traits.join(", ")}
        </Text>
      </NpcRow>
      <NpcRow>
        <Text size="small" color="yellow">
          Cel{" "}
        </Text>
        <Text color="green" css={{ maxWidth: 350, lineHeight: "1rem" }}>
          {data.goal}
        </Text>
      </NpcRow>
    </NpcCardRoot>
  );
};
