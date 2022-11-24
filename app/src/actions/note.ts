import { NoteInfo } from "./../common/types";
import { v4 as uuidv4 } from "uuid";

export const createNote = (apd: any) => {
  const sd = apd.sessionData();
  const result: NoteInfo = {
    id: uuidv4(),
    title: "new note",
    content: "",
    author: sd ? sd.username : "???",
  };
  return result;
};

export const deleteNote = (apd: any, item: NoteInfo) => {
  const newState: Record<string, NoteInfo> = {};
  Object.values(apd.noteData()).forEach((it: any) => {
    if (it.id !== item.id) {
      newState[it.id] = it;
    }
  });
  apd.setNoteData(newState);
  return newState;
};

export const deleteBoard = (apd: any, item: NoteInfo) => {
  const newState: Record<string, NoteInfo> = {};
  Object.values(apd.boardData()).forEach((it: any) => {
    if (it.id !== item.id) {
      newState[it.id] = it;
    }
  });
  apd.setBoardData(newState);
  return newState;
};
