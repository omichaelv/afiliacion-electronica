export interface Country {
    codPais : string;
    nombre: string;
    nacionalidad: string;
    codArea: string;
    codEmojiBandera: string;
  }
  
  export interface CountriesResponse {
    success: boolean;
    paises: Country[];
  }