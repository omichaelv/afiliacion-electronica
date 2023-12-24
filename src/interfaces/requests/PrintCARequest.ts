export interface PrintCARequest {
  fechaFormulario: string; // Nuevo campo añadido
  nombreCompleto: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  apellidoCasada: string;
  numeroIsss: string; // Antes numero_isss
  numeroInpep: string; // Nuevo campo añadido
  telDomicilio: string; // Nuevo campo añadido
  nacionalidad: string;
  conocidoPor: string; // Antes conocido_por
  telCelular: string; // Antes tel_celular
  correoElectronico: string; // Antes correo_electronico
  direccion: string;
  sexo: string;
  fechaNacimiento: string; // Antes fecha_nacimiento
  numeroDocumento: string; // Antes numero_documento
  tipoDocumento: string; // Antes tipo_documento
  lugarExpedicion: string; // Antes lugar_expedicion
  deptoExpedicion: string; // Antes depto_expedicion
  municipioExpedicion: string; // Antes municipio_expedicion
  paisExpedicion: string; // Antes pais_expedicion
  fechaExpedicion: string; // Antes fecha_expedicion
  fechaExpiracion: string; // Antes fecha_expiracion
  estadoFamiliar: string; // Antes estado_familiar
  resideEnSalvador: string; // Antes reside_en_salvador
  referencia: string; // Nuevo campo añadido
  departamento: string;
  municipio: string; // Corregido de 'municipo'
  pais: string;
  tipoTrabajador: string; // Antes tipo_trabajador
  primeraRelacionLaboral: string; // Nuevo campo añadido
  profesion: string;
  masDeUnEmpleador: string; // Nuevo campo añadido
  razonSocial: string; // Antes razon_social
  fechaInicioLabores: string; // Antes fecha_inicio_labores
  nit: string;
  telefonoEmpleador: string; // Antes telefono_empleador
  deptoEmpleador: string; // Antes depto_empleador
  municipioEmpleador: string; // Antes municipio_empleador
  paisEmpleador: string; // Antes pais_empleador
  codigoPostalEmpleador: string; // Nuevo campo añadido
  direccionEmpleador: string; // Nuevo campo añadido
  correoElectronicoEmpleador: string; // Antes correo_electronico_empleador
  codigoAgente: string; // Antes codigo_agente
  esPep: string;
  familiarPep: string;
  procedenciaFondos: string; // Nuevo campo añadido
  actividadEconomica: string;
  firmaObservaciones: string; // Nuevo campo añadido
}