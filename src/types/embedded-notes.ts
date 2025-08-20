export interface EmbedNoteProps {
  slug: string;
  variant?: 'a' | 'b';
}

export interface EmbedNotesProps {
  tag: string;
  limit?: number;
}

export interface NoteData {
  title: string;
  content: string;
  tags?: string[];
  publishDate: string;
  slug: string;
}

export interface NotesData {
  note: {
    id: string;
    data: {
      title: string;
      tags?: string[];
      publishDate: Date;
      priority?: number;
    };
  };
  Content: any;
}

export type EmbedVariant = 'a' | 'b';