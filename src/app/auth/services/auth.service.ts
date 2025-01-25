import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.baseUrl}/v1/auth`; 
  private http: HttpClient = inject(HttpClient)
  userId = signal<string | null>(null)
  
  constructor() {
    const decodedToken = this.getDecodedAccessToken()
    this.userId.set(decodedToken?.id)
  }

  login({ email, password }: { email: string, password: string }) {
    return this.http.post<AuthResponse>( `${this.apiUrl}/login`, {
      email,
      password
    })
  }

  register({ name, email, password }: { name:string, email:string, password:string }) {
    return this.http.post<AuthResponse>( `${this.apiUrl}/register`, {
      name,
      email,
      password
    })
  }

  restorePassword({ id,  newPassword }: { id: string,  newPassword: string }){
    return this.http.post<AuthResponse>( `${this.apiUrl}/restore-password/${id}`, {
      newPassword
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  getToken(): string {
    const token =  localStorage.getItem('token') || sessionStorage.getItem('token');
    return token ?? '';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getDecodedAccessToken(): any {
    try {
      const token = this.getToken()
      return jwt_decode.jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}