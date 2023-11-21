import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function InfoDUI({ onNext }) {

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
    >
      <AppBar
        className="app-bar"
        position="static"
        sx={{ backgroundColor: "#00284E" }}
      >
        
        <Toolbar>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>

      
      <Box>
        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                La información conforme a tu DUI y RNPN es la siguiente: 
            </Typography>
           
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Número de DUI:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1, fontWeight: 'bold' }}
            >
                04005672-3
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Nombres:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                Julio Roberto
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Apellidos:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                Lopez
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Género:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                M
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Estado Familiar:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                Soltero
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Profesion:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                Empleado
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Fecha de Nacimiento:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                09/09/2023
            </Typography>
        </Box>
        
        <Box>
            <Typography
                variant="body4"
                component="h3"StepSix1
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Fecha de Expedición del documento:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                09/09/2023
            </Typography>
        </Box>

        <Box>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 3 , fontWeight: 'normal' }}
            >
                Fecha de Expiracion del documento:
            </Typography>
            <Typography
                variant="body4"
                component="h3"
                align="center"
                sx={{ mt: 1,fontWeight: 'bold' }}
            >
                09/09/2023
            </Typography>
        </Box>
       

        <Box align="center" sx={{mx:2}}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ display: "block", mt: 3 }}
          >
            Continuar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleNext}
            sx={{ display: "block", mt: 3 }}
          >
            Salir
          </Button>
        </Box>
      </Box>
    

    </Box>
  );
}

export default InfoDUI;
