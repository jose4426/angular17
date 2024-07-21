import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productoInterface } from '../interface/product.interface';
@Injectable({
    providedIn: 'root'
  })
  export class ScraperService {
    constructor(private http: HttpClient) { }
  
    scrapeProducts(): Observable<productoInterface[]> {
      return this.http.get<productoInterface[]>('https://localhost:8088/api/dolar');
    }
  }