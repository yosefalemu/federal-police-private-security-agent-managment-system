import { createSlice } from "@reduxjs/toolkit";

const conversation = createSlice({
  name: "file",
  initialState: {
    conversationId: "",
  },
  reducers: {
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    removeCurrentConversation: (state) => {
      state.conversationId = "";
    },
  },
});
export const { setConversationId, removeCurrentConversation } =
  conversation.actions;
export default conversation.reducer;
