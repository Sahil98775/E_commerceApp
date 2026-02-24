import { configureStore } from "@reduxjs/toolkit";
import {
  themeReducer,
  profileReducer,
  authReducer,
  favouriteReducer,
  cartReducer,
} from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);

const persistedThemeReducer = persistReducer(
  { ...persistConfig, key: "theme" },
  themeReducer
);
const persistedProfileReducer = persistReducer(
  { ...persistConfig, key: "profile" },
  profileReducer
);
const persistedFavouriteReducer = persistReducer(
  { ...persistConfig, key: "Favourite" },
  favouriteReducer
);
const persistedCartReducer = persistReducer(
  { ...persistConfig, key: "cart" },
  cartReducer
);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
    profile: persistedProfileReducer,
    favourite: favouriteReducer,
    cart: persistedCartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
