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
  Snackbar 
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LightMode from "@mui/icons-material/LightMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../../logo.svg";
import id from "../../../resources/id.png";

function IntroInfo() {

    return (
        <Box>
<Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}
        sx={{ mt: 2 }}
      >
        <img src={id} className="id-foto" alt="id" />
      </Typography>

      <Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}
        sx={{ mt: 2 }}
      >
        Identificación Digital
      </Typography>
      <Box
        align="center"
        sx={{
          mx: { xs: 1, lg: 2 }, // Horizontal margin: 1 on xs, 3 on md and up
        }}
      >
        <Typography
          variant="body2"
          align="center"
          color={"white"}
          sx={{
            my: { xs: 1, lg: 2 }, // Vertical margin: 1 on xs (mobile), 2 on md (desktop) and up
            mx: { xs: 1, lg: 2 }, // Horizontal margin: 1 on xs, 3 on md and up
          }}
        >
          A través del proceso de identificación digital podrás hacer un
          mejor uso de nuestros canales digitales.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={"white"}
          gutterBottom
        >
          Para este proceso requerirás:
        </Typography>
      </Box>
      <Box align="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          sx={{ mt: 2, mx: 2 }}
          gutterBottom
        >
          <CreditCardIcon color={"white"} />
          <Typography
            variant="body2"
            align="justify"
            color={"white"}
            sx={{ ml: 1 }}
            gutterBottom
          >
            DUI legible y en buenas condiciones
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          sx={{ mt: 2, mx: 2 }}
          gutterBottom
        >
          <LightMode color={"white"} />
          <Typography
            variant="body2"
            align="justify"
            sx={{ ml: 1 }}
            color={"white"}
            gutterBottom
          >
            Buena iluminación para captura de documento y toma de
            autorretrato
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body2"
        align="center"
        color={"white"}
        sx={{ my: 2 }}
      >
        Este trámite es personal y debe ser realizado únicamente por el
        titular. Aplica solo para salvadoreños.
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color={"white"}
        sx={{ my: 2 }}
      >
        Toma en cuenta: Este servicio podrás realizarlo únicamente a
        través de dispositivos móviles.
      </Typography> 
        </Box>
        
    );
}
export default IntroInfo;