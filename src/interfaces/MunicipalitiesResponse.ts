export interface Municipality {
    cod_municipio: string;
    nombre_municipio: string;
  }
  
  export interface MunicipalitiesResponse {
    success: boolean;
    municipios: Municipality[];
  }
  