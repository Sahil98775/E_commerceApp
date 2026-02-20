import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  username: string;
  password: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  registeredUsers: User[];
  theme: "light" | "dark";
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [],
  theme: "light",
};

type ProfileState = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: string | null;
};

const initialProfileState: ProfileState = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const existingUser = state.registeredUsers.find(
        (user) => user.username === action.payload.username
      );

      if (!existingUser) {
        state.registeredUsers.push(action.payload);
      }
    },

    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        password: "",
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" as "light" | "dark" },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.image = action.payload.image;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
