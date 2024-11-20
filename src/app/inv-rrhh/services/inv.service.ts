import { Injectable,inject } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {ResponseCategorias,ResponseCategoriaOne} from '../interfaces/categorias-interface'
import {ProductForm,ResponseProduct,ResponseProductOne} from '../interfaces/createProduct-interface'
import {ResponseTrabajador} from '../interfaces/trabajador-interface'
import {ResponseFamiliar} from '../interfaces/familiar-interface'
import {ResponseHistoryProduct} from '../interfaces/history-interface'
import {ResponseAsignacionDetalle,ResponseAsignacionOtro} from '../interfaces/asignacion-interface'
import {AsignacionResponse} from '../interfaces/asignacion-interface'
import {ResponseAsignacion,ResponseAsignacionProducts} from '../interfaces/familiar-interface'
import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver
 

@Injectable({
  providedIn: 'root'
})
export class InvService {

  private baseUrl = environment.apiUrl;//'http://localhost:4000';
  private httpClient=inject(HttpClient);

  checkProductStockAvailable(id: number,value:number): Observable<any>{
     const params = new HttpParams()
       .set('id', id.toString())
       .set('value', value.toString());
      return this.httpClient.get<any>(`${ this.baseUrl }/inv/productoAvailable`, { params });
  }

  getCategoria(id: number): Observable<ResponseCategorias> {
      return this.httpClient.get<ResponseCategorias>(`${ this.baseUrl }/inv/find/CategoriaTipo/${id}`, {  });
  }

  createProduct(producto:ProductForm): Observable<any>{
  		return this.httpClient.post<any>(`${ this.baseUrl }/inv/producto`, {...producto},{  });
  }
  

  getProductoById(id: number): Observable<ResponseProductOne> {
      return this.httpClient.get<ResponseProductOne>(`${ this.baseUrl }/inv/producto/${id}`, {  });
  }

  getProductoAsignacion(id: number): Observable<ResponseAsignacionOtro> {
  		return this.httpClient.get<ResponseAsignacionOtro>(`${ this.baseUrl }/inv/findAll/productoAsignacion/${id}`, { });
  }
  
  getProducto(id: number): Observable<ResponseProduct> {
      return this.httpClient.get<ResponseProduct>(`${ this.baseUrl }/inv/productoTipo/${id}`, {  });
  }

  getAllProducto(): Observable<ResponseProduct> {
      return this.httpClient.get<ResponseProduct>(`${ this.baseUrl }/inv/producto/`, {  });
  }

  getProductoCategoria(id: number,idCategoria:number): Observable<ResponseProduct> {
  	   const params = new HttpParams()
	     .set('id', id.toString())
	     .set('idCategoria', idCategoria.toString());
  		return this.httpClient.get<ResponseProduct>(`${ this.baseUrl }/inv/productoCategoria`, { params });
  }

  deleteProduct(id: number):Observable<ResponseProductOne> {
      return this.httpClient.delete<ResponseProductOne>(`${ this.baseUrl }/inv/producto/${id}`,{  });
  }

  updateProduct(id: number,update:any):Observable<ResponseProductOne> {
      return this.httpClient.patch<ResponseProductOne>(`${ this.baseUrl }/inv/producto/${id}`,{...update});
  }
  
  addStockProduct(id: number,update:any):Observable<ResponseProductOne> {
      return this.httpClient.patch<ResponseProductOne>(`${ this.baseUrl }/inv/addStockProduct/${id}`,{...update});
  }
  subStockProduct(id: number,update:any):Observable<ResponseProductOne> {
      return this.httpClient.patch<ResponseProductOne>(`${ this.baseUrl }/inv/subStockProduct/${id}`,{...update});
  }
  getHistoryProductId(id: number): Observable<ResponseHistoryProduct> {
      return this.httpClient.get<ResponseHistoryProduct>(`${ this.baseUrl }/inv/getHistoryProductId/${id}`, {  });
  }

/**************************************************************************************************************************/
  createCategoria(producto:{name:string,tipo:string}): Observable<any>{
      return this.httpClient.post<any>(`${ this.baseUrl }/inv/create/Categoria`, {...producto},{  });
  }

  getAllCategoria(): Observable<ResponseCategorias> {
      return this.httpClient.get<ResponseCategorias>(`${ this.baseUrl }/inv/findAll/Categoria/`, {  });
  }

  deleteCategoria(id: number):Observable<ResponseCategoriaOne> {
      return this.httpClient.delete<ResponseCategoriaOne>(`${ this.baseUrl }/inv/remove/Categoria/${id}`,{  });
  }

