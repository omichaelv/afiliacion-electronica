import React, { Ref, createRef, useEffect, useState, useRef, useCallback } from "react";
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
import logo from '../../logo.svg'
import { FPhi } from "@facephi/selphid-widget-web";



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

  // PhotoIdDocument

  const FPhiCameraResolutions = {
    "res480p": {title: "640x480", width: 640, height: 480},
    "res600p": {title: "800x600", width: 800, height: 600},
    "res768p": {title: "1024x768", width: 1024, height: 768},
    "res720p": {title: "1280x720 (720p)", width: 1280, height: 720},
    "res1080p": {title: "1920x1080 (1080p)", width: 1920, height: 1080}
};

const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);
const [widgetPreviewCapture, setWidgetPreviewCapture] = useState(true);
const [widgetForceLandscape, setWidgetForceLandscape] = useState(false);
const [widgetInitialTip, setWidgetInitialTip] = useState(false);
const [widgetDebugMode, setWidgetDebugMode] = useState(false);
const [widgetCameraResolution, setWidgetCameraResolution] = useState("res720p");
const [widgetCameraWidth, setWidgetCameraWidth] = useState(FPhiCameraResolutions.res720p.width);
const [widgetCameraHeight, setWidgetCameraHeight] = useState(FPhiCameraResolutions.res720p.height);
const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
const [widgetShowLog, setWidgetShowLog] = useState(false);
const [widgetStartSimpleMode, setWidgetStartSimpleMode] = useState(false);
const [widgetLicenseKey, setWidgetLicenseKey] = useState("");


if (!widgetLicenseKey) {
    const licenseKey = window.prompt("Please, enter the license key before start the operations: ") || "";
    setWidgetLicenseKey(licenseKey);

    // Load widget resources before it starts (Need server headers to be configured)
    FPhi.SelphID.generateBrowserCache("../../../public/assets/selphid", licenseKey);
}

const startSimpleMode = () => {
    setWidgetStartSimpleMode(true);
    setIsWidgetCaptureStarted(true);
}

const onCameraResolutionSet = (event) => {
    setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
    setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

    setWidgetCameraResolution(event.target.value);
}

const onStartCapture = async () => {
    console.warn(">>>> [app] onStartCapture");

    checkCapabilities();

    setIsWidgetCaptureStarted(true);
}

const onStopCapture = () => {
    console.warn(">>>> [app] onStopCapture");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
}

// Widget event handlers
const onModuleLoaded = (eventData) => console.warn("[SelphID] onModuleLoaded", eventData);


const onExtractionFinished = (extractionResult) => {
    console.warn("[SelphID] onExtractionFinished");
    console.log(extractionResult.detail);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
}

const onUserCancelled = () => {
    console.warn("[SelphID] onUserCancelled");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
}

const onExceptionCaptured = (exceptionResult) => {
    console.warn("[SelphID] onExceptionCaptured");
    console.log(exceptionResult.detail);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
}

const onExtractionTimeout = (eventInfo) => {
    console.warn("[SelphID] onExtractionTimeout", eventInfo);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
}

const onTrackStatus = (eventData) => {
    let trackStatusCode = Object.entries(FPhi.SelphID.TrackStatus).find(e => e[1] === eventData.detail.code) || [];
    console.warn(`[SelphID] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`);
    console.log(eventData);
}

// Methods
async function checkCapabilities() {
  // Check device capabilities (browser, memory, webassembly...) with checkCapabilities method
  let checkCapabilities = await FPhi.SelphID.CheckCapabilities();
  console.log("SelphID: Widget Check Capabilities Check:\n", checkCapabilities);
}

const widgetRef = createRef();
const [componentMounted, setComponentMounted] = useState(false);

useEffect(() => {
    if (!componentMounted) {
        setComponentMounted(true);
    } else {
        if (isWidgetCaptureStarted) {
            const node = widgetRef.current;

            if (node) {
                node.addEventListener("onModuleLoaded", onModuleLoaded);
                node.addEventListener("onExtractionFinished", onExtractionFinished);
                node.addEventListener("onUserCancelled", onUserCancelled);
                node.addEventListener("onExceptionCaptured", onExceptionCaptured);
                node.addEventListener("onExtractionTimeout", onExtractionTimeout);
                node.addEventListener("onTrackStatus", onTrackStatus);
            }
        }
    }
}, [isWidgetCaptureStarted, widgetRef, widgetLicenseKey]);

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
            <img src={logo} className="App-logo" alt="logo" />
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
            <facephi-selphid
                        ref={widgetRef}
                        style={{
                            width: "100%",
                            height: widgetForceLandscape ? "56.25%" : "100%"
                        }}
                        className={`bg-dark`}

                        // Setup propierties
                        bundlePath="../../../public/assets/selphid"
                        licenseKey={widgetLicenseKey}
                        language="es"
                        documentAspectRatio={85.60 / 53.98}
                        previewCapture={widgetPreviewCapture}
                        forceLandscape={widgetForceLandscape}
                        initialTip={widgetInitialTip}
                        imageFormat={"image/jpeg"}
                        cameraWidth={widgetCameraWidth}
                        cameraHeight={widgetCameraHeight}
                        specificData={"ES"}
                        startSimpleMode={widgetStartSimpleMode}
                        videoRecord={widgetVideoRecord}
                        videoRecordType={FPhi.SelphID.RecorderType.Remote}
                        videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}
                        showLog={widgetShowLog}
                        debugMode={widgetDebugMode}
                    ></facephi-selphid>

           
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
