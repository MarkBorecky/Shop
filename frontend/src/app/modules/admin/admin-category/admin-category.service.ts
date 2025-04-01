import { HttpClient } from '@angular/common/http';
import { AdminCategoryNameDTO } from './../common/AdminCategoryNameDTO';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategory } from './model/AdminCategory';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<AdminCategoryNameDTO>> {
    return this.http.get<Array<AdminCategoryNameDTO>>("/api/admin/categories")
  }

  createCategory(value: any): Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", value);
  }

  getCategory(id: number): Observable<AdminCategory> {
    return this.http.get<AdminCategory>(`/api/admin/categories/${id}`);
  }

  updateCategory(id: number, category: AdminCategory): Observable<AdminCategory> {
    return this.http.put<AdminCategory>(`/api/admin/categories/${category.id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/categories/${id}`);
  }
}
