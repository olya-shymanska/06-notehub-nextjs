import type { NoteTag } from "./note";

export interface NewNote {
    title: string,
    content: string,
    tag: NoteTag,
}