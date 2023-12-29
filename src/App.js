// App.js
import React, { useState } from 'react';
import AgentePrevisional from './components/FormSteps/AgentePrevisional';
import Peps from './components/FormSteps/PePs';
import DocumentoScan from './components/FormSteps/DocumentoScan';
import SelfieMensaje from './components/FormSteps/SelfieMensaje';
import SelfieCaptura from './components/FormSteps/SelfieCaptura';
import InfoDUI from './components/FormSteps/InfoDUI';
import InfoContacto from './components/FormSteps/InfoContacto';
import InfoLaboral from './components/FormSteps/InfoLaboral';

const App = () => {
  

  //States From Different Steps
  const [agenteDetails, setAgenteDetails] = useState(null); 
  const [pepsDetails, setpepsDetails] = useState(null); 
  const [scanIdDetails, setScanIdDetails] = useState(null); 
  const [biometricResults, setBiometricResults] = useState(null);
  const [dataContacto, setDataContacto] = useState(null);
  const [dataEmpleador, setDataEmpleador] = useState(null);

  //Function to Save Data From Steps
  const handleAgenteDetails = (details) => {
    setAgenteDetails(details);
  };

  //Steps States
  const [currentStep, setCurrentStep] = useState(3);

  //Step Functions

  const irPeps = () => {
    setCurrentStep(2);
  }
  
  const irFotografiaDocumentos = () => {
      setCurrentStep(3);
  
  };

  const irSelfieMensaje = () => {
    setCurrentStep(4);

  };

  const irSelfieCaptura = () => {
    setCurrentStep(5);

  };

  const irDatosResumen = () => {
    setCurrentStep(6);

  };

  const irDatosContacto = () => {
    setCurrentStep(7);

  };

  const irInfoLaboral = () => {
    setCurrentStep(8);

  };

  const irCorreoConfirmacion= () => {
    setCurrentStep(9);

  };

  const irMensajeConfirmacion = () => {
    setCurrentStep(10);

  };

  

  return (
    <div>
      {currentStep === 1 && (
        <AgentePrevisional onNext={irPeps}  onAgenteDetailsFetched={handleAgenteDetails} />
      )}
      {currentStep === 2 && (<Peps onNext={irFotografiaDocumentos} onPeps={setpepsDetails} />)}
      {currentStep === 3 && (<DocumentoScan onNext={irSelfieMensaje} onScanId={setScanIdDetails} />)}
      {currentStep === 4 && (<SelfieMensaje onNext={irSelfieCaptura}  />)}
      {currentStep === 5 && (<SelfieCaptura onNext={irDatosResumen} onSelfi={setBiometricResults} documentoData={scanIdDetails}/>)}
      {currentStep === 6 && (<InfoDUI onNext={irDatosContacto} infoBiometrica={biometricResults} />)}
      {currentStep === 7 && (<InfoContacto onNext={irInfoLaboral} onDataContacto={setDataContacto} />)}
      {currentStep === 8 && (<InfoLaboral onNext={irInfoLaboral} onDataEmpleador={setDataEmpleador} />)}
      
    </div>
  );
};

export default App;