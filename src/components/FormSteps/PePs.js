import React, { useState, useEffect } from "react";
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
  Grid,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../../logo.svg";
import sendNotification from "../../services/NotificationService";
import fetchCountries from "../../services/PaisesService";
import fetchDepartments from "../../services/DepartamentoService";
import fetchMunicipalities from "../../services/MunicipiosService";
import IntroInfo from "./shared/IntroInfo";
import PeopleIcon from "@mui/icons-material/People";

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function Peps({ onNext, onPeps }) {
  const [pepsDocumentoAyuda, setDocumentoAyudal] = useState(false);
  const [pepsPersonal, setpepsPersonal] = useState(null);
  const [pepsFamiliar, setpepsFamiliar] = useState(null);
  const [esPeps, setesPeps] = useState("No");
  const [datosPepsObtenidos, setdatosPepsObtenidos] = useState("");

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [tipoNotificacion, setTipoNotificacion] = useState("");

  // States for input validity
  const [isNombreValid, setIsNombreValid] = useState(false);
  const [isTelefonoValid, setIsTelefonoValid] = useState(false);
  const [isCorreoValid, setIsCorreoValid] = useState(false);

  // Update state on change
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setIsNombreValid(value.trim() !== ""); // Checks if the field is not empty
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    setIsTelefonoValid(value.trim() !== ""); // Checks if the field is not empty
  };

  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setIsCorreoValid(isValidEmail(value)); // Checks if the email is valid
  };

  // Check if all fields are valid
  const isFormValid = () => {
    return (
      isNombreValid &&
      isTelefonoValid &&
      isCorreoValid &&
      selectedCountry &&
      selectedDepartment &&
      selectedMunicipality
    );
  };

  const handlePepsPersonal = (event) => {
    setpepsPersonal(event.target.value);
  };
  const handlePepsFamiliar = (event) => {
    setpepsFamiliar(event.target.value);
  };
  const handleEnviarDatos = (event) => {
    let validState = 1;

    handleEnviarPeps();
  };

  const verificarEsPeps = () => {
    if (pepsPersonal === null || pepsFamiliar === null) {
      setMensaje("Por favor seleccione todas las opciones");
      setOpen(true);
      return;
    }

    if (pepsPersonal === "Si") {
      setTipoNotificacion("1");
      setesPeps("Si");
    }
    if (pepsFamiliar === "Si") {
      setTipoNotificacion("2");
      setesPeps("Si");
    }
    if (pepsPersonal === "No" && pepsFamiliar === "No") {
      onPeps(null);
      handleNext();
    }
  };

  const handleNext = () => {
    onNext();
  };

  //Services
  const handleEnviarPeps = async () => {
    try {
      const request = {
        tipoNotificacion: tipoNotificacion,
        nombre: nombre,
        correoElectronico: correo,
        telefono: telefono,
        departamento: selectedDepartment,
        municipio: selectedMunicipality,
      };
      const pepsEnvio = await sendNotification(request);
      console.log(pepsEnvio);
      if (pepsEnvio.success) {
        onPeps(pepsEnvio);
        setdatosPepsObtenidos("Si");
      } else {
        // handle error, show message, etc.
        setMensaje(pepsEnvio.mensaje);
        setOpen(true);
      }
    } catch (error) {
      setMensaje("Error comunicandose con el servidor");
      setOpen(true);
      console.error("Error comunicandose con el servidor: ", error);
      // handle error, e.g., show an alert or set an error state
    }
  };

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
      style={{ objectFit: "contain" }}
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
          <Typography
            align="center"
            variant="h6"
            sx={{ ml: -8 }}
            style={{ flexGrow: 1 }}
          >
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
          <IntroInfo />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={8}
          sx={{ bgcolor: { lg: "white" }, mb: { xs: 5, lg: 0 } }}
        >
          <PeopleIcon
            color={"black"}
            sx={{
              fontSize: { lg: "200px" },
              textAlign: "center",
              margin: "auto",
              display: { xs: "none", md: "none", lg: "block" },
            }}
          />
          {esPeps !== "Si" && (
            <Box>
              <Typography
                variant="body4"
                component="h3"
                gutterBottom
                align="center"
                sx={{
                  mt: { xs: 15, md: 15, lg: 0 },
                  fontSize: { lg: "30px" },
                  fontWeight: { lg: "bold" },
                }}
              >
                Persona Políticamente Expuesta (PEPs)
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "25px" } }}
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
                    sx={{ ml: 2 }}
                    label={
                      <Box>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
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
                    sx={{ ml: 2 }}
                    label={
                      <Box style={{ width: "100%" }}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
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
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "25px" } }}
              >
                2. ¿Tiene un familiar que ocupe o ha ocupado un cargo como
                Persona Expuesta Políticamente?
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
                    sx={{ ml: 2 }}
                    label={
                      <Box>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
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
                    sx={{ ml: 2 }}
                    label={
                      <Box style={{ width: "100%" }}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
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
                  sx={{
                    display: "block",
                    mt: 3,
                    fontSize: { lg: "20px" },
                    fontWeight: { lg: "bold" },
                  }}
                >
                  Continuar
                </Button>
              </Box>
            </Box>
          )}
          {esPeps === "Si" && datosPepsObtenidos !== "Si" && (
            <Box style={{ objectFit: "contain" }}>
              <Typography
                variant="body4"
                component="h3"
                gutterBottom
                align="center"
                sx={{
                  mt: 1,
                  fontSize: { lg: "35px" },
                  fontWeight: { lg: "bold" },
                }}
              >
                En este momento no podemos completar el proceso.
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "20px" } }}
              >
                Por favor déjanos tu información de contacto para que un asesor
                se pueda poner en contacto durante las próximas horas.
              </Typography>

              <Box
                align="center"
                style={{ objectFit: "contain" }}
                sx={{ mx: 2 }}
              >
                {/* Existing TextField and Autocomplete components */}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  sx={{ mt: 1, backgroundColor: "white" }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Teléfono"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  sx={{ mt: 1, backgroundColor: "white" }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Correo"
                  value={correo}
                  onChange={handleCorreoChange}
                  sx={{ mt: 1, backgroundColor: "white" }}
                />
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
              </Box>
              <Box align="center" sx={{ mx: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleEnviarDatos}
                  sx={{ display: "block", mt: 3 }}
                  disabled={!isFormValid()} // Button is disabled if form is not valid
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
                Un asesor te conectará para terminar la afiliación. Mantente
                pendiente de tu correo y teléfono.
              </Typography>

              <Box align="center" sx={{ mx: 2 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default Peps;
