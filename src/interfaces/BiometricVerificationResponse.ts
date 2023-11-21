export interface BiometricVerificationResponse {
    success: boolean;
    mensaje: string;
    match?: boolean;
    data?: Array<{
      paisDomi: string;
      paisExpe: string;
      estado: string;
      fechNaci: string;
      nacionalidad: string;
      deptNaci: string;
      conoPor: string;
      nom2: string;
      nom1: string;
      foliDui: string;
      muniExpe: string;
      muniDomi: string;
      deptExpe: string;
      deptDomi: string;
      residencia: string;
      muniNaci: string;
      prof: string;
      firma: string;
      ape2: string;
      paisNaci: string;
      foto: string;
      ape1: string;
      fechVenc: string;
      dui: string;
      fechExpe: string;
      sexo: string;
      estaFami: string;
    }>;
  }