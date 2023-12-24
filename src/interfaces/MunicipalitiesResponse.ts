export interface Municipality {
    codMunicipio : string;
    nombreMunicipio : string;
  }
  
  export interface MunicipalitiesResponse {
    success: boolean;
    municipios: Municipality[];
  }
  