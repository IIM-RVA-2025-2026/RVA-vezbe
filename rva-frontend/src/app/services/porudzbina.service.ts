import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porudzbina } from '../models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private httpClient:HttpClient) {  }

  public getAllPorudzbinas(): Observable<any>{
    return this.httpClient.get(`http://localhost:8082/porudzbina`);
  }

  public createPorudzbina(porudzbina:Porudzbina): Observable<any> {
    return this.httpClient.post(`http://localhost:8082/porudzbina`, porudzbina);
  }

  public updatePorudzbina(porudzbina:Porudzbina): Observable<any> {
    return this.httpClient.put(`http://localhost:8082/porudzbina/${porudzbina.id}`, porudzbina);
  }

  public deletePorudzbina(id:number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8082/porudzbina/${id}`)
  }
}
