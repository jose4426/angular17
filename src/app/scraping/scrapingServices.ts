import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DollarService {
  private apiUrl = 'https://pydolarve.org/api/v1/dollar?page=bcv';
  private apiUrlp = 'https://pydolarve.org/api/v1/dollar?page=enparalelovzla';

  constructor(private http: HttpClient) {}

  getDollarData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getDollarParalelo(): Observable<any> {
    return this.http.get<any>(this.apiUrlp);
  }
}