  updateCategoria(id: number,update:any):Observable<ResponseCategoriaOne> {
      return this.httpClient.patch<ResponseCategoriaOne>(`${ this.baseUrl }/inv/update/Categoria/${id}`,{...update});
  }

  getCategoriaId(id: number): Observable<ResponseCategoriaOne> {
      return this.httpClient.get<ResponseCategoriaOne>(`${ this.baseUrl }/inv/findOne/Categoria/${id}`, {  });
  }


  
  getFamiliares(id: number): Observable<ResponseFamiliar> {
      return this.httpClient.get<ResponseFamiliar>(`${ this.baseUrl }/inv/getFamiliares/${id}`, {  });
  }

  getPersonal(): Observable<ResponseTrabajador> {
      return this.httpClient.get<ResponseTrabajador>(`${ this.baseUrl }/inv/getTrabajadores/`, {  });
  }

  createAsignacion(asig:any): Observable<any>{
      return this.httpClient.post<any>(`${ this.baseUrl }/inv/create/asignacion`, {...asig},{  });
  }

  findAllAsignacion(): Observable<any> {
      return this.httpClient.get<any>(`${ this.baseUrl }/inv/findAll/asignacion/`, {  });
  }

  findAsignacionByTrabajador(id: number): Observable<AsignacionResponse> {
      return this.httpClient.get<AsignacionResponse>(`${ this.baseUrl }/inv/findOne/asignacion/${id}`, {  });
  }
  
  deleteAsignacion(id: number):Observable<any> {
      return this.httpClient.delete<any>(`${ this.baseUrl }/inv/remove/asignacion/${id}`,{  });
  }

  getProductoAsignado(idAsignacion: number,idFamiliar:number): Observable<ResponseAsignacion> {
       const params = new HttpParams()
       .set('idAsignacion', idAsignacion.toString())
       .set('idFamiliar', idFamiliar.toString());
      return this.httpClient.get<ResponseAsignacion>(`${ this.baseUrl }/inv/findAll/ProductoAsignado`, { params });
  }
  getProductoAsignado2(idAsignacion: number): Observable<ResponseAsignacionProducts> {
       const params = new HttpParams()
       .set('idAsignacion', idAsignacion.toString());
      return this.httpClient.get<ResponseAsignacionProducts>(`${ this.baseUrl }/inv/findAll/ProductoAsignado2`, { params });
  }
/***************************************************************************************/

/*
  createReport(report:any){
    this.httpClient.post(`${ this.baseUrl }/inv/create/report`, { ...report, responseType: 'blob' }).subscribe((blob) => {
        if (blob instanceof Blob) {
            saveAs(blob, `${report.cedule}`); // Ajusta la extensión según el tipo de archivo
        } else {
            console.error('El resultado no es un Blob');
        }
      }, error => {
        console.error('File download error:', error);
      });
  }

*/

createReport(report:any){
  this.httpClient.post(`${ this.baseUrl }/inv/create/report`,report, { responseType: 'blob' })
    .subscribe((blob) => {
      if (blob instanceof Blob) {
        saveAs(blob, `${report.trabajadorId}.xlsx`);
      } else {
        console.error('El resultado no es un Blob');
      }
    }, error => {
      console.error('File download error:', error);
    });
}


createReportFamiliar(report:any){
  this.httpClient.post(`${ this.baseUrl }/inv/create/report/familiar`,report, { responseType: 'blob' })
    .subscribe((blob) => {
      if (blob instanceof Blob) {
        saveAs(blob, `${report.familiarId}.xlsx`);
      } else {
        console.error('El resultado no es un Blob');
      }
    }, error => {
      console.error('File download error:', error);
    });
}


createReportOtro(report:any){
  this.httpClient.post(`${ this.baseUrl }/inv/create/report/otro`,report, { responseType: 'blob' })
    .subscribe((blob) => {
      if (blob instanceof Blob) {
        saveAs(blob, `otro.xlsx`);
      } else {
        console.error('El resultado no es un Blob');
      }
    }, error => {
      console.error('File download error:', error);
    });
}



createReportTotal(report:any){
  this.httpClient.post(`${ this.baseUrl }/inv/create/report/total`,report, { responseType: 'blob' })
    .subscribe((blob) => {
      if (blob instanceof Blob) {
        saveAs(blob, `total.xlsx`);
      } else {
        console.error('El resultado no es un Blob');
      }
    }, error => {
      console.error('File download error:', error);
    });
}




}
