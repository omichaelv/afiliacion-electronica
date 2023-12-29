import React, { useState, useEffect } from "react";
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
  TextField,
  Autocomplete,
  Grid,
  Snackbar
} from "@mui/material";
import logo from '../../logo.svg'
import fetchCountries from "../../services/PaisesService";
import fetchDepartments from "../../services/DepartamentoService";
import fetchMunicipalities from "../../services/MunicipiosService";


function InfoContacto({ onNext, onDataContacto }) {

  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  
  

  const handleNext = () => {
    let resideEnSalvador = "No";
    if(selectedCountry.nombre.toUpperCase() === "EL SALVADOR"){
      resideEnSalvador = "Si";
    }
    const dataContacto = {
      pais:selectedCountry,
      departamento:selectedDepartment || "",
      municipio: selectedMunicipality || "",
      direccion: direccion,
      celular: celular,
      correo: correo,
      residenEnSalvador: resideEnSalvador
    }
    onDataContacto(dataContacto);
    onNext();
  };

  //Servicios

  //DropDowns

  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries()
      .then((response) => setCountries(response.paises))
      .catch((error) => console.error("Failed to fetch countries:", error));
  }, []);

  // Fetch departments when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetchDepartments(selectedCountry.codPais)
        .then((response) => setDepartments(response.departamentos))
        .catch((error) => console.error("Failed to fetch departments:", error));

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
          <Box align="left">
          </Box>
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
        

        <Box sx={{m:1, textAlign:"center", alignContent:"center", align:"center"}} >
        
        
        <Box sx={{ minWidth: 120, maxWidth:{lg:"50%"},  }}>
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ 
            mt: 15,
            fontSize: { lg: "30px" },
            fontWeight: { lg: "bold" },
          
          }}
        >
          Información de Contacto
        </Typography>
        <TextField required style={{ backgroundColor: 'white' }} fullWidth margin="normal" label="Dirección" multiline rows={2} value={direccion} onChange={(e) => setDireccion(e.target.value)} />

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

                </Box>
        
         
         




        <Box align="center" sx={{maxWidth:{lg:"50%"}}} >
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
        </Grid>

      </Grid>

      
      
      
    </Box>
  );
}

export default InfoContacto;
