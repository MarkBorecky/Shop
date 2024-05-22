import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {NgForOf} from "@angular/common";
import {ProductService} from "./product.service";
import {Product} from "./model/product";
import {Page} from "../../shared/model/page";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Pageable} from "../../shared/model/pageable";

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        MatButton,
        MatCardContent,
        FlexModule,
        NgForOf,
        MatPaginator
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
    page: Page<Product> = {content: [], totalElements: 0};

    ngOnInit(): void {
        this.getProducts({ page: 0, pageSize: 25});
    }

    constructor(private service: ProductService) {
    }

    getProducts(pageable: Pageable): void {
        this.service.getProducts(pageable)
            .subscribe((page: Page<Product>) => this.page = page);
    }

    onPageEvent(event: PageEvent) {
        this.getProducts({ page: event.pageIndex, pageSize: event.pageSize });
    }
}
