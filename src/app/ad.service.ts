import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:3007/ads'; // Substitua pela URL do seu servidor JSON

  constructor(private http: HttpClient) { }

  getActiveAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}?status=ativo`);
  }

  getAllAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl);
  }

  createAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad);
  }

  updateAd(ad: Ad): Observable<Ad> {
    return this.http.put<Ad>(`${this.apiUrl}/${ad.id}`, ad);
  }

  deleteAd(adId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${adId}`);
  }
}