

export interface Trabajador{
    id_personal: number;
    cedula: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string; 
}

export interface ResponseTrabajador{
   trabajador:Trabajador[]
}