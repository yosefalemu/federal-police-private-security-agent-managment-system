import { createSlice } from "@reduxjs/toolkit";

const agent = createSlice({
  name: "agent",
  initialState: {
    currentAgentId: "",
    from: "",
    agentName: "",
  },
  reducers: {
    setCurrentAgentId: (state, action) => {
      state.currentAgentId = action.payload;
    },
    setAgentName: (state, action) => {
      state.agentName = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    removeFrom: (state) => {
      state.from = "";
    },
  },
});
export const { setCurrentAgentId, setFrom, removeFrom, setAgentName } =
  agent.actions;
export default agent.reducer;
