import React, { useState, useEffect } from "react";
// import templeImage from "../../Images/donetShiva.png";
import DoneteImage from "../../Images/donete.png";
import DoneteImageModel from "../../Images/donateModel.jpeg";
import lingamvideo from "../../Images/lingamvideo.gif";

import PhonePayImage from "../../Images/phnoepay.jpg";
import axios from "axios";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Footer from "../Footer/Footer";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ObjModel from "../ObjModel";

// import ModelViewer from '../../Components/ModelViewer';
import "./Donate.css";

import {
  Box,
  Typography,
  IconButton,
  Stack,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LogoImage from "../../Images/KotilingaTempleLogo1.png";
import lingam from "../../Images/lingam.png";
import { useMediaQuery, useTheme } from "@mui/material";

const RegisterBanner = () => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  // const [donationAmount, setDonationAmount] = useState("");
  const [inputNumber, setInputNumber] = useState();
  const [isNumberValid, setIsNumberValid] = useState(null); // null, true, false
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [donationAmount, setDonationAmount] = useState(5000);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    dob: "",
    gothram: "",
  });
  const [openFormModal, setOpenFormModal] = useState(false);
  const [showPaymentImage, setShowPaymentImage] = useState(false);

  const [successMessage, setSuccessMessage] = useState(""); // To show success message
  const [errorMessage, setErrorMessage] = useState("");
  const [hasDonationNumber, setHasDonationNumber] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const userId = storedUser?.userId;
  console.log("userId,,.........", userId);

  const token = localStorage.getItem("token");
  console.log("token2222", token);

  // form
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        userName: storedUser.userName || "",
        phoneNumber: storedUser.phoneNumber || "",
        gothram: storedUser.gothram || "",
        dob: storedUser.dob || "",
      }));
      if (storedUser.donateNumber) {
        setHasDonationNumber(true);
      }
    }
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    if (!storedUser || !storedUser.userId) {
      alert("User not found. Please log in again.");
      return;
    }

    if (!file) {
      alert("Please upload your payment receipt.");
      return;
    }

    setLoading(true); // Start loading spinner

    const formDataToSend = new FormData();
    formDataToSend.append("userId", storedUser.userId);
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("gothram", formData.gothram);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("donateNumber", inputNumber);
    formDataToSend.append("amount", "5000");
    formDataToSend.append("paymentMethod", "QR Code");
    formDataToSend.append("paymentRecept", file);

    try {
      const response = await axios.post(
        "https://templeservice.signaturecutz.in/payments/api/create-payment",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setSnackbarMessage(
          "Payment successfully processed! Thank you for your support."
        );
        setOpenSnackbar(true);
        setTimeout(() => {
          setShowPaymentImage(false);
        }, 3000);

        if (!storedUser.donateNumber) {
          const donateData = {
            donateNumber: inputNumber,
            userName: formData.userName,
            userId: storedUser.userId,
            phoneNumber: formData.phoneNumber,
            gothram: formData.gothram,
            dob: formData.dob,
          };

          const donateResponse = await axios.post(
            "https://templeservice.signaturecutz.in/donate/api/create-donate-number",
            donateData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (donateResponse.status === 200) {
            localStorage.setItem("donateNumber", inputNumber);
            const updatedUser = { ...storedUser, donateNumber: inputNumber };
            const updateFormData = new FormData();
            updateFormData.append("id", storedUser.id);
            updateFormData.append("donateNumber", inputNumber);

            const updateResponse = await axios.patch(
              "https://templeservice.signaturecutz.in/user/user-update",
              updateFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (updateResponse.status === 200) {
              localStorage.setItem("userData", JSON.stringify(updatedUser));
              setUser(updatedUser);
              window.location.reload();;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error submitting payment:", error?.response || error);
      alert("There was an issue with the payment. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleModal1Open = () => setOpenModal1(true);
  const handleModal1Close = () => setOpenModal1(false);
  const handleModal2Open = () => setOpenModal2(true);
  const handleModal2Close = () => setOpenModal2(false);

  const handleNext = () => {
    handleModal1Close();
    handleModal2Open();
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Amount:", donationAmount);
    console.log("Uploaded File:", file);

    // Reset
    setDonationAmount("");
    setFile(null);
    handleModal2Close();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        color: "white",
        px: 4,
        py: 4,
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={lingamvideo}
          alt="Temple"
          sx={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "75%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}
          >
            Donate Now
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "800px", mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and
            infinite power.
          </Typography>
        </Box>
      </Box>

      <Box
      sx={{
        height: { xs: "800px", sm: "800px", md: "800px", lg: "1000px" },
        // backgroundColor:"whitesmoke",
        
        overflow: "hidden",
        width: "100%",
      }}
    >
    <Canvas
  style={{ width: "100%", height: "100%" }}
  camera={{ position: [0, 1, 3.2], fov: 50 }}
  shadows // Enable shadow map on Canvas
>
  <ambientLight intensity={0.3} />
  <directionalLight
    position={[5, 5, 5]}
    intensity={1.5}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
    shadow-camera-near={0.5}
    shadow-camera-far={20}
    shadow-camera-left={-5}
    shadow-camera-right={5}
    shadow-camera-top={5}
    shadow-camera-bottom={-5}
  />
  
  <ObjModel
    path="/models/L1.obj"
    color="white"
    scale={isMobile ? [3, 3, 3] : [5, 5, 5]}
    castShadow // This object will cast shadow
    receiveShadow // This object will also receive shadows (optional)
  />

  {/* Add a plane to catch the shadow */}
  <mesh
    rotation-x={-Math.PI / 2}
    position={[0, -1, 0]}
    receiveShadow
  >
    <planeGeometry args={[100, 100]} />
    <shadowMaterial opacity={0.3} />
  </mesh>

  <OrbitControls
    minDistance={1}
    maxDistance={10}
    enablePan={false}
    enableZoom={false}
  />
</Canvas>

    </Box>

      {/* <ModelViewer modelPath="/models/L.obj" /> */}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleModal1Open}
          disabled={hasDonationNumber}
          sx={{
            mt: 2,
            bgcolor: hasDonationNumber ? "red" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: hasDonationNumber ? "darkred" : "primary.dark",
            },
            "&.Mui-disabled": {
              bgcolor: "red",
              color: "white",
            },
          }}
        >
          {hasDonationNumber ? "Already Donated" : "Donate now"}
        </Button>
      </Box>

      {/* {hasDonationNumber && (
        <Typography sx={{ color: "red", textAlign: "center", mt: 2 }}>
          You have already booked a donation number. You cannot book again.
        </Typography>
      )} */}

      {/* ✅ Show number status outside the modal */}
      {inputNumber && (
        <>
          {isNumberValid === false && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <img
                  src={lingam}
                  alt="Not Available"
                  width={300}
                  height={300}
                />
                <Typography sx={{ color: "red" }}>
                  The number {inputNumber} is not available. Please try another
                  one.
                </Typography>
              </Box>
              <Button variant="contained" color="error" sx={{ mt: 1 }}>
                ❌ Not Available
              </Button>
            </Box>
          )}
        </>
      )}

      {/* 🔍 Modal 1: Input Number */}
      <Dialog
        open={openModal1}
        onClose={handleModal1Close}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search Number</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Number"
            type="text" // <- important change!
            value={inputNumber}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only positive numbers (no leading zero unless "0")
              if (value === "" || /^[1-9]\d*$/.test(value)) {
                setInputNumber(value);
              }
            }}
            fullWidth
            inputProps={{
              inputMode: "numeric",
              pattern: "[1-9][0-9]*",
            }}
          />

          <Button
            variant="outlined"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("Please log in first.");
                  return;
                }

                const response = await axios.post(
                  "https://templeservice.signaturecutz.in/donate/api/check-number",
                  { number: parseInt(inputNumber) },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                const { isDonateNumber, isBlockedNumber } = response.data.data;

                // Available only if both are false
                if (!isDonateNumber && !isBlockedNumber) {
                  setIsNumberValid(true);
                } else {
                  setIsNumberValid(false);
                }
              } catch (error) {
                console.error("Error checking number:", error);
                alert("Error checking number. Please try again.");
                setIsNumberValid(false);
              }
            }}
            sx={{ mt: 2 }}
          >
            🔍 Search
          </Button>

          {/* ✅ Available - Inside Modal */}
          {isNumberValid === true && (
            <>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <img src={lingam} alt="Available" width={300} height={300} />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "16px", // reduce font size slightly for longer numbers
                    borderRadius: "50%",
                    backgroundColor: "#4c4646",
                    padding: "20px",
                    minHeight: "40px",
                    minWidth: "40px",
                    width: "fit-content", // allow width to expand
                    height: "fit-content",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    aspectRatio: "1 / 1", // keep it circular
                    wordBreak: "break-word", // handle large numbers
                    whiteSpace: "normal", // allow wrapping if needed
                  }}
                >
                  {inputNumber}
                </Typography>

                <Box>
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "18px 26px",
                      borderRadius: "4px",
                      cursor: "default",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    Available
                  </button>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    handleModal1Close();
                    setOpenFormModal(true);
                  }}
                >
                  Donate Now
                </Button>
              </Box>
            </>
          )}

          {/* ❌ Not Available - Inside Modal */}
          {isNumberValid === false && (
            <>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <img
                  src={lingam}
                  alt="Not Available"
                  width={300}
                  height={300}
                />
                <Typography sx={{ color: "red" }}>
                  This number is not available. Try another.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ ml: "auto" }}
                >
                  Booked
                </Button>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setInputNumber("");
                  setIsNumberValid(null);
                }}
                sx={{ mt: 2 }}
              >
                Search Again
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal 2: Upload File and Submit */}
      <Box
        sx={{
          backgroundColor: "#0d1117",
          // minHeight: "100vh",
          color: "white",
          px: 4,
          py: 4,
        }}
      >
        {/* Show success message after successful donation */}
        {successMessage && (
          <Typography sx={{ color: "green", textAlign: "center", mt: 2 }}>
            {successMessage}
          </Typography>
        )}

        {/* Modal for Filling Details */}
        <Dialog
          open={openFormModal}
          onClose={() => setOpenFormModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Fill Your Details</DialogTitle>
          <DialogContent>
            <form
              // onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <TextField
                label="donation number"
                value={inputNumber}
                fullWidth
                disabled
              />
              <TextField
                label="Name"
                value={formData.userName}
                fullWidth
                required
                disabled
              />
              <TextField
                label="Phone"
                value={formData.phoneNumber}
                // onChange={(e) =>
                //   setFormData({ ...formData, phoneNumber: e.target.value })
                // }
                fullWidth
                required
                disabled
              />

              <TextField
                label="DOB"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                // onChange={(e) =>
                //   setFormData({ ...formData, dob: e.target.value })
                // }
                fullWidth
                required
                disabled
              />

              <TextField
                label="gothram"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={formData.gothram}
                // onChange={(e) =>
                //   setFormData({ ...formData, gothram: e.target.value })
                // }
                fullWidth
                required
                disabled
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Simple form validation
                  if (
                    !formData.userName ||
                    !formData.phoneNumber ||
                    !formData.dob ||
                    !formData.gothram
                  ) {
                    alert(
                      "Please fill in all the fields before proceeding to payment."
                    );
                    return;
                  }

                  setOpenFormModal(false); // close the form modal
                  setShowPaymentImage(true); // open payment modal
                }}
              >
                Payment
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success payment image */}
        {showPaymentImage && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <img
              src="PhonePayImage.png"
              alt="Payment"
              style={{ width: "70%" }}
            />
          </Box>
        )}
      </Box>
      <Dialog
        open={showPaymentImage}
        onClose={() => setShowPaymentImage(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Scan to Pay</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <img
              src={PhonePayImage}
              alt="Payment"
              style={{ width: "70%", marginTop: "1rem" }}
            />
            <Typography
              variant="h6"
              sx={{ mt: 2 }}
              style={{ fontFamily: "fantasy" }}
            >
              Amount: ₹{donationAmount}
            </Typography>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile); // Save to state
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFilePreview(reader.result); // Set the preview URL
                  };
                  reader.readAsDataURL(selectedFile); // Read the file as a data URL
                }
              }}
              style={{ display: "none" }}
              id="file-upload"
            />

            {filePreview && (
              <Box sx={{ marginTop: "10px", textAlign: "center" }}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={filePreview}
                    alt="Payment Preview"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                ) : file.type === "application/pdf" ? (
                  <iframe
                    src={filePreview}
                    title="Payment PDF Preview"
                    style={{ width: "100%", height: "300px" }}
                  />
                ) : null}
              </Box>
            )}

            {/* Visible label button to trigger file input */}
            <label htmlFor="file-upload">
              <Button variant="contained" color="primary" component="span">
                Upload File
              </Button>
            </label>

            {file && (
              <div style={{ marginTop: "10px" }}>
                <strong>Selected File:</strong> {file.name}
              </div>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              disabled={!file || loading}
              sx={{
                backgroundColor: "green !important",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#2e7d32 !important",
                },
              }}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {successMessage}
              </Alert>
            )}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* 3d  */}

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default RegisterBanner;
