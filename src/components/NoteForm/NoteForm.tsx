import { Formik, Form, Field, type FormikHelpers, ErrorMessage} from "formik";
import { useId } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from "../../services/noteService";
import type { NoteTag } from "../../types/NoteTag";
import * as Yup from "yup";
import css from './NoteForm.module.css'


interface FormValues {
title: string,
content: string,
tag: NoteTag, 
}

const initialValues: FormValues = {
title: "",
content: "",
tag: "Todo",
};

interface NoteFormProps {
    onClose: () => void;
}

const taskSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    content: Yup.string()
    .max(500, "Too long!"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Note tag should be one of the provided options!")
        .required("Required"),
  });
  

export default function NoteForm({onClose}: NoteFormProps) {

    const queryClient = useQueryClient(); 

    const newTaskMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleSubmit = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
      
        newTaskMutation.mutate(values, {
          onSuccess: () => {
            actions.resetForm();
            onClose();
          },
        });
      };

    const fieldId = useId();
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={taskSchema}>
            <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field type="text" name="title" id={`${fieldId}-title`} className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error}/>
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field as="textarea" name="content" id={`${fieldId}-content`} rows={8} className={css.textarea} />
                    <ErrorMessage name="content" component="span" className={css.error}/>
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" name="tag" id={`${fieldId}-tag`} className={css.select}>
                    <option value="">Choose Tag</option>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error}/>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={onClose}>Cancel</button>
                <button type="submit" disabled={false} className={css.submitButton}>Create Note</button>
            </div>
                </Form>
            </Formik>
 )
}