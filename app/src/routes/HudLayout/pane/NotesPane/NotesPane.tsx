import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { v4 as uuidv4 } from "uuid";
import {
  doExport,
  doImport,
  Note,
  prettyToday,
  stateBoardNotes,
  stateNats,
  stateNoteInfo,
  statePrivateNotes,
  stateSelNote,
  stateSessionData,
  styled,
  topicBoard,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Icon, Input, Text, Textarea } from "~/component";
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

const ContentItem = styled(Flex, {
  borderRadius: 2,
  padding: 3,
  marginRight: 10,
  backgroundColor: "$background",
  variants: {
    selected: {
      true: {
        backgroundColor: "$background200",
      },
    },
  },
});

type NotesPaneProps = {
  isBoard: boolean;
};

export const NotesPane = ({ isBoard }: NotesPaneProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [boardState, setBoardState] = useAtom(stateBoardNotes);
  const [notesState, setNotesState] = useAtom(statePrivateNotes);
  const sessionData = useAtomValue(stateSessionData);
  const { saveBoardNotes, savePrivateNotes } = useStorage();
  const [selNote, setSelNote] = useAtom(stateSelNote);
  const [no, setNo] = useAtom(stateNoteInfo);
  const [filter, setFilter] = useState("");
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);

  const add = () => {
    if (
      !titleRef.current ||
      !contentRef.current ||
      titleRef.current.value == ""
    )
      return;
    const note: Note = {
      id: uuidv4(),
      title: titleRef.current.value,
      content: contentRef.current.innerText,
      author: sessionData.username,
    };

    if (isBoard) {
      const newState = { ...boardState };
      newState[note.id] = note;
      setBoardState(newState);
      saveBoardNotes(newState);
      publish(nats.connection, topicBoard, [note]);
    } else {
      const newState = { ...notesState };
      newState[note.id] = note;
      setNotesState(newState);
      savePrivateNotes(newState);
    }
    titleRef.current.value = "";
    contentRef.current.innerHTML = "";
  };

  const onSearch = (val: any) => {
    if (!searchRef.current) return;
    setFilter(searchRef.current.value);
  };

  const notFiltered = (note: Note | undefined) => {
    if (!note) return false;
    if (filter === "") return true;
    return note.title.includes(filter) || note.content.includes(filter);
  };

  const clear = () => {
    if (!searchRef.current) return;
    searchRef.current.value = "";
    setFilter("");
    searchRef.current.focus();
  };

  const exportNotes = () => {
    if (isBoard) {
      const filename = `board-${prettyToday()}.json`;
      doExport(boardState, filename);
    } else {
      const filename = `private-notes-${prettyToday()}.json`;
      doExport(notesState, filename);
    }
  };

  const importNotes = () => {
    if (isBoard) {
      doImport((data: any) => {
        setBoardState(data);
      });
    } else {
      doImport((data: any) => {
        setNotesState(data);
      });
    }
  };

  return (
    <>
      <HudPane>
        <Flex css={{ alignItems: "center", width: "90%", margin: 10 }}>
          <Text color="yellow" size="small">
            Search:
          </Text>
          <Input
            border="down"
            css={{ width: "100%" }}
            ref={searchRef}
            onChange={onSearch}
          />
          <Icon color="blue" icon={faDeleteLeft} onClick={clear} />
          <Button border="underline" noupper size="small" onClick={exportNotes}>
            Export
          </Button>
          <Button border="underline" noupper size="small" onClick={importNotes}>
            Import
          </Button>
        </Flex>
        <ListRoot>
          <Scrollbars>
            <>
              {isBoard &&
                Object.keys(boardState)
                  .filter((k) => notFiltered(boardState[k]))
                  .map((k) => (
                    <ContentItem
                      key={k}
                      onClick={() => setSelNote(k)}
                      onDoubleClick={() =>
                        setNo({ open: true, note: boardState[k] })
                      }
                      selected={selNote === k}
                    >
                      <Text>{boardState[k]?.title}</Text>
                    </ContentItem>
                  ))}
              {!isBoard &&
                Object.keys(notesState)
                  .filter((k) => notFiltered(notesState[k]))
                  .map((k) => (
                    <ContentItem
                      key={k}
                      onClick={() => setSelNote(k)}
                      onDoubleClick={() =>
                        setNo({ open: true, note: notesState[k] })
                      }
                      selected={selNote === k}
                    >
                      <Text>{notesState[k]?.title}</Text>
                    </ContentItem>
                  ))}
            </>
          </Scrollbars>
        </ListRoot>
        <Flex css={{ width: "90%" }}>
          <Flex direction="column" css={{ width: "100%", gap: 10 }}>
            <Flex css={{ alignItems: "center", width: "100%" }}>
              <Text color="yellow" size="small">
                Title:
              </Text>
              <Input
                border="down"
                css={{ width: "100%" }}
                ref={titleRef as any}
              ></Input>
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
