import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post('url', data);
  }

  isLoggned() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
}
