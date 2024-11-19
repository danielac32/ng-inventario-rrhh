export interface Trabajador {
  id_personal: number;
  cedula: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
}

export interface Familiar {
  id_familiar: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  cedula_familiar: number;
  parentesco: string;
  id_personal: number;
}

export interface ResponseAsignacionDetalle {
  trabajador: Trabajador;
  familiar: Familiar;
}


export interface Asignacion {
  id: number;
  trabajadorId: number;
  familiarId: number | null;
  otro: string | null;
  tipo: string;
  observacion: string;
  createdAt: string; // Considera cambiar a Date si deseas manejarlo como objeto Date
  updatedAt: string; // Igual que createdAt
  productos: ProductoInterface[];
}

export interface AsignacionResponse {
  asignacion: Asignacion[];
}


export interface ProductoInterface {
  id: number;
  asignacionId: number;
  productId: number;
  name: string;
  quantity: number;
}
/*
export interface ResponseAsignacion {
  id: number;
  tipo: string;
  observacion: string;
  trabajadorId: number | null;
  familiarId: number | null;
  otro: string | null;
  productos: ProductoInterface[];
  createdAt: string;
  updatedAt: string;
}*/


export interface ResponseAsignacionOtro {
  asignacion:Asignacion[];
}
