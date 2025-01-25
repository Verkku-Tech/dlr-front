import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { NiceSelectOption } from '../../shared/interfaces/option.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    genderNiceSelectValue = signal<NiceSelectOption | undefined>(undefined)
    private baseUrl = `${environment.baseUrl}/v1/users`; 
    private http: HttpClient = inject(HttpClient)

  changePasswordInternal({ id, oldPassword, newPassword }: { id: string, oldPassword: string, newPassword: string }){
    return this.http.post( `${this.baseUrl}/${id}/change-password`, {
      oldPassword,
      newPassword
    })
  }
  
  getUserDataById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  updateUser(id: string, input: User, file: File | undefined): Observable<User> {
    const formData = new FormData();
    formData.append('email', input.email);
    formData.append('name', input.name);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('gender', input.gender);
    formData.append('address', input.address);
    if(input.imgUrl)
    {
      formData.append('imgUrl', input.imgUrl);
    }
    if (file) {
      formData.append('file', file);
    }

    return this.http.patch<User>(`${this.baseUrl}/${id}`, formData);
  }
}

