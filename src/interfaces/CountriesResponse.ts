export interface Country {
    cod_pais: string;
    nombre: string;
    nacionalidad: string;
    cod_area: string;
    cod_emoji_bandera: string;
  }
  
  export interface CountriesResponse {
    success: boolean;
    paises: Country[];
  }