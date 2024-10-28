export interface Categoria {
  id: number;
  name: string;
  tipo: string;
  createdAt: string; // Puedes usar Date si quieres manejarlo como un objeto de fecha
  updatedAt: string;
}

export interface ResponseCategorias {
  categoria: Categoria[];
}


