

export interface Modificacion {
  id: number;
  tipo: string;            // Tipo de modificación (ejemplo: "SUMA" o "RESTA")
  cantidad: number;        // Cantidad modificada
  productoId: number;      // ID del producto asociado
  asignacionId?: number | null;  // ID de la asignación asociada, puede ser null
  entregado?: string | null;      // Estado de entrega (ejemplo: "NO")
  observacion?: string | null;  // Observación de la modificación, puede ser null
  createdAt?: string | null;       // Fecha de creación
  updatedAt?: string | null;       // Fecha de última actualización
}

export interface HistoryProduct {
  id: number;
  nombre?: string | null;         // Nombre del producto (ejemplo: "Ibuprofeno")
  codigo?: string | null;         // Código único del producto (ejemplo: "IBUP456")
  descripcion?: string | null;    // Descripción del producto
  stock?: number | null;           // Stock disponible
  tipo?: string | null;            // Tipo de producto (ejemplo: "MEDICAMENTOS")
  categoriaId?: number | null;     // ID de la categoría a la que pertenece el producto
  createdAt?: string | null;       // Fecha de creación
  updatedAt?: string | null;       // Fecha de última actualización
  modificaciones: Modificacion[];  // Array de modificaciones asociadas al producto
}


export interface ResponseHistoryProduct {
  modificaciones: Modificacion[];
}