import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:3007/ads';

  constructor(private http: HttpClient) { }

  getAllAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl);
  }

  getActiveAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}?status=ativo`);
  }

  save(ad: Ad): Observable<Ad>{
    return this.http.post<Ad>(this.apiUrl, ad);
  }

  update(ad: Ad): Observable<Ad>{
    return this.http.put<Ad>(`${this.apiUrl}/${ad.id}`, ad);
  }

  delete(ad: Ad): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${ad.id}`);
  }
}
