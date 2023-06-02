import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private url = 'http://localhost:3007/ads';

  constructor(private http: HttpClient) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.url);
  }

  save(ad: Ad): Observable<Ad>{
    return this.http.post<Ad>(this.url, ad);
  }

  update(ad: Ad): Observable<Ad>{
    return this.http.put<Ad>(`${this.url}/${ad.id}`, ad);
  }

  delete(ad: Ad): Observable<void>{
    return this.http.delete<void>(`${this.url}/${ad.id}`);
  }
}
