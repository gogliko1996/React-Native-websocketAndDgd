import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import api from "../../ui-kit/api/api";

export interface TodoObject {
  title: string;
  description: string;
  status: string;
  startStatus?: string;
  id?: number;
  userId?: string;
}
interface UserState {
  status: boolean;
  todos: TodoObject[] | null;
  error: string | null;
}

const initialState: UserState = {
  status: false,
  todos: [],
  error: null,
};

export const creatTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoList: TodoObject) => {
    try {
      const response = await api.post("/todo", todoList);
    //   return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getTodo = createAsyncThunk(
  "todo/getTodo",
  async (userId: number) => {
    try {
      const data = await api.get(`/getTodo/${userId}`);
      return data.data;
    } catch (error) {
      console.error;
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (
    { id, updateData }: { id: number; updateData: TodoObject },
    { rejectWithValue }
  ) => {
    try {
      await api.patch(`/updateTodo/${id}`, updateData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number, { dispatch }) => {
    try {
      await api.delete(`/deleteTodo/${id}`);
    } catch (error) {
      dispatch(addTodoBack(id));
      throw error;
    }
  }
);

const createTodoreducer = createSlice({
  name: "todo",
  initialState,

  reducers: {
    addTodoOptimistic: (state, action: PayloadAction<TodoObject>) => {
      state.todos?.push(action.payload);
    },

    replaceTempTodoId: (
      state,
      action: PayloadAction<{ tempId: number; actualId: number }>
    ) => {
      const index = state.todos?.findIndex(
        (todo) => todo.id === action.payload.tempId
      );
      if (index !== undefined && index !== -1) {
        state.todos![index].id = action.payload.actualId;
      }
    },

    updateTodoOptimistic: (
      state,
      action: PayloadAction<{ id: number; updateData: TodoObject }>
    ) => {
      const index = state.todos?.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== undefined && index !== -1) {
        state.todos![index] = {
          ...state.todos![index],
          ...action.payload.updateData,
        };
      }
    },

    removeTodoOptimistic: (state, action: PayloadAction<number>) => {
      state.todos =
        state.todos?.filter((todo) => todo.id !== action.payload) || null;
    },
    deleteTodoOptimistic: (state, action: PayloadAction<number>) => {
      state.todos =
        state.todos?.filter((todo) => todo.id !== action.payload) || null;
    },
    addTodoBack: (state, action: PayloadAction<TodoObject | any>) => {
      state.todos?.push(action.payload);
    },
    todoLogOut: (state) => {
      state.todos = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(creatTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(creatTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(creatTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(getTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = false;
        state.todos = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(updateTodo.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });
  },
});

export const {
  addTodoOptimistic,
  replaceTempTodoId,
  removeTodoOptimistic,
  deleteTodoOptimistic,
  addTodoBack,
  updateTodoOptimistic,
  todoLogOut,
} = createTodoreducer.actions;

export default createTodoreducer.reducer;
