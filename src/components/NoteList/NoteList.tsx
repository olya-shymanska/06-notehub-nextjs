import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from "../../services/noteService";
import css from './NoteList.module.css'


interface NoteListProps {
    notes: Note[] | undefined;
}

export default function NoteList({ notes }: NoteListProps) {

    const queryClient = useQueryClient();
    
    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
    });


    return (
        <ul className={css.list}>
            {notes?.map((note) => (
                <li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
      <button className={css.button} onClick={() => {deleteTaskMutation.mutate(note.id)}} >Delete</button>
    </div>
                </li>
            ))}
        </ul>
    )
}