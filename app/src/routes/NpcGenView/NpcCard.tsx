import { styled } from "@stitches/react";
import { Text, Flex, Button } from "~/component";
import { NpcType } from "~/data";
import { CardBkgImage } from "./CardBkg";
import useLocalStorageState from "use-local-storage-state";

const NpcCardRoot = styled("div", {
  padding: 20,
  position: "relative",
  // paddingRight: 25,
  display: "flex",
  flexDirection: "column",
  backgroundImage: `url(data:image/svg+xml;base64,${btoa(
    CardBkgImage("#f2f230", 2)
  )})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  backgroundOrigin: "border-box",
  minHeight: 190,
  "print-color-adjust": "economy",
});

const NpcCardName = styled(Text, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  width: "100%",
  paddingTop: 10,
  textTransform: "uppercase",
});

const NpcRow = styled(Flex, {
  marginLeft: 10,
  marginRight: 10,
  alignItems: "center",
  gap: 5,
});

const DelButton = styled("div", {
  "&:hover": {
    color: "#0fff50",
    cursor: "pointer",
  },
  position: "absolute",
  top: 5,
  left: 10,
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
      </NpcRow>
    </NpcCardRoot>
  );
};
