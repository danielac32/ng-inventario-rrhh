export interface Familiar{
    id_familiar: number;
    cedula_familiar: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string; 
    parentesco: string; 
}

export interface ResponseFamiliar{
   familiar:Familiar[]
}


export interface FamiliarInterface {
  primer_nombre: string;
  primer_apellido: string;
  cedula_familiar: number;
  parentesco: string;
}

export interface ProductoAsignado {
  id: number;
  asignacionId?: number;
  productId?: number;
  name: string;
  quantity: number;
}

export interface ResponseAsignacion {
  familiar: FamiliarInterface[];
  productos: ProductoAsignado[];
}


export interface DetailAsignacion {
  familiar: FamiliarInterface;
  productos: ProductoAsignado[];
}
export interface DetailAsignacionTrabajador {
  productos: ProductoAsignado[];
}
export interface ResponseAsignacionProducts {
  productos: ProductoAsignado[];
}
