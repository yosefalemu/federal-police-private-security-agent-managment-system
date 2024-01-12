import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DowloadButton = styled(Button)({
  marginTop: "3px",
  marginBottom: "0px",
  padding: "5px 10px",
  background: "#112846",
  borderRadius: "5px",
  textAlign: "center",
  color: "#fff",
  "&:hover": {
    background: "#192E77",
  },
});
const Certeficateview = ({ certeficate, setCerteficateModal }) => {
  console.log(certeficate);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleDowloadCeritficate = () => {
    toast.success("Downloading...");
    const input = document.getElementById("take");

    const scale = 5; // Increase the scale for higher resolution
    const options = {
      logging: true,
      letterRendering: 1,
      useCORS: true,
      scale: scale,
      dpi: 400, // Adjust the dpi for better quality
    };

    html2canvas(input, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", [1000, 670]);
        pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
        pdf.save(
          `${certeficate?.agentName.split(" ").join("_")}_certeficate.pdf`
        );
        setTimeout(() => {
          setCerteficateModal(false);
        }, 4000);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        id="take"
        sx={{
          width: "90%",
          height: "92%",
          border: "10px solid #112846",
          padding: "10px 15px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Box sx={{ width: "100px" }}></Box>
              <Box
                sx={{
                  width: "150px",
                  height: "75px",
                  margin: "auto",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/2560px-Flag_of_Ethiopia.svg.png"
                  alt="test"
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "75px",
                  height: "75px",
                }}
              >
                <img
                  src={`${PF}uploads/${certeficate?.profilePicture}`}
                  alt="test"
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ marginTop: "10px", lineHeight: "0px" }}>
              <Typography
                variant="h5"
                sx={{ maxWidth: "450px", fontWeight: "700" }}
                textAlign={"center"}
              >
                በኢትዮጵያ ፌደራላዊ ዴሞክራሲያዊ ሪፐብሊክ መንግስት ፌደራል ፖሊስ
              </Typography>
              <Typography
                variant="h5"
                sx={{ maxWidth: "450px", fontWeight: "600" }}
                textAlign={"center"}
              >
                The Federal Democratic Republic of Ethiopia Federal Police
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "50px",
              padding: "30px 10px",
            }}
          >
            <Box sx={{ flex: "1" }}>
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
                textAlign={"left"}
              >
                የግል የጥበቃ ተቋማት ብቃት ማረጋገጫ የምስክር ወረቀት
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  የተቋሙ ስም፡
                </Typography>
                <Typography variant="body1">
                  {certeficate?.agentName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  አድራሻ፡
                </Typography>
                <Typography variant="body1">{certeficate?.address}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  ደረጃ፡
                </Typography>
                <Typography variant="body1">{certeficate?.level}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  የተሰጠበት ቀን፡
                </Typography>
                <Typography variant="body1">
                  {certeficate?.dateOfIssuedInEuropeanCalander} ዓ/ም
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  አገልግሎት የሚያበቃበት ቀን፡
                </Typography>
                <Typography variant="body1">
                  {certeficate?.dateOfIssuedInEuropeanCalander} ዓ/ም
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  ይህ የምስክር ወረቀት በመመርያ ቁጥር 01/2003 የተሰጠ ነው።
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  የሰጠው ኃላፊ ስም ..............................................
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  ፊርማ ...........................
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: "1.4" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
                textAlign={"left"}
              >
                Private Security agencies Quality assurance certeficate
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Name of the Agency፡
                </Typography>
                <Typography variant="body1">{certeficate.agentName}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Address:
                </Typography>
                <Typography variant="body1">{certeficate.address}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Level:
                </Typography>
                <Typography variant="body1">{certeficate.level}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Date of Issued:
                </Typography>
                <Typography variant="body1">
                  {certeficate?.dateOfIssuedInEuropeanCalander}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  height: "fitContent",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Date of Expired:
                </Typography>
                <Typography variant="body1">
                  {certeficate?.dateOfExpiredInEuropeanCalander}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  This Certificate is issued pursuant to directive No 01/2011
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Approved by ..............................................
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                  Signature ...........................
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DowloadButton onClick={handleDowloadCeritficate} size="small">
          Dowload as pdf
        </DowloadButton>
      </Box>
    </Box>
  );
};

export default Certeficateview;
