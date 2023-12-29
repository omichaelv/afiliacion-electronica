import React, { useState,useEffect } from "react";
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
  MenuItem,
  Grid,
  Snackbar,
  Autocomplete
} from "@mui/material";
import logo from '../../logo.svg'
import PeopleIcon from "@mui/icons-material/People";
import fetchCountries from "../../services/PaisesService";
import fetchDepartments from "../../services/DepartamentoService";
import fetchMunicipalities from "../../services/MunicipiosService";

function InfoLaboral({ onNext, onDataEmpleador }) {

  
  const [tipoTrabajador, settipoTrabajador] = useState("");
  const [conoceInfoEmpleador, setConoceInfoEmpleador] = useState("No");
  const [confirmacion, setConfirmacion] = useState("");
  const [isss, setISSS] = useState("");
  const [actividadEconomica, setActividadEconomica] = useState("");
  
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

  const handleConoceInfoEmpleador = async (value) => {

    await setConoceInfoEmpleador(value);

    if(tipoTrabajador === "Dependiente" && value === "Si"){

      fetchCountries()
      .then((response) => setCountries(response.paises))
      .catch((error) => {
        setMensaje("Problemas con el servidor consultando la información");
        setOpen(true);
        });
    }
  };


  const verificarDatos = () => {
    const dataEmpleadorDependiente = {
      tipoTrabajador: tipoTrabajador,
      conoceInfoEmpleador: conoceInfoEmpleador,
      nit: nit,
      pais: selectedCountry,
      departamento: selectedDepartment,
      municipio: selectedMunicipality,
      celular: celular,
      correo: correo,
      fechaDeInicio: fechaInicioLabores,
      isss: isss,
      actividadEconomica: actividadEconomica
    }
    onDataEmpleador(dataEmpleadorDependiente);
    handleNext();
  };

  const handleNext = () => {
    onNext();
  };

  //Service

  //DropDowns

  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  // Fetch countries on component mount
  useEffect(() => {
    if(tipoTrabajador === "Dependiente" && conoceInfoEmpleador === "Si"){
      fetchCountries()
      .then((response) => setCountries(response.paises))
      .catch((error) =>{ 
        console.error("Failed to fetch countries:", error);
        setMensaje("Problemas con el servidor consultando la información");
        setOpen(true);
      });
    }
    
  }, []);

  // Fetch departments when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetchDepartments(selectedCountry.codPais)
        .then((response) => setDepartments(response.departamentos))
        .catch((error) => {
          setMensaje("Problemas con el servidor consultando la información");
          setOpen(true);
          console.error("Failed to fetch departments:", error);
        });

      // Reset departments and municipalities when country changes
      setSelectedDepartment(null);
      setMunicipalities([]);
      setSelectedMunicipality(null);
    }
  }, [selectedCountry]);

  // Fetch municipalities when a department is selected
  useEffect(() => {
    if (selectedCountry && selectedDepartment) {
      fetchMunicipalities(
        selectedCountry.codPais,
        selectedDepartment.codDepartamento
      )
        .then((response) => setMunicipalities(response.municipios))
        .catch((error) =>
          console.error("Failed to fetch municipalities:", error)
        );
    }
  }, [selectedCountry, selectedDepartment]);
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

  return (
    <Box
      sx={{
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
          sx={{
            bgcolor: { md: "#00559c", lg: "#00559c" },
            display: { xs: "none", md: "none", lg: "block" },
          }}
        >
          
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={8}
          sx={{ bgcolor: { lg: "white" }, mb: { xs: 5, lg: 0 } }}
        >
<Box>
      <PeopleIcon
            color={"black"}
            sx={{
              fontSize: { lg: "200px" },
              textAlign: "center",
              margin: "auto",
              display: { xs: "none", md: "none", lg: "block" },
            }}
          />
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ mt: 5 }}
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
              <InputLabel htmlFor="conoceInfoEmpleador" sx={{mt:3}}>¿Conoces la información de tu empleador?</InputLabel>
                <FormControl fullWidth margin="normal">
                        
                        <Select required id="conoceInfoEmpleador" label="" style={{ backgroundColor: 'white' }} value={conoceInfoEmpleador} onChange={(e) => handleConoceInfoEmpleador(e.target.value)}>
                            <MenuItem value="Si">Si</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                </FormControl>
            </Box>

            

        )}
        {(tipoTrabajador === "Dependiente" && conoceInfoEmpleador === "Si") &&(
                     <Box  sx={{mx:2}}>
                        <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="NIT" value={nit} onChange={(e) => setNit(e.target.value)} />
                        {/* Country Autocomplete */}
                  <Autocomplete
                    id="country-select"
                    options={countries}
                    getOptionLabel={(option) => option.nombre || ""}
                    value={selectedCountry}
                    onChange={(event, newValue) => {
                      setSelectedCountry(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="País" />
                    )}
                    sx={{ mt: 2 }}
                  />

                  {/* Department Autocomplete */}
                  <Autocomplete
                    id="department-select"
                    options={departments}
                    getOptionLabel={(option) => option.nombreDepartamento || ""}
                    value={selectedDepartment}
                    onChange={(event, newValue) => {
                      setSelectedDepartment(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Departamento" />
                    )}
                    disabled={!selectedCountry}
                    sx={{ mt: 2 }}
                  />

                  {/* Municipality Autocomplete */}
                  <Autocomplete
                    id="municipality-select"
                    options={municipalities}
                    getOptionLabel={(option) => option.nombreMunicipio || ""}
                    value={selectedMunicipality}
                    onChange={(event, newValue) => {
                      setSelectedMunicipality(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Municipio" />
                    )}
                    disabled={!selectedDepartment}
                    sx={{ mt: 2 }}
                  />
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


        <FormControlLabel sx={{ml:2}}
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
      
        </Grid>

      </Grid>
      

      
      
   

    </Box>
  );
}

export default InfoLaboral;
