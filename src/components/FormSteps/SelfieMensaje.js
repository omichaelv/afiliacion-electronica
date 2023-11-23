import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LightMode from "@mui/icons-material/LightMode";
import logo from '../../logo.svg'
import phone from '../../resources/phone.png'

function SelfieMensaje({ onNext }) {


  const handleNext = () => {
    // Pass the state to the parent component or handle the transition
    onNext();
  };

  return (
    <Box
      sx={{
        bgcolor: "#00559c",
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


      <Box align="center">
      <Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}
        sx={{ mt: 5,display: "block" }}
      >
        <img src={phone} className="App-logo" alt="logo" />
        <br></br> Preparate Para Tomarte Una Fotografia
      </Typography>
      </Box>
      
      <Box align="center">
      <Box display="flex" justifyContent="center" alignItems="center" color="white" sx={{mt:2, mx:2}} gutterBottom>
        <CreditCardIcon />
        <Typography variant="body2" align="justify" sx={{ ml: 1 }}>
          Colocate en un lugar con luz adecuada para capturar bien tu rostro.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" color="white" sx={{mt:2, mx:2}} gutterBottom>
        <LightMode />
        <Typography variant="body2" align="justify" sx={{ ml: 1 }}>
          Asegúrate que tu rostro se encuentre completamente descubierto: no uses lentes, gorra o accesorios que puedan cubrirte.
        </Typography>
      </Box>
      <Box align="center" sx={{mx:2}} >
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ display: "block", mt: 3 }}
          >
            Continuar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleNext}
            sx={{ display: "block", mt: 3, backgroundColor:"white" }}
          >
            Cancelar
          </Button>
        </Box>

      </Box>
      
      
 

    </Box>
  );
}

export default SelfieMensaje;
