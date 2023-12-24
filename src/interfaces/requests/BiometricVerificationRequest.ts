export interface BiometricVerificationRequest {
    token1: string;
    token2: string;
    token3: string;
    numId: string;
    tipoConsulta : string; // "M", "D", or "A"
  }