import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  FormGroup,
  TextField,
  InputLabel,
  Grid,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../logo.svg";
import getAgenteDetails from "../../services/AgenteService";
import IntroInfo from "./shared/IntroInfo";
import HeadphonesIcon from "@mui/icons-material/Headphones";

function AgentePrevisional({ onNext, onAgenteDetailsFetched }) {
  const [codigoAsesor, setcodigoAsesor] = useState("");
  const [usarCodigoAsesor, setusarCodigoAsesor] = useState("");

  //Notification
  const [open, setOpen] = useState(false);
  const [mensajeNoti, setMensaje] = useState("");
  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMensaje("");
    setOpen(false);
  };

  //Service

  const handleGetAgenteDetails = async () => {
    try {
      console.log(codigoAsesor);
      const agenteDetails = await getAgenteDetails(codigoAsesor);
      if (agenteDetails.success) {
        onAgenteDetailsFetched(agenteDetails);
        handleNext(); // proceed to the next step
      } else {
        // handle error, show message, etc.
        setMensaje(agenteDetails.mensaje);
        setOpen(true);
        console.error(agenteDetails.mensaje);
      }
    } catch (error) {
      setMensaje("Error comunicandose con el servidor");
      setOpen(true);
      console.error("Error comunicandose con el servidor: ", error);
      // handle error, e.g., show an alert or set an error state
    }
  };

  const handleNo = () => {
    onAgenteDetailsFetched(null);
    onNext();
  };
  const handleNext = () => {
    onNext();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <AppBar
        className="app-bar"
        position="static"
        sx={{ backgroundColor: "#00284E" }}
      >
        {/* Remove the Container component */}
        <Toolbar>
          {usarCodigoAsesor === "Si" && (
            <Box align="left">
              <Button
                startIcon={<ArrowBackIcon />}
                sx={{ color: "white" }}
                onClick={() => setusarCodigoAsesor("No")}
              ></Button>
            </Box>
          )}
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseNoti}
        message={mensajeNoti}
        action={
          <Button color="secondary" size="small" onClick={handleCloseNoti}>
            DESCARTAR
          </Button>
        }
      />

      <Box sx={{ bgcolor: "#00559c" }}>
        <Grid
          container
          spacing={0}
          sx={
            {
              // Horizontal margin: 1 on xs, 3 on md and up
            }
          }
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            sx={{ bgcolor: { md: "#00559c", lg: "#00559c" } }}
          >
            <IntroInfo />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            sx={{ bgcolor: { lg: "white" }, mb: { xs: 5, lg: 0 } }}
          >
            {" "}
            {/* 100% on mobile, 25% on desktop */}
            <Box
              sx={{
                textAlign: { xs: "center", md: "center", lg: "left" },
              }}
            >
              <HeadphonesIcon
                color={"black"}
                sx={{
                  fontSize: { lg: "200px" },
                  alignText: { lg: "center" },
                  display: { xs: "none", md: "none", lg: "block" },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: { xs: "white", md: "white", lg: "black" },
                  fontSize: { lg: "35px" },
                  fontWeight: { lg: "bold" },
                  ml: { lg: 2 },
                  mb: 1
                }}
              >
                ¿Estás siendo atendido por un agente previsional?
              </Typography>
              {usarCodigoAsesor !== "Si" && (
                <Box
                  sx={{
                    textAlign: { xs: "center", md: "center", lg: "left" },
                    ml: { lg: 13 },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setusarCodigoAsesor("Si")}
                    sx={{
                      mr: 1,
                      fontSize: { lg: "30px" },
                      width: { sx: "80px", md: "80px", lg: "100px" },
                      height: { sx: "40px", md: "40px", lg: "50px" },
                    }}
                  >
                    Sí
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNo}
                    sx={{
                      fontSize: { lg: "30px" },
                      width: { sx: "80px", md: "80px", lg: "100px" },
                      height: { sx: "40px", md: "40px", lg: "50px" },
                    }}
                  >
                    No
                  </Button>
                </Box>
              )}
              {usarCodigoAsesor === "Si" && (
                <Box>
                  <Typography
                    variant="body2"
                    color={"white"}
                    sx={{
                      mt: 2,
                      color: { xs: "white", md: "white", lg: "black" },
                      fontSize: { lg: "35px" },
                      fontWeight: { lg: "bold" },
                      ml: { lg: 2 },
                    }}
                  >
                    Pídele al asesor que ingrese su código
                  </Typography>
                  <FormGroup>
                    <InputLabel
                      sx={{
                        ml: 2,
                        fontSize: { lg: "25px" },
                        color: { xs: "white", md: "white", lg: "black" },
                        alignText: { xs: "left", md: "left", lg: "left" },
                        mt: 1,
                      }}
                      htmlFor="codigoAsesor"
                    >
                      Código de Asesor
                    </InputLabel>
                    <TextField
                      required
                      style={{ backgroundColor: "white" }}
                      sx={{
                        margin: 1,
                        mx: 2,
                        width: { lg: "500px" },
                        height: { lg: "40px" },
                      }}
                      margin="normal"
                      id="codigoAsesor"
                      placeholder="Ej. 107885445"
                      value={codigoAsesor}
                      onChange={(e) => setcodigoAsesor(e.target.value)}
                    />
                  </FormGroup>
                  <Box
                    sx={{
                      mx: 2,
                      align: "left",
                      alignText: { sx: "center", md: "center", lg: "left" },
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleGetAgenteDetails}
                      sx={{
                        mt: 3,
                        width: { lg: "500px" },
                        height: { lg: "40px" },
                        fontSize: { lg: "20px" },
                        fontWeight: { lg: "bold" },
                      }}
                    >
                      Continuar
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AgentePrevisional;
