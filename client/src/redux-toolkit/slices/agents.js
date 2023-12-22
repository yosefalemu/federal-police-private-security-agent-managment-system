import { createSlice } from "@reduxjs/toolkit";

const agent = createSlice({
  name: "agent",
  initialState: {
    currentAgentId: "",
    from: "",
  },
  reducers: {
    setCurrentAgentId: (state, action) => {
      state.currentAgentId = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    removeFrom: (state) => {
      state.from = "";
    },
  },
});
export const { setCurrentAgentId, setFrom, removeFrom } = agent.actions;
export default agent.reducer;
