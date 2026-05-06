import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../App.css"
import { TodosContext } from '../contexts/TodosContext';
import { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function Todo({ todo }) {

  const [todos, setTodos] = useContext(TodosContext);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // state للتعديل
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.desc);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isDone: !t.isDone };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));

  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleClose() {
    setShowDeleteDialog(false);
  }

  function handleEditClick() {
    setEditTitle(todo.title);
    setEditDesc(todo.desc);
    setShowEditDialog(true);
  }

  function handleEditClose() {
    setShowEditDialog(false);
  }

  function handleUpdate() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: editTitle,
          desc: editDesc
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
    handleEditClose();
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onClose={handleClose}>
        <DialogTitle>Delete Task?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => {
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            handleClose();
          }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task Title"
            fullWidth
            variant="standard"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            id="desc"
            label="Task Description"
            fullWidth
            variant="standard"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Close</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Card */}
      <Card className='card' sx={{ minWidth: 275, background: "#243dac", color: "white", marginTop: "20px" }}>
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xs={8}>
              <Typography variant='h5' sx={{ textAlign: "left",textDecoration:todo.isDone?"line-through":"none" }}>
                {todo.title}
                
              </Typography>

              <Typography variant='h6' sx={{ textAlign: "left" }}>
                {todo.desc}
              </Typography>
            </Grid>

            <Grid item xs={4} display="flex" justifyContent="space-around" alignItems="center">

              <IconButton
                onClick={handleCheckClick}
                style={{
                  color: todo.isDone ? "#e6e7e5" : "#1769aa",
                  background: todo.isDone ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px"
                }}>
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleEditClick}
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px"
                }}>
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px"
                }}>
                <DeleteIcon />
              </IconButton>

            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}