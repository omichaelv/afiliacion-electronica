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
  const [currentStep, setCurrentStep] = useState(1);
  const [advisorCode, setAdvisorCode] = useState('');

  
  const handleAdvisorCodeChange = (event) => {
    setAdvisorCode(event.target.value);
  };

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

  

  return (
    <div>
      {currentStep === 1 && (
        <AgentePrevisional onNext={irPeps} onAdvisorCodeChange={handleAdvisorCodeChange} />
      )}
      {currentStep === 2 && (<Peps onNext={irFotografiaDocumentos} />)}
      {currentStep === 3 && (<DocumentoScan onNext={irSelfieMensaje} />)}
      {currentStep === 4 && (<SelfieMensaje onNext={irSelfieCaptura} />)}
      {currentStep === 5 && (<SelfieCaptura onNext={irDatosResumen} />)}
      {currentStep === 6 && (<InfoDUI onNext={irDatosContacto} />)}
      {currentStep === 7 && (<InfoContacto onNext={irInfoLaboral} />)}
      {currentStep === 8 && (<InfoLaboral onNext={irInfoLaboral} />)}
      
    </div>
  );
};

export default App;