
export interface FirmarDocumentoRequest {
    id_proceso: string;
    subject: string;
    cod_cliente: string;
    cantidad_firmantes: number;
    cantidad_documentos: number;
    fecha_expiracion: string;
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
    tipo_documento: number;
    nombre_documento: string;
    base64: string;
    firma: Firma[];
  }
  
  export interface Firma {
    correlativo: number;
  }
  
