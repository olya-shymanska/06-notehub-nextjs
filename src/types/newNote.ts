import type { NoteTag } from "./NoteTag";

export interface NewNote {
    title: string,
    content: string,
    tag: NoteTag,
}