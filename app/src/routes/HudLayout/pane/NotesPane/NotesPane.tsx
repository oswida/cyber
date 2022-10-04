import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {
  NoteType,
  stateBoardNotes,
  stateNoteInfo,
  statePrivateNotes,
  stateSelNote,
  stateSessionData,
  styled,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Input, Text, Textarea } from "~/component";
import { HudPane } from "../../styles";
import { InfoModal } from "./InfoModal";

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
  marginBottom: 10,
});

export const ContentRoot = styled("div", {
  background: "$background",
  outline: "none",
  border: "solid 1px $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 100,
});

type NotesPaneProps = {
  isBoard: boolean;
};

export const NotesPane = ({ isBoard }: NotesPaneProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLDivElement>();
  const [boardState, setBoardState] = useAtom(stateBoardNotes);
  const [notesState, setNotesState] = useAtom(statePrivateNotes);
  const sessionData = useAtomValue(stateSessionData);
  const { saveBoardNotes, savePrivateNotes } = useStorage();
  const [selNote, setSelNote] = useAtom(stateSelNote);
  const [no, setNo] = useAtom(stateNoteInfo);

  useEffect(() => {
    saveBoardNotes();
  }, [boardState]);

  useEffect(() => {
    savePrivateNotes();
  }, [notesState]);

  const add = () => {
    if (
      !titleRef.current ||
      !contentRef.current ||
      titleRef.current.value == ""
    )
      return;
    const note: NoteType = {
      title: titleRef.current.value,
      content: contentRef.current.innerText,
      author: sessionData.username,
    };

    if (isBoard) {
      const newState = { ...boardState };
      newState[note.title] = note;
      setBoardState(newState);
      //TODO: send note to others
    } else {
      const newState = { ...notesState };
      newState[note.title] = note;
      setNotesState(newState);
    }
    titleRef.current.value = "";
    contentRef.current.innerHTML = "";
  };

  return (
    <>
      {" "}
      <HudPane>
        <Flex css={{ alignItems: "center", width: "90%", margin: 10 }}>
          <Text color="yellow" size="small">
            Search:
          </Text>{" "}
          <Input border="down" css={{ width: "100%" }}></Input>{" "}
        </Flex>
        <ListRoot>
          <Scrollbars>
            {isBoard &&
              Object.keys(boardState).map((k) => (
                <Flex
                  key={k}
                  onClick={() => setSelNote(k)}
                  onDoubleClick={() =>
                    setNo({ open: true, note: boardState[k] })
                  }
                  css={{
                    padding: 2,
                    marginRight: 10,
                    backgroundColor:
                      selNote === k ? "$background200" : "$background",
                  }}
                >
                  <Text>{boardState[k]?.title}</Text>
                </Flex>
              ))}
          </Scrollbars>
        </ListRoot>
        <Flex css={{ width: "90%" }}>
          <Flex direction="column" css={{ width: "100%", gap: 10 }}>
            <Flex css={{ alignItems: "center", width: "100%" }}>
              {" "}
              <Text color="yellow" size="small">
                Title:
              </Text>{" "}
              <Input
                border="down"
                css={{ width: "100%" }}
                ref={titleRef as any}
              ></Input>{" "}
              <Button onClick={add}>Add</Button>
            </Flex>
            <Flex css={{ width: "100%" }} direction="column">
              <Text color="yellow" size="small">
                Content:
              </Text>
              <ContentRoot>
                <Scrollbars>
                  <Textarea
                    ref={contentRef as any}
                    small
                    contentEditable={true}
                    border="none"
                    css={{ minHeight: 100 }}
                  />
                </Scrollbars>
              </ContentRoot>
            </Flex>
          </Flex>
        </Flex>
      </HudPane>
      <InfoModal isBoard={isBoard} />
    </>
  );
};
