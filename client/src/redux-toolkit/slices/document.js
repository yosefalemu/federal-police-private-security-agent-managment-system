import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    currentDocument: "",
  },
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
  },
});
export const { setCurrentDocument } = document.actions;
export default document.reducer;
