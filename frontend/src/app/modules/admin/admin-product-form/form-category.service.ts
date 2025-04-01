import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryNameDTO } from '../common/AdminCategoryNameDTO';

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<AdminCategoryNameDTO>> {
    return this.http.get<Array<AdminCategoryNameDTO>>("/api/admin/categories");
  }
}
