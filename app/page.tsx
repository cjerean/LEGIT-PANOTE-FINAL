"use client";

import * as React from "react";
import { Sidebar } from "@/components/sidebar";
import { Editor } from "@/components/editor";
import { AIChat } from "@/components/ai-chat";
import { SettingsDialog } from "@/components/settings-dialog";

interface Tag {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string; // We'll map created_at/updated_at to this
  pinned: boolean; // Mapped from is_pinned
  trashed?: boolean; // Mapped from is_deleted
  tag_id?: string;
}

export default function Home() {
  const [currentView, setCurrentView] = React.useState<"notes" | "ai" | "trash" | "settings">("notes");
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [availableTags, setAvailableTags] = React.useState<string[]>([]);

  const [tags, setTags] = React.useState<Tag[]>([]);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [trashNotes, setTrashNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch Data
  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [notesRes, tagsRes, trashRes] = await Promise.all([
        fetch('/api/notes'),
        fetch('/api/tags'),
        fetch('/api/trash')
      ]);

      if (notesRes.ok) {
        const data = await notesRes.json();
        setNotes(data.map((n: any) => ({
          id: n.id,
          title: n.title,
          content: n.content,
          date: new Date(n.updated_at).toLocaleDateString(),
          pinned: n.is_pinned,
          trashed: false,
          tag_id: n.tag_id
        })));
      }

      if (tagsRes.ok) {
        const data = await tagsRes.json();
        setTags(data);
      }

      if (trashRes.ok) {
        const data = await trashRes.json();
        setTrashNotes(data.map((n: any) => ({
          id: n.id,
          title: n.title,
          content: n.content,
          date: new Date(n.deleted_at).toLocaleDateString(),
          pinned: n.is_pinned,
          trashed: true,
          tag_id: n.tag_id
        })));
      }

<<<<<<< HEAD
Search

Quickly find notes using search. To search by tag, type “tag:” in the search bar followed by the name of your tag.

Baldy AI

Get help from Baldy AI, your personal assistant for note-taking and organization.`,
      date: new Date().toLocaleDateString(),
      pinned: true,
      trashed: false,
      tags: []
=======
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
>>>>>>> 0f88f51c0a24d4e4fde635813c99add7adbc7f91
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Initialize availableTags from existing notes
  React.useEffect(() => {
    const initialTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));
    if (availableTags.length === 0 && initialTags.length > 0) {
      setAvailableTags(initialTags);
    }
  }, []); // Run once on mount

  const handleNavigate = (view: "notes" | "ai" | "trash" | "settings") => {
    if (view === "settings") {
      setIsSettingsOpen(true);
    } else {
      setCurrentView(view);
      // If switching to notes/trash, maybe select the first one?
      setCurrentNoteId(null);
    }
  };

<<<<<<< HEAD
  // Tag Handlers
  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag || !currentNoteId) return;

    // Add to global available tags if not present
    if (!availableTags.includes(trimmedTag)) {
      setAvailableTags([...availableTags, trimmedTag]);
    }

    setNotes(notes.map(note => {
      if (note.id === currentNoteId) {
        if (!note.tags.includes(trimmedTag)) {
          return { ...note, tags: [...note.tags, trimmedTag] };
        }
=======
  const handleAddTag = async (name: string) => {
    if (!name.trim()) return;
    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim() })
      });
      if (res.ok) {
        const newTag = await res.json();
        setTags([...tags, newTag]);
>>>>>>> 0f88f51c0a24d4e4fde635813c99add7adbc7f91
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await fetch(`/api/tags/${id}`, { method: 'DELETE' });
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

<<<<<<< HEAD
  // Global delete for sidebar
  const handleDeleteTagGlobally = (tagToDelete: string) => {
    // Remove from available tags
    setAvailableTags(availableTags.filter(t => t !== tagToDelete));

    // Remove from all notes
    setNotes(notes.map(note => ({
      ...note,
      tags: note.tags.filter(t => t !== tagToDelete)
    })));
  };

=======
>>>>>>> 0f88f51c0a24d4e4fde635813c99add7adbc7f91
  // Note Handlers
  const handleAddNote = async () => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Note', content: '' })
      });
      if (res.ok) {
        const n = await res.json();
        const newNote: Note = {
          id: n.id,
          title: n.title,
          content: n.content || '',
          date: new Date(n.updated_at).toLocaleDateString(),
          pinned: n.is_pinned,
          trashed: false,
          tag_id: n.tag_id
        };
        setNotes([newNote, ...notes]);
        setCurrentNoteId(newNote.id);
        if (currentView === 'trash') setCurrentView('notes');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePinNote = async (id: string) => {
    const noteToUpdate = notes.find(n => n.id === id);
    if (!noteToUpdate) return;

    // Optimistic update
    const updatedNotes = notes.map(note => note.id === id ? { ...note, pinned: !note.pinned } : note);
    setNotes(updatedNotes);

    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_pinned: !noteToUpdate.pinned })
      });
    } catch (e) {
      console.error(e);
      // Revert on failure?
      fetchData();
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string, tag_id?: string) => {
    // Optimistic update (local state)
    if (currentView === 'notes') {
      setNotes(notes.map(note => note.id === id ? { ...note, title, content, tag_id } : note));
    } else {
      setTrashNotes(trashNotes.map(note => note.id === id ? { ...note, title, content, tag_id } : note));
    }

    // Debounce this in a real app, but for now direct call
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, content, tag_id })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoveToTrash = async (id: string) => {
    // Optimistic
    const note = notes.find(n => n.id === id);
    if (note) {
      setNotes(notes.filter(n => n.id !== id));
      setTrashNotes([{ ...note, trashed: true }, ...trashNotes]);
      if (currentNoteId === id) setCurrentNoteId(null);
    }

    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
      fetchData();
    }
  };

  const handleRestoreFromTrash = async (id: string) => {
    // Optimistic
    const note = trashNotes.find(n => n.id === id);
    if (note) {
      setTrashNotes(trashNotes.filter(n => n.id !== id));
      setNotes([{ ...note, trashed: false }, ...notes]);
      if (currentNoteId === id) setCurrentNoteId(null);
    }

    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_deleted: false })
      });
    } catch (e) {
      console.error(e);
      fetchData();
    }
  };

  const handleDeleteForever = async (id: string) => {
    // Optimistic
    setTrashNotes(trashNotes.filter(n => n.id !== id));
    if (currentNoteId === id) setCurrentNoteId(null);

    try {
      await fetch(`/api/trash?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
      fetchData();
    }
  };

  // Determine what to display
  const displayNotes = currentView === 'trash' ? trashNotes : notes;
  const currentNote = displayNotes.find(n => n.id === currentNoteId);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {isSidebarOpen && (
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          className="hidden md:flex"
<<<<<<< HEAD
          tags={availableTags}
          onDeleteTag={handleDeleteTagGlobally}
          notes={visibleNotes}
          currentNoteId={currentNoteId}
=======
          tags={tags}
          onDeleteTag={handleDeleteTag}
          notes={displayNotes}
          currentNoteId={currentNoteId || ''}
>>>>>>> 0f88f51c0a24d4e4fde635813c99add7adbc7f91
          onSelectNote={setCurrentNoteId}
          onAddNote={handleAddNote}
          onPinNote={handlePinNote}
          isTrash={currentView === 'trash'}
        />
      )}
      <main className="flex-1 overflow-hidden">
        {currentView === "notes" && (
          currentNote ? (
            <Editor
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              tags={tags}
              onAddTag={handleAddTag}
              onDeleteTag={handleDeleteTag}
              note={currentNote}
              onUpdateNote={(title, content, tag_id) => handleUpdateNote(currentNote.id, title, content, tag_id)}
              onMoveToTrash={() => handleMoveToTrash(currentNote.id)}
              isTrash={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a note or create a new one.
            </div>
          )
        )}
        {currentView === "trash" && (
          currentNote ? (
            <Editor
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              tags={tags}
              onAddTag={handleAddTag}
              onDeleteTag={handleDeleteTag}
              note={currentNote}
              onUpdateNote={(title, content, tag_id) => handleUpdateNote(currentNote.id, title, content, tag_id)}
              onRestoreNote={() => handleRestoreFromTrash(currentNote.id)}
              onDeleteForever={() => handleDeleteForever(currentNote.id)}
              isTrash={true}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a trashed note to view.
            </div>
          )
        )}
        {currentView === "ai" && <AIChat />}
      </main>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
}
