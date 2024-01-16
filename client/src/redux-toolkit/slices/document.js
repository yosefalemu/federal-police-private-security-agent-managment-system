import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    currentDocument: "",
    requestDocuments: [],
  },
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    setAllRequestDocument: (state, action) => {
      state.requestDocuments = action.payload;
    },
  },
});
export const { setCurrentDocument, setAllRequestDocument } = document.actions;
export default document.reducer;
