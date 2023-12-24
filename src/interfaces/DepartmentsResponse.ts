export interface Department {
    codDepartamento : string;
    nombreDepartamento : string;
  }
  
  export interface DepartmentsResponse {
    success: boolean;
    departamentos: Department[];
  }