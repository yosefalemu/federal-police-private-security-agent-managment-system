import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EachScreener = ({ screenerId }) => {
  console.log("screener id", screenerId);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getSingleUser = () => {
      axios
        .get(`http://localhost:5000/api/v1/users/getsingle/${screenerId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("screener user", response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleUser();
  }, [screenerId]);

  return (
    <Box>{user?.firstName + " " + user?.middleName + " " + user?.lastName}</Box>
  );
};

export default EachScreener;
