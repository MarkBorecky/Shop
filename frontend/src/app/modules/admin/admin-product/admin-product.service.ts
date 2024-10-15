import {Injectable} from '@angular/core';
import {Pageable} from "../../../shared/model/pageable";
import {Observable} from "rxjs";
import {Page} from "../../../shared/model/page";
import {HttpClient} from "@angular/common/http";
import {AdminProduct} from "./adminProduct";

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(pageable: Pageable): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(
      `/api/admin/products?page=${pageable.page}&size=${pageable.pageSize}`,
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/products/${id}`);
  }
}
