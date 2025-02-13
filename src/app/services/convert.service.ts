import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {

  private apiUrl = 'http://localhost:3000';
  private apiUrlImages = 'http://localhost:3000/images';

  constructor(private http: HttpClient) { }



  postData(apiUrl: string, formData: FormData): any {
    return this.http.post(apiUrl, formData);
  }

  getImages(): Observable<{ listeImages: string[] }> {
    return this.http.get<{ listeImages: string[] }>(this.apiUrlImages);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Clé 'file' conforme à ton API
    return this.http.post(this.apiUrl, formData);
  }

}
