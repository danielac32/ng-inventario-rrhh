
import {Categoria} from './categorias-interface'

export interface ListTipo{
	tipo:string;
    value:string;
}

export interface ProductForm {
  nombre: string;
  descripcion: string;
  codigo: string;
  stock: number;
  tipo: string;
  categoriaId:number;
}

export interface UpdateProduct{
  nombre?: string;
  descripcion?: string;
  codigo?: string;
  stock?: number;
  tipo?: string;
  categoriaId?:number;
}

 

export interface Producto {
  id: number;
  descripcion: string;
  codigo: string;
  stock: number;
  nombre: string;
  categoriaId: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
  categoria: Categoria;
}

export interface ResponseProduct {
  producto: Producto[];
}

export interface ResponseProductOne {
  producto: Producto;
}
 