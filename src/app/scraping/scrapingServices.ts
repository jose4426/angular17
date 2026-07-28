import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DollarService {
  private apiUrl = 'https://ve.dolarapi.com/v1/dolares/oficial';
  private apiUrlp = 'https://ve.dolarapi.com/v1/dolares/paralelo';
  private apiUrlE = 'https://ve.dolarapi.com/v1/cotizaciones';

  constructor(private http: HttpClient) {}

  getDollarData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getDollarParalelo(): Observable<any> {
    return this.http.get<any>(this.apiUrlp);
  }
    getEuro(): Observable<any> {
    return this.http.get<any>(this.apiUrlE);
  }
}
