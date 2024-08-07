import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const TodoList = ({
  todo,
  deleteHandler,
  editHandler,
  isEdit,
  task,
  updateHandler,
  setTask,
  toggleCompleteHandler,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteHandler(todo._id);
    setOpen(false);
  };

  return (
    <Grid container sx={{ justifyContent: "center", paddingTop: "20px" }}>
      <FormGroup>
        <Grid item>
          {!isEdit || isEdit !== todo._id ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleCompleteHandler(todo._id)}
                  />
                }
                label={
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "grey" : "inherit",
                    }}>
                    {todo.name}
                  </span>
                }
              />
              <IconButton onClick={() => editHandler(todo)}>
                <EditIcon />
              </IconButton>
              <Button
                variant="contained"
                color="error"
                onClick={handleClickOpen}>
                Delete
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this task?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmDelete} color="error" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Grid container columnGap={2}>
              <TextField
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => updateHandler(todo._id)}>
                Update
              </Button>
            </Grid>
          )}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default TodoList;
