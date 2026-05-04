import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useCreateNote } from "../services/notesService.ts";

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateNoteModal({ open, onClose }: CreateNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createNote = useCreateNote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createNote.mutate(
      { title: title.trim() || null, content: content.trim() },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Note</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title (optional)"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title"
              variant="outlined"
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!content.trim() || createNote.isPending}
            sx={{ px: 3 }}
          >
            {createNote.isPending ? "Creating..." : "Create Note"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
