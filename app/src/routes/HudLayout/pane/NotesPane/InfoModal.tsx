import { faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {
  stateBoardNotes,
  stateNats,
  stateNoteInfo,
  statePrivateNotes,
  stateSelNote,
  styled,
  topicBoard,
  topicBoardDelete,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Input, Modal, Text, Textarea } from "~/component";

const DeleteButton = styled("div", {
  height: 25 * 0.8,
  width: 25,
  color: "red",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  userSelect: "none",
  position: "fixed",
  bottom: 10,
  right: 10,
});

const ShareButton = styled(DeleteButton, {
  bottom: 100,
  right: 10,
  color: "$green",
});

export const ContentRoot = styled("div", {
  background: "$background",
  outline: "none",
  border: "solid 1px $darkblue",
  borderRadius: 5,
  padding: 5,
  height: "60vh",
  minWidth: 550,
  width: "75vw",
  display: "flex",
});

export const InfoModal = ({ isBoard }: { isBoard: boolean }) => {
  const [no, setNo] = useAtom(stateNoteInfo);
  const [boardState, setBoardState] = useAtom(stateBoardNotes);
  const [notesState, setNotesState] = useAtom(statePrivateNotes);
  const [selNote, setSelNote] = useAtom(stateSelNote);
  const contentRef = useRef<HTMLDivElement>();
  const nameRef = useRef<HTMLInputElement>(null);
  const { publish } = useNats();
  const { saveBoardNotes, savePrivateNotes } = useStorage();
  const nats = useAtomValue(stateNats);

  const deleteNote = () => {
    if (no.note == null) return;
    if (isBoard) {
      const newState = { ...boardState };
      newState[no.note.id] = undefined;
      setBoardState(newState);
      saveBoardNotes(newState);
    } else {
      const newState = { ...notesState };
      newState[no.note.id] = undefined;
      setNotesState(newState);
      savePrivateNotes(newState);
    }
    publish(nats.connection, topicBoardDelete, [no.note]);
    setNo({ open: false, note: undefined });
    setSelNote("");
  };

  const shareNote = () => {
    if (!isBoard) return;
    //TODO:
  };

  const updateNote = () => {
    if (!contentRef.current || !no.note || !nameRef.current) return;
    if (isBoard) {
      const newState = { ...boardState };
      newState[no.note.id]!!.content = contentRef.current.innerText;
      newState[no.note.id]!!.title = nameRef.current.value;
      setBoardState(newState);
      publish(nats.connection, topicBoard, [newState[no.note.id]]);
      saveBoardNotes(newState);
    } else {
      const newState = { ...notesState };
      newState[no.note.id]!!.content = contentRef.current.innerText;
      newState[no.note.id]!!.title = nameRef.current.value;
      setNotesState(newState);
      savePrivateNotes(newState);
    }
    setNo({ open: false, note: undefined });
  };

  useEffect(() => {
    if (!contentRef.current || !no.note || !nameRef.current) return;
    contentRef.current.innerHTML = no.note.content;
    nameRef.current.value = no.note.title;
  }, [no]);

  return (
    <Modal
      opacity="more"
      isOpen={no.open}
      onClose={() => setNo({ open: false, note: undefined })}
    >
      <Flex direction="column">
        <Text color="yellow" css={{ marginBottom: 10, textAlign: "center" }}>
          {no.note?.title}
        </Text>
        <Input
          ref={nameRef}
          border="down"
          css={{ borderRadius: 5, padding: 5, marginBottom: 10 }}
        />

        <ContentRoot>
          <Scrollbars>
            <Textarea
              ref={contentRef as any}
              small
              contentEditable={true}
              border="none"
              css={{ flex: 1, whiteSpace: "pre-wrap" }}
            />
          </Scrollbars>
        </ContentRoot>

        <DeleteButton title="Delete note" onClick={deleteNote}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteButton>
        {isBoard && (
          <ShareButton title="Share note" onClick={shareNote}>
            <FontAwesomeIcon icon={faShare} />
          </ShareButton>
        )}
      </Flex>
      <Button css={{ marginTop: 20 }} onClick={updateNote}>
        Update
      </Button>
    </Modal>
  );
};
