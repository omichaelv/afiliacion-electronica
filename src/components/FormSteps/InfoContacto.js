import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";
import logo from '../../logo.svg'


function InfoContacto({ onNext }) {

  const [direccion, setDireccion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [pais, setPais] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  

  const handleDepartamentoChange = (event) => {
    setDepartamento(event.target.value);
  };
  const handleMunicipioChange = (event) => {
    setMunicipio(event.target.value);
  };
  const handlePaisChange = (event) => {
    setPais(event.target.value);
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
          </Box>
          <Typography align="center" variant="h6" sx={{ml:-8}} style={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      
      <Box>
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ mt: 15 }}
        >
          Información de Contacto
        </Typography>

        <Box sx={{m:1}} >
        <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Dirección" multiline rows={2} value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="Departamento">Departamento</InputLabel>
                        <Select required id="Departamento" label="Departamento" style={{ backgroundColor: 'white' }} value={departamento} onChange={handleDepartamentoChange}>
                            <MenuItem value="x">Datos</MenuItem>
                            <MenuItem value="xx">Datos</MenuItem>
                        </Select>
         </FormControl>
         <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="Municipio">Municipio</InputLabel>
                        <Select required id="Municipio" label="Municipio" style={{ backgroundColor: 'white' }} value={municipio} onChange={handleMunicipioChange}>
                            <MenuItem value="x">Datos</MenuItem>
                            <MenuItem value="xx">Datos</MenuItem>
                        </Select>
         </FormControl>
         <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="Municipio">Pais de Residencia</InputLabel>
                        <Select required id="Municipio" label="Municipio" style={{ backgroundColor: 'white' }} value={pais} onChange={handlePaisChange}>
                            <MenuItem value="x">Datos</MenuItem>
                            <MenuItem value="xx">Datos</MenuItem>
                        </Select>
         </FormControl>
         <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
         <TextField required type="email" style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
         




        <Box align="center">
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ display: "block", mt: 3 }}
          >
            Continuar
          </Button>
        </Box>
        </Box>
       
      </Box>
      
    </Box>
  );
}

export default InfoContacto;
