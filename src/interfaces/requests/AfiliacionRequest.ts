export interface AfiliacionRequest {
    tipo_id: string;
    num_id: string;
    proceso_id: string;
    descripcion: string;
    ocr_data: OCRData;
    documentos: Documento[];
  } 
  
  
  export interface OCRData {
    cod_cliente: string;
    tipo_documento: string;
    D_Address: string;
    D_Back_INPUT_Issuer: string;
    D_Back_ML_MaritalStatus: string | null;
    D_Back_ML_MotherName: string | null;
    D_Back_ML_ProcedureType: string | null;
    D_Back_ML_State: string | null;
    D_Back_ML_ZipCode: string | null;
    D_MRZ_DateOfBirth: string;
    D_MRZ_DateOfExpiry: string;
    D_MRZ_DocumentCode: string;
    D_MRZ_DocumentNumber: string;
    D_MRZ_FirstName: string;
    D_MRZ_FullName: string;
    D_MRZ_Gender: string;
    D_MRZ_Issuer: string;
    D_MRZ_LastName: string;
    D_MRZ_MrzText: string;
    D_MRZ_Nationality: string;
    D_MRZ_NfcKey: string;
    D_Back_MRZ_NUI_N: string | null;
    D_MRZ_Opt1: string | null;
    D_MRZ_PrimaryID: string;
    D_MRZ_SecondaryID: string;
    D_MRZ_Verified: string;
    D_DateOfBirth: string;
    D_DateOfExpiry: string;
    D_DateOfIssue: string;
    D_DocumentCaptured: string;
    D_DocumentNumber: string;
    D_FirstName: string;
    D_Front_INPUT_Issuer: string;
    D_Front_ML_DateOfBirth: string;
    D_Front_ML_DateOfExpiry: string;
    D_Front_ML_DateOfIssue: string;
    D_Front_ML_DocumentNumber: string;
    D_Front_ML_FirstName: string;
    D_Front_ML_LastName: string;
    D_Front_ML_PlaceOfBirth: string;
    D_Front_ML_PlaceOfIssue: string | null;
    D_Front_ML_SalvadoreanBy: string | null;
    D_Gender: string;
    D_Issuer: string;
    D_LastName: string;
    D_MatchingSidesScore: string;
    D_Nationality: string;
    D_NfcKey: string;
    D_PlaceOfBirth: string;
    correo_electronico: string;
    telefono: string;
    acepta_terminos: string;
    patron_biometrico: string;
    selfie: string;
    nombre1: string;
    nombre2: string;
    nombre3: string;
    apellido1: string;
    apellido2: string;
    apellido_casada: string;
    preposicion_ape: string;
    nacionalidad: string;
    conocido_por: string;
    direccion: string;
    departamento: string;
    municipo: string;
    pais: string;
    reside_en_salvador: string;
    tipo_trabajador: string;
    profesion: string;
    razon_social: string;
    fecha_inicio_labores: string;
    nit: string;
    telefono_empleador: string;
    depto_empleador: string;
    municipio_empleador: string;
    pais_empleador: string;
    correo_electronico_empleador: string;
    codigo_agente: string;
    nombre_agente: string;
    es_pep: string;
    familiar_pep: string;
    actividad_economica: string;
  }
  

interface Documento {
    tipo_documento: string;
    nombre_documento: string;
    base64: string;
  }
