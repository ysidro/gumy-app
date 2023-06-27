import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  email: null,
  notifications:null,
  createdAt: null,
  task: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {

      state.id = action.payload.id;
      state.name = action.payload.name;
      state.notifications = action.payload.notifications,
      state.email = action.payload.email;
      state.task = action.payload.task;
      state.createdAt = action.payload.createdAt;
    },
    addTodo: (state, action) => {
      state.task.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.task = state.task.filter(task => task.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.task = action.payload;
    },
    setNotificationToken: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setUser, addTodo, deleteTodo, setTodos, setNotificationToken } = userSlice.actions;
export default userSlice.reducer;