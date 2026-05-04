import { useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NoteCard } from "../components/NoteCard.tsx";
import { CreateNoteModal } from "../components/CreateNoteModal.tsx";
import { useNotes } from "../services/notesService.ts";

export function NotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: notes, isLoading, error } = useNotes();

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            My Notes
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Keep track of your thoughts and ideas.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add Note
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">Failed to load notes. Please try again later.</Alert>
      ) : !notes || notes.length === 0 ? (
        <Box
          sx={{
            py: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 4,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary" variant="h6" gutterBottom>
            No notes yet
          </Typography>
          <Typography color="text.disabled" variant="body2" mb={3}>
            Start capturing your ideas by creating your first note.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Create first note
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      )}

      <CreateNoteModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
