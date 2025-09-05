import axios from "axios";
import type { Note } from "../types/note";
import type { NewNote } from "../types/newNote";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface GetTasksResponse {
    notes: Note[],
    totalPages: number,
}

interface fetchNoteProps {
    query: string,
    page: number,
}

const config: { headers: { Authorization: string } } = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

export const fetchNotes = async ({query, page}: fetchNoteProps): Promise<GetTasksResponse> => {

    const response = await axios.get<GetTasksResponse>("https://notehub-public.goit.study/api/notes",
        {
            ...config,
            params: {
                search: query,
                page,
                perPage: 10,
            }
        }
    );
    return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", newNote, config);
    return response.data;
};

export const deleteNote = async (taskId: string): Promise<Note> => {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${taskId}`, config);
    return response.data;
};
 