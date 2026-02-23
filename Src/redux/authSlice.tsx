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

type FavouriteItem = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  description: string;
  rating: number;
  stock: number;
  availabilityStatus: string;
  weight: number;
};

interface FavouriteState {
  items: FavouriteItem[];
}

const initialFavouriteState: FavouriteState = {
  items: [],
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

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initialFavouriteState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<FavouriteItem>) => {
      state.items.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

export const { addToFavourites, removeFromFavourites, toggleFavourite } =
  favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
