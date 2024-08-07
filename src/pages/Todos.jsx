import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import {
  Button,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import TodoList from "../components/TodoList";

export default function Todos() {
  const navigate = useNavigate();
  const [todoName, setTodoName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const url = "https://node-server-k3tz.onrender.com/todos";
  const token = Cookies.get("token");

  const logoutHandler = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const getTodos = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response?.data?.todos);
    } catch (error) {
      console.error("Failed to fetch todos", error);
      setSnackbarMessage("Failed to fetch todos");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, [token, url]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const saveTodoHandler = async () => {
    try {
      await axios.post(
        url,
        { name: todoName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await getTodos();
      setSnackbarMessage("Todo saved successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Failed to save todo", error);
      setSnackbarMessage("Failed to save todo");
      setSnackbarSeverity("error");
    } finally {
      setTodoName("");
      setSnackbarOpen(true);
    }
  };

  const editHandler = (todo) => {
    setIsEdit(todo._id);
    setTask(todo.name);
  };

  const updateHandler = async (id) => {
    try {
      await axios.post(
        `${url}/${id}`,
        { name: task },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await getTodos();
      setSnackbarMessage("Todo updated successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Failed to update todo", error);
      setSnackbarMessage("Failed to update todo");
      setSnackbarSeverity("error");
    } finally {
      setIsEdit(null);
      setTask("");
      setSnackbarOpen(true);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getTodos();
      setSnackbarMessage("Todo deleted successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Failed to delete todo", error);
      setSnackbarMessage("Failed to delete todo");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const toggleCompleteHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header logoutHandler={logoutHandler} />
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{ alignItems: "center", paddingTop: "20px" }}>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Enter todos"
            value={todoName}
            variant="outlined"
            onChange={(e) => setTodoName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={saveTodoHandler}>
            Save
          </Button>
        </Grid>
        {loading ? (
          <Grid item>
            <CircularProgress />
          </Grid>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <TodoList
              key={todo._id}
              todo={todo}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              isEdit={isEdit}
              task={task}
              updateHandler={updateHandler}
              setTask={setTask}
              toggleCompleteHandler={toggleCompleteHandler}
            />
          ))
        ) : (
          <Grid item>
            <Typography>No todos available</Typography>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
