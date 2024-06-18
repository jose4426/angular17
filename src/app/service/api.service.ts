import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { productoInterface } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private tokenKey = 'authToken';
API_URL: string =   "http://localhost:8088/cambio";

  constructor( private http: HttpClient) { }

  public getProducts(): Observable<productoInterface[]> {
    return this.http.get<productoInterface []>(`${this.API_URL}/lista`);
   
  }
  public delete(id: string): Observable<void>{
    console.log("entro en el boton eliminar ")
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }
  public update(productoInterface: productoInterface): Observable<productoInterface>{
    console.log("entro en el boton actualizar ")
    return this.http.put<productoInterface>(`${this.API_URL}/update/productoSeleccionado`,productoInterface);
  }
  public insertarProducto(productoInterface: productoInterface): Observable<productoInterface>{
    console.log("entro en el boton inser ")
    return this.http.post<productoInterface>(`${this.API_URL}/create`,productoInterface);
  }
}


