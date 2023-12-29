import React, { useState, useEffect } from 'react';
import { Grid, Box, AppBar, Snackbar, Toolbar, TextField, Button, Typography, Paper } from '@mui/material';
import logo from '../../logo.svg'
import printCA from "../../services/PrintCAService";
import getSignatoryDetails from "../../services/SignatoryService";
import firmarDocumento from "../../services/FirmarDocumentoService";
import { format } from 'date-fns';


function FirmarSolicitud ({onNext, infoBiometrica, infoLaboral, infoContacto, agente}) {
    const [code, setCode] = useState(Array(6).fill(''));
    const [componentMounted, setComponentMounted] = useState(false);
    const [infoFirmantes, setInfoFirmantes] = useState(null);
    const [infoCA, setInfoCA] = useState(null);
    const [firmarDocumentoData, setFirmarDocumento] = useState(null);
  
    const handleChange = (index) => (e) => {
      const newCode = [...code];
      newCode[index] = e.target.value;
      setCode(newCode);
  
      // Auto-focus to next field if there's a next field and current input is filled
      if (e.target.nextSibling && e.target.value) {
        e.target.nextSibling.focus();
      }
    };
  
    useEffect(() => {
      if (!componentMounted) {
        setComponentMounted(true);
        handleObtenerFirmante();
        handleObtenerSolicitud();
      }
    }, []);
  
    const handleSubmit = async () => {
        try {
            const request = {
                idProceso: infoCA.numeroSolicitud || "2", //Es 2 o es el Id Proceso?, 
                subject: "Solicitud de Afiliacion", 
                codCliente: infoBiometrica.data.dui, 
                cantidadFirmantes: 1, 
                cantidadDocumentos: 1, 
                fechaExpiracion: "NONE", 
                firmantes: [{
                    correlativo: infoFirmantes.codigoFirmante || "", 
                    email: infoFirmantes.correoElectronico  || "", 
                    compania: "", 
                    apellido: infoFirmantes.primerApellido || "" , 
                    nombre: infoFirmantes.primerNombre  || "", 
                    verificacion: "NONE", 
                    celular: "" 
                }],
                documentos: [{
                    tipoDocumento: infoCA.tipoAfiliacion || 5,  //Es el tipo de afiliacion o otro valor?
                    nombreDocumento:  infoCA.pdf || "solicitudCA.pdf", //Que nombre usar
                    base64: infoCA.pdf || "", 
                    firma: [{
                        correlativo: 1 //Que valor usar?
                    }]

                }]
            }
            const firmarDocumento = await firmarDocumento(request);
            if (firmarDocumento.success) {
                setFirmarDocumento(firmarDocumento);
            } else {
              // handle error, show message, etc.
              setMensaje(firmarDocumento.mensaje);
              setOpen(true);
            }
          } catch (error) {
            setMensaje("Error comunicandose con el servidor");
            setOpen(true);
            // handle error, e.g., show an alert or set an error state
          }
        };
      
  
      //Services
      const handleObtenerFirmante = async () => {
          try {
            
            const codeEnvio = await getSignatoryDetails();
            if (codeEnvio.success) {
                setInfoFirmantes(codeEnvio)
            } else {
              // handle error, show message, etc.
              setMensaje(codeEnvio.mensaje);
              setOpen(true);
            }
          } catch (error) {
            setMensaje("Error comunicandose con el servidor");
            setOpen(true);
            // handle error, e.g., show an alert or set an error state
          }
        };
  
        const handleObtenerSolicitud = async () => {
          try {
            const request = {
                fechaFormulario : format(new Date(), 'dd/MM/yyyy'),
                nombreCompleto : (infoBiometrica.data.nom1 + " " + infoBiometrica.data.nom2 + " " + infoBiometrica.data.nom3 + " " + infoBiometrica.data.ape1 + " " + infoBiometrica.data.ape2)|| "",
                primerNombre: infoBiometrica.data.nom1 || "",
                segundoNombre: infoBiometrica.data.nom2 || "",
                primerApellido: infoBiometrica.data.ape1 || "",
                segundoApellido: infoBiometrica.data.ape2 || "",
                apellidoCasada: infoBiometrica.data.apdoCsda || "",
                numeroIsss: infoLaboral.isss || "",
                numeroInpep: "", //Investigar
                telDomicilio: infoContacto.telefono || "",
                nacionalidad: infoBiometrica.data.nacionalidad||"",
                conocidoPor: infoBiometrica.data.conoPor || "",
                telCelular: infoContacto.celular || "",
                correoElectronico: infoContacto.correo || "",
                direccion: infoBiometrica.data.residencia || "",
                sexo: infoBiometrica.data.sexo || "",
                fechaNacimiento: infoBiometrica.data.fechNaci || "",
                numeroDocumento: infoBiometrica.data.dui || "",
                tipoDocumento:  "", //Investigar
                lugarExpedicion: infoBiometrica.data.paisExpe || "",
                deptoExpedicion: infoBiometrica.data.deptExpe  || "",
                municipioExpedicion: infoBiometrica.data.muniExpe  ||"",
                paisExpedicion: infoBiometrica.data.paisExpe || "",
                fechaExpedicion: infoBiometrica.data.fechExpe || "",
                fechaExpiracion: infoBiometrica.data.fechVenc || "",
                estadoFamiliar: infoBiometrica.data.estaFami || "",
                resideEnSalvador: infoContacto.residenEnSalvador || "",
                referencia: "", //investigar,
                departamento: infoBiometrica.data.deptNaci || "",
                municipio: infoBiometrica.data.muniNaci || "",
                pais: infoBiometrica.data.paisNaci  || "",
                tipoTrabajador: infoLaboral.tipoTrabajador || "",
                primeraRelacionLaboral: "N", //Investigar,
                profesion: infoBiometrica.data.prof || "",
                masDeUnEmpleador: "N" , //Investigar
                razonSocial: infoLaboral.razonSocial || "",
                fechaInicioLabores: infoLaboral.fechaDeInicio || "",
                nit: infoLaboral.nit || "",
                telefonoEmpleador: infoLaboral.celular || "",
                deptoEmpleador: infoLaboral.departamento.nombre || "",
                municipioEmpleador: infoLaboral.municipio.nombre || "",
                paisEmpleador: infoLaboral.pais.nombre || "",
                codigoPostalEmpleador: "", //Investigar
                direccionEmpleador: "", //Investigar
                correoElectronicoEmpleador: infoLaboral.correo || "",
                codigoAgente: agente || "",
                esPep: "N",
                familiarPep: "N",
                procedenciaFondos: infoLaboral.procedenciaFondos || "",
                actividadEconomica: infoLaboral.actividadEconomica || "",
                firmaObservaciones: "Ninguna",

            };
            const dataCA = await printCA(request);
            if (dataCA.success) {
                setInfoCA(dataCA);
            } else {
              // handle error, show message, etc.
              setMensaje("No se pudo validar el codigo correctamente" );
              setOpen(true);
            }
          } catch (error) {
            setMensaje("Error comunicandose con el servidor");
            setOpen(true);
            // handle error, e.g., show an alert or set an error state
          }
        };
  
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
              <Box sx={{mt:{xs:5}}}>
            
            <Paper style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
        Firma de Solicitud y Contrato de Afiliación
        </Typography>
        <Typography variant="h6" gutterBottom>
        Solicitud y Contrato de Afiliación
        </Typography>
        <Typography variant="body1" gutterBottom>
        Firma electrónica de OneSpan Sign
Utilice las firmas electrónicas para automatizar sus flujos de trabajo y así mejorar la experiencia del cliente, fortalecer el cumplimiento y eliminar los costos relacionados con los procesos que requieren documentos físicos.

Una firma electrónica, también llamada e-signature en inglés, es un concepto legal muy similar a su equivalente en papel. Es una clave privada, un símbolo o un proceso electrónico que está adjunto o asociado de forma lógica con un contrato u otro registro, y que es ejecutado o utilizado por una persona como comprobante
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {code.map((num, index) => (
            <Grid item xs={2} key={index}>
              <TextField
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', padding: '10px' },
                }}
                value={num}
                onChange={handleChange(index)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Tap para firmar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="text" color="primary">
              No firmar
            </Button>
          </Grid>
        </Grid>
      </Paper>
            </Box>
          </Grid>
        </Grid>
  
            
  
      </Box>
      
    );
  };
  
  export default FirmarSolicitud;