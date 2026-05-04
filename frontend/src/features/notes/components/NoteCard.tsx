import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { Note } from "../interfaces/notes.interfaces.ts";
import { useDeleteNote } from "../services/notesService.ts";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const deleteNote = useDeleteNote();

  const date = new Date(note.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
          "& .delete-btn": { opacity: 1 },
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {note.title && (
          <Typography variant="h6" component="div" gutterBottom fontWeight={600} sx={{ fontSize: "1.1rem" }}>
            {note.title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", flexGrow: 1 }}>
          {note.content}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.disabled">
            {date}
          </Typography>
          <IconButton
            className="delete-btn"
            size="small"
            color="error"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this note?")) {
                deleteNote.mutate(note.id);
              }
            }}
            sx={{ 
              opacity: 0, 
              transition: "opacity 0.2s",
              "&:hover": { bgcolor: "error.lighter" } 
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
