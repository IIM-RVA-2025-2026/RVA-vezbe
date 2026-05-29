import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artikl } from '../models/artikl';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  constructor(private httpClient:HttpClient) {  }

  public getAllArtikls(): Observable<any>{
    return this.httpClient.get(`http://localhost:8082/artikl`);
  }

  public createArtikl(artikl:Artikl): Observable<any> {
    return this.httpClient.post(`http://localhost:8082/artikl`, artikl);
  }

  public updateArtikl(artikl:Artikl): Observable<any> {
    return this.httpClient.put(`http://localhost:8082/artikl/${artikl.id}`, artikl);
  }

  public deleteArtikl(id:number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8082/artikl/${id}`)
  }
}
