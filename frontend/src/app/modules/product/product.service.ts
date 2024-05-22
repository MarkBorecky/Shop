import {Injectable} from '@angular/core';
import {Product} from "./model/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../shared/model/page";
import {Pageable} from "../../shared/model/pageable";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {
    }

    getProducts(pageable: Pageable): Observable<Page<Product>> {
        return this.http.get<Page<Product>>(`/api/products?page=${pageable.page}&size=${pageable.pageSize}`);
    }
}
