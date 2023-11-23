import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  Paper,
  FormControlLabel,
  TextField
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import logo from '../../logo.svg'

function Peps({ onNext }) {

  const [pepsDocumentoAyuda, setDocumentoAyudal] = useState(false);
  const [pepsPersonal, setpepsPersonal] = useState(null);
  const [pepsFamiliar, setpepsFamiliar] = useState(null);
  const [esPeps, setesPeps] = useState("No");
  const [datosPepsObtenidos, setdatosPepsObtenidos] = useState("");

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");


  const handlePepsPersonal = (event) => {
    setpepsPersonal(event.target.value);
  };
  const handlePepsFamiliar = (event) => {
    setpepsFamiliar(event.target.value);
  };
  const handleEnviarDatos = (event) => {
    setdatosPepsObtenidos("Si");
  };

  const verificarEsPeps = () => {
    if(pepsPersonal === "Si" || pepsFamiliar === "Si"){
        setesPeps("Si");
    } else{
        handleNext();
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        display: "flex", 
        flexDirection: "column", 
        width: "100%", 
        minHeight: "100vh", 
        overflow: "auto", 
      }}
      style={{objectFit: 'contain'}}
    >
      <AppBar
        className="app-bar"
        position="static"
        sx={{ backgroundColor: "#00284E" }}
      >
        
        <Toolbar>
          <Box align="left">
            <Button
              startIcon={<InfoIcon />}
              sx={{ color: "white" }}
              onClick={() => setDocumentoAyudal(true)}
            ></Button>
          </Box>
          <Typography align="center" variant="h6" sx={{ml:-8}} style={{ flexGrow: 1 }}>
          <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      {esPeps !== "Si" && (
      <Box>
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ mt: 15 }}
        >
          Persona Políticamente Expuesta (PEPs)
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          1. ¿Desempeña o ha desempeñado algún cargo como Persona Expuesta
          Políticamente?
        </Typography>
        <RadioGroup
          value={pepsPersonal}
          onChange={handlePepsPersonal}
          sx={{ my: 1, ml: 2, mr: 2 }}
        >
          <Paper
            style={{ backgroundColor: "white" }}
            elevation={3}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="Si"
              control={<Radio color="primary" />}
              label={
                <Box>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Si
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper style={{ backgroundColor: "white" }} elevation={3}>
            <FormControlLabel
              value="No"
              control={<Radio color="primary" />}
              label={
                <Box style={{ width: "100%" }}>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    No
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>

        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          2. ¿Tiene un familiar que ocupe o ha ocupado un cargo como Persona
          Expuesta Políticamente?
        </Typography>
        <RadioGroup
          value={pepsFamiliar}
          onChange={handlePepsFamiliar}
          sx={{ my: 1, ml: 2, mr: 2 }}
        >
          <Paper
            style={{ backgroundColor: "white" }}
            elevation={3}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="Si"
              control={<Radio color="primary" />}
              label={
                <Box>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Si
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper style={{ backgroundColor: "white" }} elevation={3}>
            <FormControlLabel
              value="No"
              control={<Radio color="primary" />}
              label={
                <Box style={{ width: "100%" }}>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    No
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>

        <Box align="center">
          <Button
            variant="contained"
            onClick={verificarEsPeps}
            sx={{ display: "block", mt: 3 }}
          >
            Continuar
          </Button>
        </Box>
      </Box>
      )}
    {esPeps === "Si" && datosPepsObtenidos !== "Si" &&(
        <Box style={{objectFit: 'contain'}}>
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ mt: 15 }}
        >
          En este momento no podemos completar el proceso.
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          Por favor déjanos tu información de contacto para que un asesor se pueda poner en contacto durante las próximas horas.
        </Typography>

        <Box align="center" style={{objectFit: 'contain'}} sx={{mx:2}} >
          <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} sx={{ mt: 1}}/>
          <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}sx={{ mt: 1 }} />
          <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} sx={{ mt: 1 }} />
        </Box>
        <Box align="center" sx={{mx:2}}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleEnviarDatos}
            sx={{ display: "block", mt: 3 }}
          >
            Enviar Datos
          </Button>
        </Box>
      </Box>
    )}

    {datosPepsObtenidos === "Si" && (
        <Box>
        <Typography
          variant="body4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mt: 15 }}
        >
          Pronto te contactaremos.
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          Un asesor te conectará para terminar la afiliación. Mantente pendiente de tu correo y teléfono.
        </Typography>
        

        <Box align="center" sx={{mx:2}} >
          <Button
            fullWidth
            variant="contained"
            onClick={handleEnviarDatos}
            sx={{ display: "block", mt: 3 }}
          >
            Llenar Encuesta
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleEnviarDatos}
            sx={{ display: "block", mt: 3 }}
          >
            Salir
          </Button>
        </Box>
      </Box>
    )}

    </Box>
  );
}

export default Peps;
