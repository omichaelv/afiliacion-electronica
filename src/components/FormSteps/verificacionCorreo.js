import React, { useState, useEffect } from 'react';
import { Grid, Box, AppBar, Snackbar, Toolbar, TextField, Button, Typography, Paper } from '@mui/material';
import logo from '../../logo.svg'
import EmailIcon from '@mui/icons-material/Email';
import sendCode from "../../services/CodeService";
import verifyCode from "../../services/validarCodigoService";

function VerificarCorreo ({onNext, infoContacto, infoBiometrica}) {
  const [code, setCode] = useState(Array(6).fill(''));
  const [componentMounted, setComponentMounted] = useState(false);

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
      handleEnviarCodigo();
    }
  });

  const handleSubmit = () => {
    // Handle the submission of the code
    handleVerificarCodigo();
  };

    //Services
    const handleEnviarCodigo = async () => {
        try {
          const request = {
            cod_cliente : infoBiometrica?.data?.dui || "",
            tipo_envio : "EMAIL",
            correo_electronico : infoContacto?.correo || "",
            telefono: ""
          };
          const codeEnvio = await sendCode(request);
          if (codeEnvio.success) {
           
          } else {
            // handle error, show message, etc.
            setMensaje(codeEnvio.codeDescription );
            setOpen(true);
          }
        } catch (error) {
          setMensaje("Error comunicandose con el servidor");
          setOpen(true);
          console.error("Error comunicandose con el servidor: ", error);
          // handle error, e.g., show an alert or set an error state
        }
      };

      const handleVerificarCodigo = async () => {
        try {
          const request = {
            cod_cliente : infoBiometrica?.data.dui || "",
            otp : code.join('')
          };
          const codeEnvio = await verifyCode(request);
          if (codeEnvio.success) {
           onNext();
          } else {
            // handle error, show message, etc.
            setMensaje("No se pudo validar el codigo correctamente" );
            setOpen(true);
          }
        } catch (error) {
          setMensaje("Error comunicandose con el servidor");
          setOpen(true);
          console.error("Error comunicandose con el servidor: ", error);
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
          <EmailIcon
            color={"black"}
            sx={{
              fontSize: { lg: "200px" },
              textAlign: "center",
              margin: "auto",
              display: { xs: "none", md: "none", lg: "block" },
            }}
          />
          <Paper style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Código de verificación
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enviamos un código al correo electrónico {infoContacto?.correo||""}
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
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Confirmar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" color="primary">
            Volver a enviar código
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

export default VerificarCorreo;