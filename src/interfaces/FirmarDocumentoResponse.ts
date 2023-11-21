export interface FirmarDocumentoResponse {
    success: boolean;
    mensaje: string;
    pakageId?: string;
    cod_cliente?: string;
    firmantes?: FirmanteResponse[];
  }
  
  export interface FirmanteResponse {
    url: string;
    roleId: string;
  }