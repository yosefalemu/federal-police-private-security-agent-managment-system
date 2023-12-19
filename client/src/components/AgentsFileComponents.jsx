import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const NavigationButton = styled(Button)({
  marginRight: "20px",
  background: "#112846",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#192E77",
  },
});

const AgentsFileComponents = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages?._pdfInfo?.numPages);
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { agentsFile } = useSelector((state) => state.file);

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(1, prevPageNumber - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(numPages, prevPageNumber + 1));
  };

  return (
    <Box sx={{ padding: "10px", background: "#dedede", position: "relative" }}>
      <Box
        component={Link}
        to="/screenerrequest"
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#112846",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 20px 10px 10px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <KeyboardBackspaceIcon />
        Back
      </Box>
      <Box sx={{ padding: "50px" }}>
        <Typography
          sx={{ color: "#112846" }}
          textAlign={"center"}
          variant="h4"
          p={0}
          m={0}
        >
          Agents Files
        </Typography>
        <Document
          file={`${PF}files/${agentsFile}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <NavigationButton variant="contained" onClick={handlePreviousPage}>
            Previous Page
          </NavigationButton>
          <NavigationButton variant="contained" onClick={handleNextPage}>
            Next Page
          </NavigationButton>
        </Document>
      </Box>
    </Box>
  );
};

export default AgentsFileComponents;
