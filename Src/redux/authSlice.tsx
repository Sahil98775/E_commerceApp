import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../util/productype";
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
// interface ProfileState {
//   profiles: {
//     [username: string]: {
//       name: string;
//       email: string;
//       phoneNumber: string;
//       address: string;
//       image: string | null;
//     };
//   };
// }

const initialProfileState: ProfileState = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  image: null,
};
// const initialProfileState: ProfileState = {
//   profiles: {},
// };

interface FavouriteState {
  items: Product[];
}

const initialFavouriteState: FavouriteState = {
  items: [],
};
type cartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  availabilityStatus: string;
  shippingInformation: string;
  quantity: number;
  subPrice: number;
};

interface CartState {
  items: cartItem[];
}
// interface CartState {
//   carts: {
//     [username: string]: cartItem[];
//   };
// }

const initialCartState: CartState = {
  items: [],
};
// const initialCartState: CartState = {
//   carts: {},
// };
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
    // login: (state, action: PayloadAction<User>) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // },
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
// const profileSlice = createSlice({
//   name: "profile",
//   initialState: initialProfileState,
//   reducers: {
//     setProfile: (
//       state,
//       action: PayloadAction<{
//         username: string;
//         profile: {
//           name: string;
//           email: string;
//           phoneNumber: string;
//           address: string;
//           image: string | null;
//         };
//       }>
//     ) => {
//       state.profiles[action.payload.username] = action.payload.profile;
//     },
//   },
// });
const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initialFavouriteState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleFavourite: (state, action: PayloadAction<Product>) => {
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

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          thumbnail: action.payload.thumbnail,
          price: action.payload.price,
          availabilityStatus: action.payload.availabilityStatus,
          shippingInformation: action.payload.shippingInformation,
          quantity: 1,
          subPrice: action.payload.price,
        });
      }
    },
    // addToCart: (state, action: PayloadAction<cartItem>) => {
    //   const existingItem = state.items.find(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (existingItem) {
    //     state.items = state.items.filter(
    //       (item) => item.id !== action.payload.id
    //     );
    //   } else {
    //     state.items.push({
    //       ...action.payload,
    //       quantity: 1,
    //       subPrice: action.payload.price,
    //     });
    //   }
    // },

    incrementCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.subPrice = item.price * item.quantity;
      }
    },
    decrementCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.subPrice = item.price * item.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // remove if already exists
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        // add if not exists
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          thumbnail: action.payload.thumbnail,
          price: action.payload.price,
          availabilityStatus: action.payload.availabilityStatus,
          shippingInformation: action.payload.shippingInformation,
          quantity: 1,
          subPrice: action.payload.price,
        });
      }
    },
  },
});
type Order = {
  id: string; // unique order id
  items: cartItem[];
  totalAmount: number;
  date: string;
};

interface OrdersState {
  orders: Order[];
}

const initialOrdersState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    placeOrder: (state, action: PayloadAction<cartItem[]>) => {
      const newOrder: Order = {
        id: Date.now().toString(),
        items: action.payload,
        totalAmount: action.payload.reduce(
          (sum, item) => sum + item.subPrice,
          0
        ),
        date: new Date().toISOString(),
      };

      state.orders.push(newOrder);
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

export const { register, login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

export const { addToFavourites, removeFromFavourites, toggleFavourite } =
  favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;

export const {
  addToCart,
  incrementCart,
  decrementCart,
  removeFromCart,
  toggleCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
