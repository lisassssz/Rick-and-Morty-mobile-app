import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      AsyncStorage.setItem("isDarkTheme", JSON.stringify(state.isDarkTheme)); // уставливаем тему в хранилище
    },
    setTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
