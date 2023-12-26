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
  Autocomplete
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
        
        <Box sx={{ minWidth: 120 }}>
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
                </Box>
        
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
