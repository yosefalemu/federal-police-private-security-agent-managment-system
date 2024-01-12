import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Messages = ({ item, own }) => {
  console.log(item);
  console.log(own);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: own ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "380px",
          padding: "5px 10px",
          background: "lightgray",
          borderRadius: own ? "15px 15px 0px 15px" : "0px 15px 15px 15px",
        }}
      >
        {item?.text}
      </Box>
    </Box>
  );
};

export default Messages;
