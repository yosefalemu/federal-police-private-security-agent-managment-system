const mongoose = require("mongoose")
const ConversationSchema = new mongoose.Schema({
    members:{
        type:Array,

    },
},
{
    timestamps:true
})

module.exports = new mongoose.model("Conversations", ConversationSchema)


const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: new mongoose.Types.ObjectId,
      ref:"ConverstationSchema"
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "UserSchema",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);