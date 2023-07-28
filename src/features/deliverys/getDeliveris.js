import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  todos: [],
};

const deliveryUsers = createSlice({
  name: 'deliverys',
  initialState,
  reducers: {
    setDelivery: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.createdAt = action.payload.createdAt;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setDelivery, addTodo, deleteTodo, setTodos } = deliveryUsers.actions;
export default deliveryUsers.reducer;