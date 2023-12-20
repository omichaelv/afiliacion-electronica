import React, { useState, createRef, useRef,useEffect, useCallback } from "react";
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
import {FPhi, WidgetComponent} from "@facephi/selphi-widget-web";



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

  const FPhiCameraResolutions = {
    res480p: {title: "640x480", width: 640, height: 480},
    res600p: {title: "800x600", width: 800, height: 600},
    res768p: {title: "1024x768", width: 1024, height: 768},
    res720p: {title: "1280x720 (720p)", width: 1280, height: 720},
    res1080p: {title: "1920x1080 (1080p)", width: 1920, height: 1080},
  };

const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);

// Initialize configuration properties
const [widgetCameraResolution, setWidgetCameraResolution] = useState("res720p");
const [widgetCameraWidth, setWidgetCameraWidth] = useState(FPhiCameraResolutions.res720p.width);
const [widgetCameraHeight, setWidgetCameraHeight] = useState(FPhiCameraResolutions.res720p.height);
const [widgetCameraType, setWidgetCameraType] = useState(FPhi.Selphi.CameraType.Front);
const [widgetInteractible, setWidgetInteractible] = useState(true);
const [widgetStabilizationStage, setWidgetStabilizationStage] = useState(false);
const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
const [widgetShowLog, setWidgetShowLog] = useState(false);
const [widgetDebugMode, setWidgetDebugMode] = useState(false);

const widgetRef = createRef();
const [componentMounted, setComponentMounted] = useState(false);

useEffect(() => {
    if (!componentMounted) {
        setComponentMounted(true);
    } else {
        if (isWidgetCaptureStarted) {
            const node = widgetRef.current

            // Setup widget event handlers
            node?.addEventListener("onModuleLoaded", onModuleLoaded)
            node?.addEventListener("onStabilizing", onStabilizing)
            node?.addEventListener("onExtractionFinish", onExtractionFinish)
            node?.addEventListener("onUserCancel", onUserCancel)
            node?.addEventListener("onExceptionCaptured", onExceptionCaptured)
            node?.addEventListener("onExtractionTimeout", onExtractionTimeout)
            node?.addEventListener("onTimeoutErrorButtonClick", onTimeoutErrorButtonClick)
            node?.addEventListener("onTrackStatus", onTrackStatus)
        }
    }
});
  // Widget event handlers
  function onModuleLoaded(eventData) {
    console.warn("[Selphi] onModuleLoaded");
    console.log(eventData);
}

function onStabilizing(stabilizingResult) {
    console.warn("[Selphi] onStabilizing");
    console.log(stabilizingResult);
}

function onExtractionFinish(extractionResult) {
    console.warn("[Selphi] onExtractionFinish");
    console.log(extractionResult.detail);

    if (extractionResult.detail.bestImage) {
        // Generate template raw from bestImage with generateTemplateRawFromByteArray method
        FPhi.Selphi.Component.generateTemplateRawFromByteArray("../../../assets/selphi", extractionResult.detail.bestImage, result => {
            console.log("BestImage Template Raw: ", result);
        });
    }

    setIsWidgetCaptureStarted(false);
}

function onUserCancel() {
    console.warn("[Selphi] onUserCancel");
    setIsWidgetCaptureStarted(false);
}

function onExceptionCaptured(exceptionResult) {
    console.warn("[Selphi] onExceptionCaptured");
    console.log(exceptionResult.detail);

    setIsWidgetCaptureStarted(false);
}

function onExtractionTimeout(extractionTimeoutResult) {
    console.warn("[Selphi] onExtractionTimeout");
    console.log(extractionTimeoutResult);
}

function onTimeoutErrorButtonClick() {
    console.warn("[Selphi] onTimeoutErrorButtonClick");
    setIsWidgetCaptureStarted(false);
}

function onTrackStatus(eventData) {
    let trackStatusCode = Object.entries(FPhi.Selphi.TrackStatus).find((e) => e[1] === eventData.detail.code);
    console.warn(`[Selphi] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`);
    console.log(eventData);
}

// Methods
async function checkCapabilities() {
  // Check device capabilities (browser, memory, webassembly...) with checkCapabilities method
  let checkCapabilities = await FPhi.Selphi.CheckCapabilities();
  console.log("Selphi: Widget Check Capabilities Check:\n", checkCapabilities);
}

// Miscellaneous
function onStartCapture() {
    checkCapabilities();
    
    console.warn(">>>> [app] onStartCapture", isWidgetCaptureStarted);
    setIsWidgetCaptureStarted(!isWidgetCaptureStarted);
}

function onStopCapture() {
    console.warn(">>>> [app] onStopCapture", isWidgetCaptureStarted);
    setIsWidgetCaptureStarted(false);
}

function onCameraResolutionChanged(event) {
    setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
    setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

    setWidgetCameraResolution(event.target.value);
}



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
                <facephi-selphi 
                  ref={widgetRef}

                  bundlePath={`../../../public/assets/selphi`}
                  language="es"
    
                  cameraWidth={1280}
                  cameraHeight={720}
                  cameraType={FPhi.Selphi.CameraType.Front}
                  interactible={true}
                  logImages={true}>
                </facephi-selphi>
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
