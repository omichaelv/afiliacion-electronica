
export interface FirmarDocumentoRequest {
    idProceso : string;
    subject: string;
    codCliente : string;
    cantidadFirmantes: number;
    cantidadDocumentos: number;
    fechaExpiracion: string;
    firmantes: Firmante[];
    documentos: Documento[];
  }
  
  export interface Firmante {
    correlativo: number;
    email: string;
    compania: string;
    apellido: string;
    nombre: string;
    verificacion: string;
    celular: string;
  }
  
  export interface Documento {
    tipoDocumento: number;
    nombreDocumento: string;
    base64: string;
    firma: Firma[];
  }
  
  export interface Firma {
    correlativo: number;
  }
  
