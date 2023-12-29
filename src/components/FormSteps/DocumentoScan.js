import React, {
  Ref,
  createRef,
  useEffect,
  useState,
  useRef
} from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import logo from "../../logo.svg";
import { FPhi } from "@facephi/selphid-widget-web";
import IntroInfo from "./shared/IntroInfo";


function DocumentoScan({ onNext, onScanId }) {
  const [documento, setDocumento] = useState("");

  const [aceptoTerminos, setAceptoTerminos] = useState("");
  const [tipoCaptura, settipoCaptura] = useState("");
  const [capturarData, setcapturarData] = useState(false);
  
  const [imagesFrontal, setImagesFrontal] = useState("");
  const [imagesReversa, setImagesReversa] = useState("");
  const [imageFace, setimageFace] = useState("");

  const handleTerminos = (event) => {
    setAceptoTerminos("Si");
    settipoCaptura("Frontal");
  };

  const handleResetCamara = (event) => {
    onStartCapture();
    setcapturarData(false);
  }

  const handleNext = () => {
    onScanId(documento);
    onNext();
  };

   //Service

 

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

  // PhotoIdDocument

  const FPhiCameraResolutions = {
    res480p: { title: "640x480", width: 640, height: 480 },
    res600p: { title: "800x600", width: 800, height: 600 },
    res768p: { title: "1024x768", width: 1024, height: 768 },
    res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
    res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
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
    const licenseKey = process.env.REACT_APP_LICENCE_KEY;
    setWidgetLicenseKey(licenseKey);

    // Load widget resources before it starts (Need server headers to be configured)
    FPhi.SelphID.generateBrowserCache(
      `../../../assets/selphid`,
      process.env.REACT_APP_LICENCE_KEY
    );
  }

  useEffect(() => {
    onStartCapture();
  }, []);

  const startSimpleMode = () => {
    setWidgetStartSimpleMode(true);
    setIsWidgetCaptureStarted(true);
  };

  const onCameraResolutionSet = (event) => {
    setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
    setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

    setWidgetCameraResolution(event.target.value);
  };

  const onStartCapture = async () => {
    console.warn(">>>> [app] onStartCapture");

    checkCapabilities();

    setIsWidgetCaptureStarted(true);
  };

  const onStopCapture = () => {
    console.warn(">>>> [app] onStopCapture");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  // Widget event handlers
  const onModuleLoaded = (eventData) =>
    console.warn("[SelphID] onModuleLoaded", eventData);

  const onExtractionFinished = (extractionResult) => {
    console.warn("[SelphID] onExtractionFinished");
    console.log(extractionResult);

    setIsWidgetCaptureStarted(false);
    setcapturarData(true);
    setDocumento(extractionResult.detail);
    setImagesFrontal(extractionResult.detail.images.frontDocument);
    setImagesReversa(extractionResult.detail.images.backDocument);
    setimageFace(extractionResult.detail.images.faceImage);
  };

  const onUserCancelled = () => {
    console.warn("[SelphID] onUserCancelled");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onExceptionCaptured = (exceptionResult) => {
    console.warn("[SelphID] onExceptionCaptured");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onExtractionTimeout = (eventInfo) => {
    console.warn("[SelphID] onExtractionTimeout", eventInfo);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onTrackStatus = (eventData) => {
    let trackStatusCode =
      Object.entries(FPhi.SelphID.TrackStatus).find(
        (e) => e[1] === eventData.detail.code
      ) || [];
    console.warn(
      `[SelphID] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`
    );
  };

  // Methods
  async function checkCapabilities() {
    // Check device capabilities (browser, memory, webassembly...) with checkCapabilities method
    let checkCapabilities = await FPhi.SelphID.CheckCapabilities();
    console.log(
      "SelphID: Widget Check Capabilities Check:\n",
      checkCapabilities
    );
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
          <Box align="left"></Box>
          <Typography align="center" variant="h6" style={{ flexGrow: 1 }}>
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
          {aceptoTerminos !== "Si" && (
            <Box>
              <Typography
                variant="body4"
                component="h3"
                gutterBottom
                align="center"
                sx={{ mt: 5 }}
              >
                <CameraAltIcon
                  color={"00559c"}
                  sx={{
                    fontSize: { xs: "70px", md: "70px", lg: "150px" },
                    alignText: { lg: "center" },
                  }}
                />
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "25px" } }}
              >
                ¿Aceptas los términos y condiciones para guardar la información
                e imagenes que nos vas a compartir en el proceso y acceder a la
                cámara de tu dispositivo?
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "25px" } }}
              >
                ¿Aceptas que AFP Confía consulte tu información con el Registro
                natural de las Personas Naturales (RNPN)?
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ my: 2, ml: 2, mr: 2, fontSize: { lg: "25px" } }}
              >
                He leído las cláusulas del contrato de Afiliación.
              </Typography>
              <Box align="center">
                <Button
                  sx={{
                    fontSize: { lg: "20px" },
                    backgroundColor: "transparent",
                    color: "blue",
                    textTransform: "none",
                    textDecoration: "underline",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "none",
                      color: "darkblue",
                    },
                  }}
                  href="https://example.com"
                  color="primary"
                  variant="contained"
                >
                  Ver Términos y Condiciones
                </Button>
              </Box>

              <Box align="center">
                <Button
                  variant="contained"
                  /*onClick={handleTerminos}*/
                  onClick={handleTerminos}
                  sx={{ mt: 3, mr: 2 }}
                >
                  Aceptar
                </Button>
                <Button variant="outlined" sx={{ mt: 3 }}>
                  Cancelar
                </Button>
              </Box>
            </Box>
          )}

          {aceptoTerminos === "Si" && capturarData === false && (
            <Box>
              
                <Box
                  sx={{
                    width: "100%",
                    height: "70vh",
                    minHeight: "550",
                  }}
                >
                  <facephi-selphid
                    ref={widgetRef}
                    className={`bg-dark`}
                    style={{
                      width: "100%",
                      height: widgetForceLandscape ? "56.25%" : "100%",
                    }}
                    // Setup propierties
                    bundlePath="../../../assets/selphid"
                    licenseKey={widgetLicenseKey}
                    language="es"
                    documentAspectRatio={85.6 / 53.98}
                    previewCapture={widgetPreviewCapture}
                    forceLandscape={true}
                    initialTip={widgetInitialTip}
                    imageFormat={"image/jpeg"}
                    cameraWidth={widgetCameraWidth}
                    cameraHeight={widgetCameraHeight}
                    specificData={"ES"}
                    startSimpleMode={widgetStartSimpleMode}
                    videoRecord={widgetVideoRecord}
                    videoRecordType={FPhi.SelphID.RecorderType.Remote}
                    videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}
                    askSimpleMode={true}
                    showLog={widgetShowLog}
                    debugMode={widgetDebugMode}
                    captureRetries={200}
                    captureTimeout={0}
                    cameraSelection={true}
                  ></facephi-selphid>
                </Box>
              

            
            </Box>
          )}

          {aceptoTerminos === "Si" && capturarData === true  && (
            <Box align="center" style={{ objectFit: "contain" }}>
              <Grid container spacing={2}>
  {/* First Row */}
  <Grid item xs={12} md={6}>
    <Typography
      variant="h6"
      align="center"
      sx={{ mb: 2, ml: 2, mr: 2, fontSize: { lg: "35px" }, fontWeight: "bold" }}
    >
      Adelante
    </Typography>
    <Box
      component="img"
      sx={{
        width: { xs: '100%', md: '300px', lg: '400px' },
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      src={imagesFrontal}
      alt="Tu Documento Frontal"
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <Typography
      variant="h6"
      align="center"
      sx={{ mb: 2, ml: 2, mr: 2, fontSize: { lg: "35px" }, fontWeight: "bold" }}
    >
      Atrás
    </Typography>
    <Box
      component="img"
      sx={{
        width: { xs: '100%', md: '300px', lg: '400px' },
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      src={imagesReversa}
      alt="Tu Documento Atrás"
    />
  </Grid>

  {/* Second Row */}
  <Grid item xs={12}>
    <Typography
      variant="h6"
      align="center"
      sx={{ mb: 2, ml: 2, mr: 2, fontSize: { lg: "35px" }, fontWeight: "bold" }}
    >
      Foto DUI
    </Typography>
    <Box
      component="img"
      sx={{
        width: { xs: '100%', md: '300px', lg: '400px' },
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      src={imageFace}
      alt="Tu Retrato"
    />
  </Grid>
</Grid>

              <Box align="center" sx={{ margin: 2 }}>
                <Typography
                  startIcon={CreditCardIcon}
                  variant="h6"
                  align="center"
                  sx={{
                    border: 1,
                    backgroundColor: "#f3f4f6",
                    radius: 2,
                    padding: -3,
                    margin: 2,
                    color: "#00559c",
                  }}
                >
                  Confirmo que el documento escaneado es de mi propiedad
                </Typography>
                <Box align="center">
                  <Button
                    sx={{ mt: 1, mr: 2 }}
                    variant="contained"
                    onClick={handleNext}
                  >
                    Si
                  </Button>
                  <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={handleResetCamara}
                  >
                    No
                  </Button>
                  <Button
                    sx={{ display: "block", mt: 3 }}
                    variant="outlined"
                    onClick={handleResetCamara}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DocumentoScan;
