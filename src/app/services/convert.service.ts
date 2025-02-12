import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

 
  postData(apiUrl: string, formData: FormData): any {
    return this.http.post(apiUrl, formData);
  }
  

}
