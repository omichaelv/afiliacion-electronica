import React, {
  useState,
  createRef,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { AppBar, Toolbar, Box, Typography, Button, Grid, Modal} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../logo.svg";
import { FPhi, WidgetComponent } from "@facephi/selphi-widget-web";
import SelfieInstrucciones from "./shared/SelfieInstrucciones";
import verifyBiometricData from "../../services/BiometricVerificationService";

function SelfieCaptura({ onNext, onSelfi, documentoData }) {

  
  const [photoStarted, setPhotoStarted] = useState(true);
  const [templateResult, settemplateResult] = useState(null);


  const handleNext = () => {
    onNext();
  };

  const handleCapturarDeNuevo = () => {
    onStartCapture();
  };

  const FPhiCameraResolutions = {
    res480p: { title: "640x480", width: 640, height: 480 },
    res600p: { title: "800x600", width: 800, height: 600 },
    res768p: { title: "1024x768", width: 1024, height: 768 },
    res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
    res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
  };

  const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);

  // Initialize configuration properties
  const [widgetCameraResolution, setWidgetCameraResolution] =useState("res720p");
  const [widgetCameraWidth, setWidgetCameraWidth] = useState(FPhiCameraResolutions.res720p.width);
  const [widgetCameraHeight, setWidgetCameraHeight] = useState( FPhiCameraResolutions.res720p.height);
  const [widgetCameraType, setWidgetCameraType] = useState(FPhi.Selphi.CameraType.Front);
  const [widgetInteractible, setWidgetInteractible] = useState(true);
  const [widgetStabilizationStage, setWidgetStabilizationStage] = useState(false);
  const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
  const [widgetShowLog, setWidgetShowLog] = useState(false);
  const [widgetDebugMode, setWidgetDebugMode] = useState(false);
  const [base64ImgString, setbase64ImgString] = useState("");
  const [imageToken, setImageToken] = useState("");

  const widgetRef = createRef();
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    if (!componentMounted) {
      setComponentMounted(true);
    } else {
      if (isWidgetCaptureStarted) {
        const node = widgetRef.current;
        // Setup widget event handlers
        node?.addEventListener("onModuleLoaded", onModuleLoaded);
        node?.addEventListener("onStabilizing", onStabilizing);
        node?.addEventListener("onExtractionFinish", onExtractionFinish);
        node?.addEventListener("onUserCancel", onUserCancel);
        node?.addEventListener("onExceptionCaptured", onExceptionCaptured);
        node?.addEventListener("onExtractionTimeout", onExtractionTimeout);
        node?.addEventListener("onTimeoutErrorButtonClick",onTimeoutErrorButtonClick);
        node?.addEventListener("onTrackStatus", onTrackStatus);
      }
    }
  });

  useEffect(() => {
    onStartCapture();
  }, []);

  // Widget event handlers
  function onModuleLoaded(eventData) {
    console.warn("[Selphi] onModuleLoaded");

  }

  function onStabilizing(stabilizingResult) {
    console.warn("[Selphi] onStabilizing");
  }

  function onExtractionFinish(extractionResult) {
    console.warn("[Selphi] onExtractionFinish");

    if (extractionResult.detail.bestImage) {
      // Generate template raw from bestImage with generateTemplateRawFromByteArray method
      FPhi.Selphi.Component.generateTemplateRawFromByteArray(
        "../../../assets/selphi",
        extractionResult.detail.bestImage,
        (result) => {
          settemplateResult(result);
        }
      );
      const preimageFixing =extractionResult.detail.bestImageCropped.currentSrc;
      setImageToken(extractionResult.detail.bestImageTokenized);
      setbase64ImgString(preimageFixing);
      setPhotoStarted(false);
    }

    setIsWidgetCaptureStarted(false);
  }

  function onUserCancel() {
    console.warn("[Selphi] onUserCancel");
    setIsWidgetCaptureStarted(false);
    onStartCapture();
  }

  function onExceptionCaptured(exceptionResult) {
    console.warn("[Selphi] onExceptionCaptured");

    setIsWidgetCaptureStarted(false);
  }

  function onExtractionTimeout(extractionTimeoutResult) {
    console.warn("[Selphi] onExtractionTimeout");
  }

  function onTimeoutErrorButtonClick() {
    console.warn("[Selphi] onTimeoutErrorButtonClick");
    setIsWidgetCaptureStarted(false);
    onStartCapture();
  }

  function onTrackStatus(eventData) {
    let trackStatusCode = Object.entries(FPhi.Selphi.TrackStatus).find(
      (e) => e[1] === eventData.detail.code
    );
    console.warn(
      `[Selphi] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`
    );
  }

  // Methods
  async function checkCapabilities() {
    // Check device capabilities (browser, memory, webassembly...) with checkCapabilities method
    let checkCapabilities = await FPhi.Selphi.CheckCapabilities();
    console.log(
      "Selphi: Widget Check Capabilities Check:\n",
      checkCapabilities
    );
  }

  // Miscellaneous
  function onStartCapture() {
    setPhotoStarted(true)
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

  //Services
  const handleEnviarTokens = async () => {
    try {
      const request = {
        token1: templateResult,
        token2: documentoData.images.backDocument,
        token3: documentoData.images.frontDocument,
        numId:  documentoData.extractionData.documentId,
        tipoConsulta: "A",
      };
      /*const verifyData = await verifyBiometricData(request);
      if (verifyData.success) {
        onSelfi(verifyData);
        handleNext();
      } else {
        // handle error, show message, etc.
        setModalTexto(verifyData.mensaje);
        handleModalOpen(true);
      }*/
      handleNext();
    } catch (error) {
      
      console.error("Error comunicandose con el servidor: ", error);
      // handle error, e.g., show an alert or set an error state
    }
  };

  //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTexto, setModalTexto] = useState("");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <style>
        {`
            .facephi-container {
                width: 150px; // Set your desired width
                height: 1000px; // Set your desired height
               
            }
            .h-100 {
                height: 1024px; // This will make facephi-selphi take the full height of the container
                width: 500px; // This will make facephi-selphi take the full width of the container
            }
            .cameraContainer {
              height: 500px!important;
              width: 500px!important;
              min-heigt:500px!important;
            }
        `}
    </style>
    
    <Box
      sx={{
        
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
          <Box align="left"></Box>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                CONFIA
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalTexto}
          </Typography>
        </Box>
      </Modal>

      <Box sx={{  align:"center" }}>
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
            sx={{ bgcolor: { md: "#00559c", lg: "#00559c" } , display: { xs: "none", md: "none", lg: "block" },}}
          >
            <SelfieInstrucciones />
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            sx={{ bgcolor: { lg: "white" }, mb: { xs: 5, lg: 0 } }}
          >
{photoStarted === true &&(
          <Box align="center">
          <Box
            align="center"
            sx={{
              border: 1,
              backgroundColor: "#00559c",
              radius: 2,
              padding: -3,
              margin: 2,
              color: "white",
            }}
          >
            <PersonIcon sx={{ display: "inline", mt: 2 }} />
            <Typography
              variant="h6"
              align="center"
              sx={{ mb: 2, ml: 2, mr: 2 }}
            >
              Coloca tu rostro visiblemente en la camara.
            </Typography>
          </Box>
          <Box sx={{
                width: {sx:500, md:500, lg:550}, 
                height: {sx:500, md:500, lg:550}, 
               
            }}>
          <facephi-selphi
            ref={widgetRef}
            // Setup propierties
            bundlePath={`../../../assets/selphi`}
            language="es"
            cameraWidth={widgetCameraWidth}
            cameraHeight={widgetCameraHeight}
            cameraType={widgetCameraType}
            interactible={false}
            cropImage={true}
            stabilizationStage={widgetStabilizationStage}
            logImages={true}
            cropFactor={1.7}
            showLog={widgetShowLog}
            debugMode={widgetDebugMode}
            timeout={0}

          ></facephi-selphi>
          </Box>
          <div className="facephi-container" style={{minHeight: 550}}>
          
          </div>

        </Box>
        )}
        

            {photoStarted === false && (
              <Box align="center">
                <Typography
              startIcon={PersonIcon}
              variant="h6"
              align="center"
              sx={{ mb: 2, ml: 2, mr: 2,
                fontSize: { lg: "35px" },
                fontWeight: "bold" ,
              
              }}
            >
              Previsualización de Autorretrato
            </Typography>
                 <img src={base64ImgString} alt="Tu Selfie" />
          <Box align="center"  sx={{ mx: 2, maxWidth:{lg:"50%"} }}>
            <Button
              fullWidth
              sx={{ display: "block", mt: 3, maxWidth:{lg:"40%"} }}
              variant="outlined"
              onClick={handleCapturarDeNuevo}
            >
              Capturar de Nuevo
            </Button>
            <Button
              fullWidth
              sx={{ display: "block", mt: 1, color: "white", maxWidth:{lg:"40%"} }}
              variant="contained"
              onClick={handleEnviarTokens}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
            )}

          </Grid>


        </Grid>

        
        

      </Box>
    </Box>
    </>
  );
}

export default SelfieCaptura;
