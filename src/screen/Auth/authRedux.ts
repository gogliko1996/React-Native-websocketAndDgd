import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../ui-kit/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screens } from "../../navigation/screen.name";

interface UserState {
  status: boolean;
  user: UserObject | any;
  createUser: string | any;
  error: string | null;
}

interface UserObject {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  status: false,
  user: null,
  createUser: {},
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userObject: UserObject) => {
    const { data } = await api.post("/register", userObject);
    return data;
  }
);

export const getUser = createAsyncThunk("getUser/user", async () => {
  const data = await api.get("/protected");

  return data;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userObject: UserObject, { dispatch }) => {
    const { data } = await api.post("/login", userObject);

    AsyncStorage.setItem("accessToken", data.accessToken);
    AsyncStorage.setItem("refreshToken", data.refreshToken);

    if (data.accessToken) {
      dispatch(getUser());
    }

    return data;
  }
);

export const selectInitialRouteNameForUser = (state: any) => {
  return !state.user ? Screens.home : Screens.signIn;
};

const createUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = true;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserObject[]>) => {
          state.status = false;
          state.createUser = action.payload;
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to create user";
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.status = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = false;
        state.user = action.payload?.data.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to create user";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to login";
      });
  },
});

export default createUserSlice.reducer;
