import { Injectable,inject } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {ResponseCategorias} from '../interfaces/categorias-interface'
import {ProductForm} from '../interfaces/createProduct-interface'



@Injectable({
  providedIn: 'root'
})
export class InvService {

  private baseUrl = environment.apiUrl;//'http://localhost:4000';
  private httpClient=inject(HttpClient);


  getCategoria(id: number): Observable<ResponseCategorias> {
      return this.httpClient.get<ResponseCategorias>(`${ this.baseUrl }/inv/find/CategoriaTipo/${id}`, {  });
  }

  createProduct(producto:ProductForm): Observable<any>{
  		return this.httpClient.post<any>(`${ this.baseUrl }/inv/producto`, {...producto},{  });
  }


}
