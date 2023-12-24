export interface FirmarDocumentoResponse {
    success: boolean;
    mensaje: string;
    pakageId?: string;
    codCliente?: string;
    firmantes?: FirmanteResponse[];
  }
  
  export interface FirmanteResponse {
    url: string;
    roleId: string;
  }