import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// Динамічне отримання заголовків з токеном
function getOptions() {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
}

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> {
  const perPage = 12;

  const res = await axios.get<FetchNotesProps>("notes", {
    ...getOptions(),
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
  });

  return res.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await axios.post<Note>("notes", newNote, getOptions());
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(`notes/${id}`, getOptions());
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axios.get<Note>(`notes/${id}`, getOptions());
  return res.data;
}
