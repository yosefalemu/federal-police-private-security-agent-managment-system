import { createSlice } from "@reduxjs/toolkit";

const file = createSlice({
  name: "file",
  initialState: {
    agentsFile: "",
    adminFile: "",
    confirmId: "",
  },
  reducers: {
    setAgentFile: (state, action) => {
      state.agentsFile = action.payload;
    },
    setAdminFile: (state, action) => {
      state.adminFile = action.payload;
    },
    setConfirmId: (state, action) => {
      state.confirmId = action.payload;
    },
    removeConfirmId: (state) => {
      state.confirmId = "";
    },
    removeAdminFile: (state) => {
      state.adminFile = "";
    },
    removeAgentFile: (state) => {
      state.agentsFile = "";
    },
  },
});
export const {
  setAgentFile,
  removeAgentFile,
  setAdminFile,
  removeAdminFile,
  setConfirmId,
  removeConfirmId,
} = file.actions;
export default file.reducer;
