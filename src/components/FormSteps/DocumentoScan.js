import React, { useState, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button
} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Webcam from "react-webcam";
import Tesseract from 'tesseract.js';

function DocumentoScan({ onNext }) {
  const [usarCodigoAsesor, setusarCodigoAsesor] = useState("");

  const [aceptoTerminos, setAceptoTerminos] = useState("");
  const [tipoCaptura, settipoCaptura] = useState("");
  const [capturarFrontalBool, setcapturarFrontalBool] = useState(false);
  const [capturarReversaBool, setcapturarReversaBool] = useState(false);
  const webcamRefFrontal = React.useRef(null);
  const webcamRefReversa = React.useRef(null);
  const [imagesFrontal, setImagesFrontal] = useState([]);
  const [imagesReversa, setImagesReversa] = useState([]);
  const [ocrText, setOcrText] = useState("");


  
  const handleTerminos = (event) => {
    setAceptoTerminos("Si");
    settipoCaptura("Frontal");
  };



  const capture = useCallback(() => {
    setcapturarFrontalBool(true);
    const imageSrc = webcamRefFrontal.current.getScreenshot();
    setImagesFrontal(prevImages => [...prevImages, imageSrc]);
    performOcr(imageSrc);
    }, [webcamRefFrontal]);

  const captureReversa = useCallback(() => {
        setcapturarReversaBool(true);
        const imageSrc = webcamRefReversa.current.getScreenshot();
        setImagesReversa(prevImages => [...prevImages, imageSrc]);
        performOcr(imageSrc);
        }, [webcamRefReversa]);

  const captureResetFrontal = () => {
    setImagesFrontal([]);
    setcapturarFrontalBool(false);
  };

  const captureResetReversa = () => {
    setImagesReversa([]);
    setcapturarReversaBool(false);
  };

  const performOcr = (imageSrc) => {
    Tesseract.recognize(
      imageSrc,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);
      setOcrText(text);
      // You can search 'text' for specific keywords here
    });
  };
  
  const handleCamaraReversa = () => {
    settipoCaptura("Reversa");
  }

  const handleFotos = () => {
    settipoCaptura("Ambas");
  }
  const handleNext = () => {
    // Pass the state to the parent component or handle the transition
    onNext(usarCodigoAsesor);
  };



  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        display: "flex", // Use flexbox for layout
        flexDirection: "column", // Stack children vertically
        width: "100%", // Take up all available width
        minHeight: "100vh", // At minimum, be full height of the viewport
        overflow: "auto", // Enable scroll if content overflows
      }}
    >
      <AppBar
        className="app-bar"
        position="static"
        sx={{ backgroundColor: "#00284E" }}
      >
        
        <Toolbar>
          <Box align="left">
           
          </Box>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>

      {aceptoTerminos !== "Si" && (
      <Box>
        <Typography
          variant="body4"
          component="h3"
          gutterBottom
          align="center"
          sx={{ mt: 15 }}
        >
          <CameraAltIcon color={"00559c"} />
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          sx={{ my: 2, ml: 2, mr: 2 }}
        >
          ¿Aceptas los términos y condiciones para guardar la información e imagenes que nos vas a compartir en el proceso y acceder a la cámara de tu dispositivo?
        </Typography>
        <Box align="center">
            <Button sx={{
                backgroundColor: 'transparent',
                color: 'blue',
                textTransform: 'none',
                textDecoration: 'underline',
                boxShadow: 'none',
                    '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'none',
                color: 'darkblue',
                }
                }} href="https://example.com" color="primary" variant="contained" >
                Ver Términos y Condiciones
            </Button>
        </Box>

        <Box align="center">
          <Button
            variant="contained"
            onClick={handleTerminos}
            sx={{ mt: 3, mr:2 }}
          >
            Aceptar
          </Button>
          <Button
            variant="outlined"
            
            sx={{  mt: 3 }}
          >
            Cancelar
          </Button>
        </Box>

        </Box>
        )}

    {aceptoTerminos === "Si" && tipoCaptura === "Frontal"  &&(
        <Box align="center">

            <Box align="center" hidden={capturarFrontalBool}>
            <Box align="center" sx={{border: 1, backgroundColor:"#00559c",radius:2,padding: -3, margin:2, color: "white"}} >
                <CreditCardIcon sx={{ display: "inline", mt:1}} />
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Coloca tu documento en la parte frontal
                </Typography> 
            </Box>
                <Webcam
                    audio={false}
                    ref={webcamRefFrontal}
                    screenshotFormat="image/jpeg"
                    hidden={capturarFrontalBool}
                    style={{maxWidth: '100vw',objectFit: 'contain'}}
                />
                <Box align="center" sx={{mx:2}} >
                  <Button startIcon={<CameraAltIcon/>} fullWidth sx={{  mt: 3, color: "white"}}  variant="contained" onClick={capture} >Capturar</Button>
                </Box>
                
            </Box>

                
                <Box align="center" hidden={!capturarFrontalBool}>
                  <Box align="center" sx={{border: 1, backgroundColor:"#00559c",radius:2,padding: -3, margin:2, color: "white"}} >
                    <CreditCardIcon sx={{ display: "inline", mt:1}} />
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ mb: 2, ml: 2, mr: 2 }}
                    >
                      Revisa tu documento
                    </Typography> 
                  </Box>

                  {imagesFrontal.map((img, index) => (
                    <img key={index} src={img} alt={`capture-${index}`} />
                  ))}
                  <Box align="center" sx={{mx:2}} >
                    <Button fullWidth sx={{ mt: 3}} variant="outlined" onClick={captureResetFrontal} >Capturar de Nuevo</Button>
                    <Button fullWidth sx={{ mt: 1, color: "white"}}  variant="contained" onClick={handleCamaraReversa} >Aceptar</Button>
                  </Box>
                  
                </Box>
                
        </Box>)} 

        {aceptoTerminos === "Si" && tipoCaptura === "Reversa"  &&(
        <Box align="center">

            <Box align="center" hidden={capturarReversaBool}>
            <Box align="center" sx={{border: 1, backgroundColor:"#00559c",radius:2,padding: -3, margin:2, color: "white"}} >
                <CreditCardIcon sx={{ display: "inline"}} />
                <Typography
                    startIcon = {CreditCardIcon}
                    variant="h5"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Coloca tu documento en la parte reversa
                </Typography> 
            </Box>
                <Webcam
                    audio={false}
                    ref={webcamRefReversa}
                    screenshotFormat="image/jpeg"
                    hidden={capturarReversaBool}
                    style={{maxWidth: '100vw',objectFit: 'contain'}}
                />
                <Box align="center" sx={{mx:2}} >
                  <Button fullWidth sx={{  mt: 3, color: "white"}}  variant="contained" onClick={captureReversa} >Capturar</Button>
                </Box>
                
            </Box>

                
                <Box align="center" hidden={!capturarReversaBool}>
                <Box align="center" sx={{border: 1, backgroundColor:"#00559c",radius:2,padding: -3, margin:2, color: "white"}} >
                    <CreditCardIcon sx={{ display: "inline", mt:1}} />
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ mb: 2, ml: 2, mr: 2 }}
                    >
                      Revisa tu documento
                    </Typography> 
                  </Box> 
                {imagesReversa.map((img, index) => (
                <img key={index} src={img} alt={`capture-${index}`} />
                ))}
                    <Box align="center" sx={{mx:2}}>
                      <Button fullWidth sx={{ display: "block", mt: 3}}  variant="outlined" onClick={captureResetReversa} >Capturar de Nuevo</Button>
                      <Button fullWidth sx={{ display: "block", mt: 1, color: "white"}}  variant="contained" onClick={handleFotos} >Aceptar</Button>
                    </Box>
                    
                </Box>
                
        </Box>)}

        {tipoCaptura === "Ambas" &&(
        <Box align="center" style={{objectFit: 'contain'}}>

            <Box align="center" >
            <Box align="center" sx={{margin:2}} >
                <Typography
                    startIcon = {CreditCardIcon}
                    variant="h6"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Adelante
                </Typography> 
                {imagesFrontal.map((img, index) => (
                <img key={index} src={img} alt={`capture-${index}`} />
                ))}

            </Box>
            <Box align="center" sx={{margin:2}} >
                <Typography
                    startIcon = {CreditCardIcon}
                    variant="h6"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Atrás
                </Typography> 
                {imagesReversa.map((img, index) => (
                <img key={index} src={img} alt={`capture-${index}`} />
                ))}

            </Box>
            <Box align="center" sx={{margin:2}} >
                <Typography
                    startIcon = {CreditCardIcon}
                    variant="h6"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Foto DUI
                </Typography> 
                

            </Box>
            <Box align="center" sx={{margin:2}} >
                <Typography
                    startIcon = {CreditCardIcon}
                    variant="h6"
                    align="center"
                    sx={{border: 1, backgroundColor:"#f3f4f6",radius:2,padding: -3, margin:2, color: "#00559c"}}
                >
                    Confirmo que el documento escaneado es de mi propiedad
                </Typography> 
                <Box align="center" hidden={!capturarReversaBool}> 
              
              <Button sx={{ mt: 1, mr:2}}  variant="contained" onClick={handleNext} >Si</Button>
              <Button sx={{ mt: 1}}  variant="contained" onClick={handleFotos} >No</Button>
              <Button sx={{ display: "block", mt: 3}}  variant="outlined" onClick={captureResetReversa} >Cancelar</Button>
          </Box>

            </Box>
            
            </Box>

                
               
                
        </Box>)}

  


    </Box>
      
  );
}

export default DocumentoScan;
