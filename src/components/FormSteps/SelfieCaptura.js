import React, { useState, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Webcam from "react-webcam";
import Tesseract from 'tesseract.js';
import logo from '../../logo.svg'

function SelfieCaptura({ onNext }) {

  
  const [capturarFrontalBool, setcapturarFrontalBool] = useState(false);
  const webcamRefFrontal = React.useRef(null);
  const [imagesFrontal, setImagesFrontal] = useState([]);
  const [ocrText, setOcrText] = useState("");



  const capture = useCallback(() => {
    setcapturarFrontalBool(true);
    const imageSrc = webcamRefFrontal.current.getScreenshot();
    setImagesFrontal(prevImages => [...prevImages, imageSrc]);
    performOcr(imageSrc);
    }, [webcamRefFrontal]);

  const captureResetFrontal = () => {
    setImagesFrontal([]);
    setcapturarFrontalBool(false);
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
          <Box align="left">
           
          </Box>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
          <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      

    
        <Box align="center">

            <Box align="center" hidden={capturarFrontalBool}>
            <Box align="center" sx={{border: 1, backgroundColor:"#00559c",radius:2,padding: -3, margin:2, color: "white"}} >
                <PersonIcon sx={{ display: "inline", mt:2}} />
                <Typography
                    startIcon = {PersonIcon}
                    variant="h6"
                    align="center"
                    sx={{ mb: 2, ml: 2, mr: 2 }}
                >
                     Coloca tu rostro visiblemente en la camara.
                </Typography> 
            </Box>
                <Webcam
                    audio={false}
                    ref={webcamRefFrontal}
                    screenshotFormat="image/jpeg"
                    hidden={capturarFrontalBool}
                    style={{maxWidth: '300px', height: '400px',objectFit: 'cover', overflow: 'hidden', borderRadius: '100% / 100%', border: '1px solid black'}}
                />
                <Box align="center" sx={{mx:2}}>
                  <Button fullWidth sx={{ display: "block", mt: 3, color: "white"}}  variant="contained" onClick={capture} >Capturar</Button>
                </Box>
            </Box>

                
                <Box align="center" hidden={!capturarFrontalBool}> 
                {imagesFrontal.map((img, index) => (
                <img key={index} src={img} alt={`capture-${index}`} />
                ))}
                  <Box align="center" sx={{mx:2}}>
                    <Button fullWidth sx={{ display: "block", mt: 3}}  variant="outlined" onClick={captureResetFrontal} >Capturar de Nuevo</Button>
                    <Button fullWidth sx={{ display: "block", mt: 1, color: "white"}}  variant="contained" onClick={handleNext} >Aceptar</Button>
                  </Box>
                    
                </Box>
                
        </Box>

    </Box>
      
  );
}

export default SelfieCaptura;
