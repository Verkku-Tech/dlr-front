import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.baseUrl}/v1/categories`; 
  http: HttpClient = inject(HttpClient)
  
  get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}`)
  }
}
