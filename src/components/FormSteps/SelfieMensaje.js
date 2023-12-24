import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, Grid } from "@mui/material";
import logo from "../../logo.svg";
import SelfieInstrucciones from "./shared/SelfieInstrucciones";

function SelfieMensaje({ onNext }) {
  const handleNext = () => {
    // Pass the state to the parent component or handle the transition
    onNext();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <AppBar
        className="app-bar"
        position="static"
        sx={{ backgroundColor: "#00284E" }}
      >
        <Toolbar>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

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
            <SelfieInstrucciones />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            sx={{ bgcolor: { lg: "white" }, mb: { xs: 5, lg: 0 } }}
          >
            <Box align="center" sx={{ mx: 2, maxWidth:{lg:"50%"} }}>
            <Typography
                variant="body2"
                sx={{
                  color: { xs: "white", md: "white", lg: "black" },
                  fontSize: { lg: "35px" },
                  fontWeight: { lg: "bold" },
                  ml: { lg: 2 },
                  mb: 1,
                  mt:5,
                  display: { xs: "none", md: "none", lg: "block" },
                }}
              >
                Continúa a tomar la fotografía
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                sx={{ display: "block", mt: 3, maxWidth:{lg:"40%"} }}
              >
                Continuar
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleNext}
                sx={{ display: "block", mt: 3, backgroundColor: "white", maxWidth:{lg:"40%"} }}
              >
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SelfieMensaje;
