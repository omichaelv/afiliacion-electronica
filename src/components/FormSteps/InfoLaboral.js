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
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function InfoLaboral({ onNext }) {

  
  const [tipoTrabajador, settipoTrabajador] = useState("");
  const [conoceInfoEmpleador, setConoceInfoEmpleador] = useState("No");
  const [confirmacion, setConfirmacion] = useState("");
  const [isss, setISSS] = useState("");
  const [actividadEconomica, setActividadEconomica] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [pais, setPais] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [nit, setNit] = useState("");
  const [fechaInicioLabores, setFechaInicioLabores] = useState("");
  



  const handletipoTrabajador = (event) => {
    settipoTrabajador(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setConfirmacion(event.target.checked);
  };

  const handleConoceInfoEmpleador = (event) => {
    setConoceInfoEmpleador(event.target.checked);
  };
  const handleDepartamentoChange = (event) => {
    setDepartamento(event.target.value);
  };
  const handleMunicipioChange = (event) => {
    setMunicipio(event.target.value);
  };
  const handlePaisChange = (event) => {
    setPais(event.target.value);
  };

  const verificarDatos = () => {
    handleNext();
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
          <Typography align="center" variant="h6" sx={{ml:-8}} style={{ flexGrow: 1 }}>
            Logo
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
          Información laboral
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          1. ¿Qué tipo de trabajador eres?
        </Typography>
        <RadioGroup
          value={tipoTrabajador}
          onChange={handletipoTrabajador}
          sx={{ my: 1, ml: 2, mr: 2 }}
        >
          <Paper
            style={{ backgroundColor: "white" }}
            elevation={3}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="Dependiente"
              control={<Radio color="primary" />}
              label={
                <Box>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Dependiente
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: "normal" }}>
                    Ej. Tengo un empleo y salario
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper style={{ backgroundColor: "white" }} elevation={3}>
            <FormControlLabel
              value="Independiente"
              control={<Radio color="primary" />}
              label={
                <Box style={{ width: "100%" }}>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Independiente
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: "normal" }}>
                    Ej. Trabajo por mi cuenta
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>
        {tipoTrabajador === "Dependiente" && (
            <Box sx={{mx:2}} >
                <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="conoceInfoEmpleador">¿Conoces la información de tu empleador?</InputLabel>
                        <Select required id="conoceInfoEmpleador" label="" style={{ backgroundColor: 'white' }} value={conoceInfoEmpleador} onChange={(e) => handleConoceInfoEmpleador(e.target.value)}>
                            <MenuItem value="Si">Si</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                </FormControl>
            </Box>

            

        )}
        {(tipoTrabajador === "Dependiente" && conoceInfoEmpleador === "Si") &&(
                     <Box>
                        <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="NIT" value={nit} onChange={(e) => setNit(e.target.value)} />
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
                        <TextField required type="email" style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Fecha de Inicio de Labores con este Empleador" value={fechaInicioLabores} onChange={(e) => setFechaInicioLabores(e.target.value)} />
                    </Box>

        )}
        {tipoTrabajador === "Independiente" && (
            <Box sx={{mx:2}} >
                <Typography
                    variant="body4"
                    component="h3"
                    gutterBottom
                    align="left"
                    sx={{ mt: 15 }}
                >
                    Completa la Información
                </Typography>
                <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Número de ISSS - Opcional" multiline rows={2} value={isss} onChange={(e) => setISSS(e.target.value)} />
                <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Actividad Económica" multiline rows={2} value={actividadEconomica} onChange={(e) => setActividadEconomica(e.target.value)} />
            </Box>

        )}


        <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="Confirmo que he leído y comprendido la declaración, y que los datos son correctos."
        />

        <Box align="justify" sx={{mx:2}} > 
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >Como Afiliado declaro bajo juramento que el movimiento de fondos proyectado mensualmente en mi Cuenta Individual de Ahorro para Pensiones serán acordes con la tasa de cotización establecida en el Art. 16 de la Ley Integral del Sistema de Pensiones.
        </Typography>
        </Box>

        
        

        <Box align="center" sx={{mx:2}} >
          <Button
            fullWidth
            variant="contained"
            onClick={verificarDatos}
            sx={{  mt: 2 }}
          >
            Continuar
          </Button>
        </Box>
      </Box>
      
   

    </Box>
  );
}

export default InfoLaboral;
