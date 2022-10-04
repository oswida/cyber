import Scrollbars from "react-custom-scrollbars-2";
import { styled } from "~/common";
import { Button, Flex, Input, Text, Textarea } from "~/component";
import { HudPane } from "../../styles";

export const ListRoot = styled("div", {
  border: "1px solid $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 300,
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
});

type NotesPaneProps = {
  isBoard: boolean;
};

export const NotesPane = ({ isBoard }: NotesPaneProps) => {
  return (
    <HudPane css={{ flexDirection: "column", gap: 10 }}>
      <Flex css={{ alignItems: "center", width: "90%", marginTop: 10 }}>
        {" "}
        <Text color="blue">Search:</Text>{" "}
        <Input border="down" css={{ width: "100%" }}></Input>{" "}
      </Flex>
      <ListRoot></ListRoot>
      <Flex css={{ width: "90%", gap: 10, marginBottom: 20 }}>
        <Flex direction="column" css={{ width: "100%", gap: 10 }}>
          <Flex css={{ alignItems: "center", width: "100%" }}>
            {" "}
            <Text color="yellow">Title:</Text>{" "}
            <Input border="down" css={{ width: "100%" }}></Input>{" "}
            <Button>Add</Button>
          </Flex>
          <Flex css={{ width: "100%" }} direction="column">
            <Text color="yellow">Content:</Text>
            <Scrollbars>
              <Textarea
                small
                border="full"
                resize="vertical"
                css={{ width: "100%" }}
              />
            </Scrollbars>
          </Flex>
        </Flex>
      </Flex>
    </HudPane>
  );
};
