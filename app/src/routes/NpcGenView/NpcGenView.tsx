import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import useLocalStorageState from "use-local-storage-state";
import { Button, Flex, Text } from "~/component";
import {
  npcGoal,
  npcLook,
  npcNameTable,
  npcOccupation,
  npcSurnameTable,
  npcTrait,
  NpcType,
} from "~/data";
import { NpcCard } from "./NpcCard";
import { NpcBoard } from "./styles";

const data1: NpcType[] = [
  {
    name: "Siti",
    goal: "Wykonać jeszcze jedną robotę przed odejściem na emeryturę",
    look: "Duża, skołtuniona czupryna",
    occupation: "Technik telekomunikacyjny",
    surname: "N'mambe",
    traits: ["Uczciwość", "Chamstwo"],
  },
];

const hasString = (arr: string[], item: string) => {
  const res = arr.filter((it) => it == item);
  return res && res.length > 0;
};

const rollNpc = () => {
  let roll = new DiceRoll(`1d${npcNameTable.length}`);
  const name = npcNameTable[roll.total - 1];
  roll = new DiceRoll(`1d${npcSurnameTable.length}`);
  const surname = npcSurnameTable[roll.total - 1];
  roll = new DiceRoll(`1d${npcGoal.length}`);
  const goal = npcGoal[roll.total - 1];
  roll = new DiceRoll(`1d${npcOccupation.length}`);
  const occ = npcOccupation[roll.total - 1];
  const looks = [];
  while (looks.length < 2) {
    roll = new DiceRoll(`1d${npcLook.length}`);
    const l = npcLook[roll.total - 1];
    if (!hasString(looks, l)) looks.push(l);
  }
  const traits = [];
  while (traits.length < 2) {
    roll = new DiceRoll(`1d${npcTrait.length}`);
    const t = npcTrait[roll.total - 1];
    if (!hasString(traits, t)) traits.push(t);
  }
  const result: NpcType[] = [];
  result.push({
    name: name,
    surname: surname,
    goal: goal,
    look: looks.join(", "),
    occupation: occ,
    traits: traits,
  } as NpcType);
  return result;
};

export const NpcGenView = () => {
  const [data, setData] = useLocalStorageState<NpcType[]>("Cyber_NPCGEN", {
    defaultValue: [] as NpcType[],
  });

  const generate = () => {
    setData((state) => [...state, ...rollNpc()]);
  };

  const clean = () => {
    setData([]);
  };

  return (
    <Flex
      direction="column"
      center
      css={{
        backgroundColor: "#27262b",
        position: "relative",
        top: "2rem",
        width: "100%",
        maxWidth: "100vw",
        minHeight: "stretch",
      }}
    >
      <Flex
        css={{
          justifyContent: "space-between",
          gap: 10,
          width: "100%",
          maxWidth: "100vw",
          paddingLeft: 10,
          paddingRight: 10,
          position: "absolute",
          top: 0,
        }}
      >
        <Text weight={"700"} css={{ marginLeft: 10 }}>
          Bohaterowie niezależni
        </Text>
        <Flex css={{ gap: 10, marginRight: 10 }}>
          <Button onClick={generate}>Generuj</Button>
          <Button onClick={clean}>Wyczyść</Button>
        </Flex>
      </Flex>
      <NpcBoard>
        {data.map((it) => (
          <NpcCard data={it} key={it.name}></NpcCard>
        ))}
      </NpcBoard>
    </Flex>
  );
};
