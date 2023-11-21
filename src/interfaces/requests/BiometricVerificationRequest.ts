export interface BiometricVerificationRequest {
    token1: string;
    token2: string;
    token3: string;
    num_id: string;
    tipo_consulta: string; // "M", "D", or "A"
  }