import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dobavljac } from '../models/dobavljac';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {

  constructor(private httpClient:HttpClient) { }

  public getAllDobavljacs(): Observable<any>{
    return this.httpClient.get(`http://localhost:8082/dobavljac`);
  }

  public createDobavljac(dobavljac:Dobavljac): Observable<any> {
    return this.httpClient.post(`http://localhost:8082/dobavljac`, dobavljac);
  }

  public updateDobavljac(dobavljac:Dobavljac): Observable<any> {
    return this.httpClient.put(`http://localhost:8082/dobavljac/${dobavljac.id}`, dobavljac);
  }

  public deleteDobavljac(id:number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8082/dobavljac/${id}`)
  }
}
