export interface Department {
    cod_departamento: string;
    nombre_departamento: string;
  }
  
  export interface DepartmentsResponse {
    success: boolean;
    departamentos: Department[];
  }