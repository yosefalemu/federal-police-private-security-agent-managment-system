import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  styled,
} from "@mui/material";
import ApplyHeader from "../components/ApplyHeader";
import { useNavigate } from "react-router-dom";

const ApplyButton = styled(Button)({
  marginTop: "20px ",
  background: "#112846",
  color: "#fff",
  width: "94%",
  "&:hover": {
    background: "#192E77",
  },
});
const CancelButton = styled(Button)({
  marginTop: "20px",
  background: "red",
  color: "#fff",
  width: "94%",
  "&:hover": {
    background: "#C0392B",
  },
});

const ApplyAssistancePage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ApplyHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          padding: "80px 50px",
        }}
      >
        <Typography
          variant="h4"
          marginBottom={2}
          fontWeight={600}
          color={"#112846"}
          textAlign={"center"}
          maxWidth={"1000px"}
        >
          Application Guide for Private Security Agent Registration with the
          Ethiopian Federal Police
        </Typography>
        <Paper
          sx={{
            width: "95%",
            height: "fit-content",
            textAlign: "center",
            padding: "45px 20px",
          }}
          elevation={20}
        >
          <Typography variant="h5" color={"#112846"} textAlign={"left"}>
            Welcome to the Private Security Agent Registration process with the
            Ethiopian Federal Police. To ensure a smooth application experience,
            please carefully follow the steps outlined below
          </Typography>
          <Typography
            variant="h5"
            textAlign={"left"}
            marginTop={3}
            color={"#112846"}
            fontWeight={"700"}
          >
            Step 1: Prepare Your Documents
          </Typography>
          <Typography
            variant="h6"
            textAlign={"left"}
            marginTop={0}
            color={"#112846"}
          >
            Before you begin the application process, make sure you have the
            following documents ready. Take clear photos and scans of each
            document:
          </Typography>
          <Box sx={{ paddingLeft: "100px" }}>
            <Typography
              variant="h5"
              textAlign={"left"}
              marginTop={2}
              color={"#112846"}
              fontWeight={"700"}
            >
              Applicant's Personal Information (File 1)
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Full Name
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Date of Birth
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Nationality
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Address
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Contact Information (Phone, Email)
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                National Id
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Number High-resolution photos of the applicant
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Footprint
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Medical Certificate
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Job Experience Details
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Education Certifications
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Personal ID
              </Typography>
            </Box>
            <Typography
              variant="h5"
              textAlign={"left"}
              marginTop={2}
              color={"#112846"}
              fontWeight={"700"}
            >
              Information about the Aimed Security Agency (File 2):
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Name of Private Security Agency
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Trade Name
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Trade Pre-registration
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Trade Permission
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Employee Qualification Assurance
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Tembir (if applicable)
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Structure of the Agency
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Letter of Construction
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Rules and Regulations
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Form of Registration
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Warranty Form
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Agency Logo
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Bank Statement
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Proof of House Rent Payment for at least 1 year
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Uniform Details
              </Typography>
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Employee ID (front and back)
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            textAlign={"left"}
            marginTop={3}
            color={"#112846"}
            fontWeight={"700"}
          >
            Step 2: Convert Documents to PDF
          </Typography>
          <Typography
            variant="h6"
            textAlign={"left"}
            marginTop={0}
            color={"#112846"}
          >
            Arrange the documents according to the categories mentioned above.
            Once organized, convert them into two separate PDF files: one for
            your personal information and another for the information about the
            aimed security agency.
          </Typography>
          <Box sx={{ paddingLeft: "100px" }}>
            <Typography
              variant="h5"
              textAlign={"left"}
              marginTop={2}
              color={"#112846"}
              fontWeight={"700"}
            >
              File Naming Convention:
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Use clear and consistent names for your PDF files.
                <Typography variant="body1" fontWeight={"700"}>
                  Example:"YourName_Personal_Info.pdf,"
                  "Security_Agency_Info.pdf"
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            textAlign={"left"}
            marginTop={3}
            color={"#112846"}
            fontWeight={"700"}
          >
            Step 3: Application Submission
          </Typography>
          <Typography
            variant="h6"
            textAlign={"left"}
            marginTop={0}
            color={"#112846"}
          >
            Submit the two PDF files through the designated online portal or
            submission method specified by the Ethiopian Federal Police. Ensure
            that all documents are legible, up-to-date, and meet the specified
            requirements. We appreciate your commitment to becoming a registered
            Private Security Agent. If you encounter any difficulties during the
            application process, feel free to reach out to our support team for
            assistance.
          </Typography>
          <Typography
            variant="h5"
            textAlign={"left"}
            marginTop={3}
            color={"#112846"}
            fontWeight={"700"}
          >
            Step 4: Application Outcome Notification:
          </Typography>
          <Typography
            variant="h6"
            textAlign={"left"}
            marginTop={0}
            color={"#112846"}
          >
            After the thorough review of your application, we are pleased to
            inform you of the following outcomes
          </Typography>
          <Box sx={{ paddingLeft: "100px" }}>
            <Typography
              variant="h5"
              textAlign={"left"}
              marginTop={2}
              color={"#112846"}
              fontWeight={"700"}
            >
              Application Accepted
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                You will receive an email to the address provided, containing
                your login details. With your credentials, you can now access
                the application portal. From there, you'll have the ability to
                hire employees, manage your team, update your profile, and
                perform various administrative tasks. We appreciate your
                commitment to maintaining security standards, and we wish you
                success in your role.
              </Typography>
            </Box>
            <Typography
              variant="h5"
              textAlign={"left"}
              marginTop={2}
              color={"#112846"}
              fontWeight={"700"}
            >
              Application Rejected
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"left"}
                marginTop={0}
                color={"#112846"}
              >
                Detailed reasons for the rejection will be provided via email to
                the address you submitted. Carefully review the feedback,
                address any identified issues, and feel free to reapply. We
                appreciate your interest and encourage you to make the necessary
                adjustments before submitting a new application. Thank you for
                your understanding and dedication to the registration process.
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontWeight={"700"}
            marginTop={5}
            color={"#112846"}
          >
            Best of luck with your application!
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "70%",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <CancelButton onClick={() => navigate("/")}>Cancel</CancelButton>
              <ApplyButton onClick={() => navigate("/apply")}>
                Confirm
              </ApplyButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ApplyAssistancePage;
