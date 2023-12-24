import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LightMode from "@mui/icons-material/LightMode";
import logo from "../../../logo.svg";
import phone from "../../../resources/phone.png";

function SelfieInstrucciones({ onNext }) {
  return (
    <Box
      sx={{
        bgcolor: "#00559c",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        
        overflow: "auto",
      }}
    >
     

      <Box align="center">
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          color={"white"}
          sx={{ mt: 5, display: "block", fontSize: { md: "25px" ,lg: "35px" } }}
        >
          <img src={phone} className="App-logo" alt="logo" />
          <br></br> Preparate Para Tomarte Una Fotografia
        </Typography>
      </Box>

      <Box align="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          sx={{ mt: 2, mx: 2, maxWidth:"60%" }}
          gutterBottom
        >
          <CreditCardIcon />
          <Typography variant="body2" align="justify" sx={{ ml: 1, fontSize: { md: "18px" ,lg: "20px" }  }}>
            Colocate en un lugar con luz adecuada para capturar bien tu rostro.
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          sx={{ mt: 2, mx: 2 , mb:3, maxWidth:"60%"}}
          gutterBottom
        >
          <LightMode />
          <Typography variant="body2" align="justify" sx={{ ml: 1, fontSize: { md: "18px" ,lg: "20px" }  }}>
            Asegúrate que tu rostro se encuentre completamente descubierto: no
            uses lentes, gorra o accesorios que puedan cubrirte.
          </Typography>
        </Box>
        
      </Box>
    </Box>
  );
}

export default SelfieInstrucciones;
