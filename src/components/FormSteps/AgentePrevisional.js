import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  FormGroup,
  TextField,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LightMode from "@mui/icons-material/LightMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AgentePrevisional({ onNext, onAdvisorCodeChange }) {
  const [codigoAsesor, setcodigoAsesor] = useState("");
  const [usarCodigoAsesor, setusarCodigoAsesor] = useState("");

  const handleNext = () => {
    
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
            Logo
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography
        variant="body4"
        component="h3"
        gutterBottom
        align="center"
        color={"white"}
        sx={{ mt: 15 }}
      >
        Identificación Digital
      </Typography>
      <Typography variant="body2" align="center" color={"white"} sx={{ my: 2 }}>
        A través del proceso de identificación digital podrás hacer un mejor uso
        de nuestros canales digitales.
      </Typography>
      <Typography variant="body2" align="center" color={"white"} gutterBottom>
        Para este proceso requerirás:
      </Typography>

      <Typography variant="body2" align="center" color={"white"} gutterBottom>
        <CreditCardIcon color={"white"} /> DUI legible y en buenas condiciones
      </Typography>
      <Typography variant="body2" align="center" color={"white"} gutterBottom>
        <LightMode color={"white"} /> Buena iluminación para captura de
        documento y toma de autorretrato
      </Typography>
      <Typography variant="body2" align="center" color={"white"} sx={{ my: 2 }}>
        Este trámite es personal y debe ser realizado únicamente por el titular.
        Aplica solo para salvadoreños.
      </Typography>
      <Typography variant="body2" align="center" color={"white"} sx={{ my: 2 }}>
        Toma en cuenta: Este servicio podrás realizarlo únicamente a través de
        dispositivos móviles.
      </Typography>
      <Typography variant="body2" align="center" color={"white"} sx={{ my: 2 }}>
        ¿Estás siendo atendido por un agente previsional?
      </Typography>

      {usarCodigoAsesor !== "Si" && (
        <Box align="center">
          <Button
            variant="contained"
            onClick={() => setusarCodigoAsesor("Si")}
            sx={{ mr: 1 }}
          >
            Sí
          </Button>
          <Button variant="contained" onClick={handleNext}>
            No
          </Button>
        </Box>
      )}

      {usarCodigoAsesor === "Si" && (
        <Box align="center">
          <Typography
            variant="body2"
            align="center"
            color={"white"}
            sx={{ my: 2 , ml:5}}
          >
            Pídele al asesor que ingrese su código
          </Typography>
          <FormGroup>
            <TextField
              required
              style={{ backgroundColor: "white" }}
              sx={{ margin: 1, mx:2 }}
              margin="normal"
              label="Codigo de asesor"
              placeholder="Ej. 107885445"
              value={codigoAsesor}
              onChange={(e) => setcodigoAsesor(e.target.value)}
            />
          </FormGroup>
          <Box align="center" sx={{ mx:2}}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3 }}
          >
            Continuar
          </Button>
          </Box>
          
        </Box>
      )}
    </Box>
  );
}

export default AgentePrevisional;
