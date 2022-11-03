import { faDeleteLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  doExport,
  doImport,
  langHud,
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
  overflowY: "auto",
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
  borderRadius: 5,
  width: "calc(100% - 20px)",
  alignItems: "center",
  padding: "5px",
  paddingRight: "10px",
  paddingLeft: "10px",
  backgroundColor: "$background",
  variants: {
    selected: {
      true: {
        backgroundColor: "$background200",
      },
    },
  },
});

const Preview = styled("div", {
  overflow: "auto",
  height: 200,
  width: "calc(90% - 10px)",
  padding: 5,
  borderRadius: 10,
  border: "1px solid #0fff50aa",
  backgroundColor: "$background100a70",
  // boxShadow: `-2px -2px 4px 2px #0fff50aa`,
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
    const note: Note = {
      id: uuidv4(),
      title: "<new note>",
      content: "",
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
    setSelNote(note.id);
    setNo({ open: true, note: note });
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
          <Button
            border="underline"
            onClick={add}
            title={langHud[sessionData.lang!!].add}
            css={{ marginRight: 20 }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {/* {langHud[sessionData.lang!!].add} */}
          </Button>
          <Text color="yellow" size="small">
            {langHud[sessionData.lang!!].search}:
          </Text>
          <Input
            border="down"
            css={{ width: "100%" }}
            ref={searchRef}
            onChange={onSearch}
          />
          <Icon color="blue" icon={faDeleteLeft} onClick={clear} />
          <Button border="underline" noupper size="small" onClick={exportNotes}>
            {langHud[sessionData.lang!!].export}
          </Button>
          <Button border="underline" noupper size="small" onClick={importNotes}>
            Import
          </Button>
        </Flex>
        <ListRoot>
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
                    <Flex
                      css={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Text>{boardState[k]?.title}</Text>
                      <Text size="small" css={{ alignSelf: "center" }}>
                        {boardState[k]?.author}
                      </Text>
                    </Flex>
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
        </ListRoot>

        <Preview>
          <Text>
            <>
              {isBoard && selNote !== "" && (
                <Textarea
                  contentEditable={false}
                  border="none"
                  css={{
                    flex: 1,
                    whiteSpace: "pre-wrap",
                    backgroundColor: "transparent",
                  }}
                >
                  {boardState[selNote]?.content}
                </Textarea>
              )}
              {!isBoard && selNote !== "" && (
                <Textarea
                  contentEditable={false}
                  border="none"
                  css={{
                    flex: 1,
                    whiteSpace: "pre-wrap",
                    backgroundColor: "transparent",
                  }}
                >
                  {notesState[selNote]?.content}
                </Textarea>
              )}
            </>
          </Text>
        </Preview>
      </HudPane>
      <InfoModal isBoard={isBoard} />
    </>
  );
};
