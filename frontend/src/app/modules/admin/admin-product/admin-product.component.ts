import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {AdminProductService} from "./admin-product.service";
import {MatPaginator} from "@angular/material/paginator";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./adminProduct";
import {Page} from "../../../shared/model/page";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-admin-product',
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginator,
        MatIcon,
        RouterLink,
        MatButton
    ],
    templateUrl: './admin-product.component.html',
    styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ["id", "name", "price", "actions"];
    page: Page<AdminProduct> = {content: [], totalElements: 0};

    constructor(private service: AdminProductService) {
    }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
            startWith({}),
            switchMap(() => {
                return this.service.getProducts({
                    page: this.paginator.pageIndex,
                    pageSize: this.paginator.pageSize
                })
            })
        ).subscribe((page: Page<AdminProduct>) => this.page = page);
    }
}
