import { faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import {
  stateBoardNotes,
  stateNoteInfo,
  statePrivateNotes,
  stateSelNote,
  styled,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Flex, Modal, Text } from "~/component";

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

export const InfoModal = ({ isBoard }: { isBoard: boolean }) => {
  const [no, setNo] = useAtom(stateNoteInfo);
  const [boardState, setBoardState] = useAtom(stateBoardNotes);
  const [notesState, setNotesState] = useAtom(statePrivateNotes);
  const [selNote, setSelNote] = useAtom(stateSelNote);

  const deleteNote = () => {
    if (no.note == null) return;
    if (isBoard) {
      const newState = { ...boardState };
      newState[no.note.title] = undefined;
      setBoardState(newState);
    } else {
      const newState = { ...notesState };
      newState[no.note.title] = undefined;
      setNotesState(newState);
    }
    setNo({ open: false, note: undefined });
    setSelNote("");
  };

  const shareNote = () => {
    if (!isBoard) return;
    //TODO:
  };

  return (
    <Modal
      isOpen={no.open}
      onClose={() => setNo({ open: false, note: undefined })}
    >
      <Flex direction="column">
        <Text>{no.note?.title}</Text>
        <Text css={{ whiteSpace: "pre-wrap" }}>{no.note?.content}</Text>
        <DeleteButton title="Delete note" onClick={deleteNote}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteButton>
        {isBoard && (
          <ShareButton title="Share note" onClick={shareNote}>
            <FontAwesomeIcon icon={faShare} />
          </ShareButton>
        )}
      </Flex>
    </Modal>
  );
};
