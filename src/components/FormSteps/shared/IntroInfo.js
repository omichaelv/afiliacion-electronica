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
        <Box sx={{
          bgcolor: "#00559c",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          
          height:"100%",
          overflow: "auto",
        }}>
<Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}

      >
        <img src={id} className="id-foto" alt="id" />
      </Typography>

      <Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}
        sx={{ mt: 2, fontSize: { md: "25px" ,lg: "35px" } }}
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
            fontSize: { md: "18px" ,lg: "20px" } 
          }}
        >
          A través del proceso de identificación digital podrás hacer un
          mejor uso de nuestros canales digitales.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={"white"}
          sx={{
            fontSize: { md: "18px" ,lg: "20px" } 
          }}
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
          sx={{ mt: 2, mx: 2,fontSize: { md: "15px" ,lg: "18px" }  }}
          gutterBottom
        >
          <CreditCardIcon color={"white"} />
          <Typography
            variant="body2"
            align="justify"
            color={"white"}
            sx={{ ml: 1, fontSize: { md: "15px" ,lg: "18px" }  }}
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
          sx={{ mt: 2, mx: 2,  }}
          gutterBottom
        >
          <LightMode color={"white"} />
          <Typography
            variant="body2"
            align="justify"
            sx={{ ml: 1, maxWidth: {xs:"80%", md:"80%", lg:"50%"}, fontSize: { md: "15px" ,lg: "18px" } }}
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
        sx={{ my: 2 , fontSize: { md: "15px" ,lg: "18px" }}}
      >
        Este trámite es personal y debe ser realizado únicamente por el
        titular. Aplica solo para salvadoreños.
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color={"white"}
        sx={{ my: 2, mb:4, fontSize: { md: "15px" ,lg: "18px" } }}
      >
        Toma en cuenta: Este servicio podrás realizarlo únicamente a
        través de dispositivos móviles.
      </Typography> 
        </Box>
        
    );
}
export default IntroInfo;