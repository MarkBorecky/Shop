import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {NgForOf} from "@angular/common";
import {ProductService} from "./product.service";
import {Product} from "./model/product";

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
        NgForOf
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
    products: Product[] = [];

    ngOnInit(): void {
        this.getProducts();
    }

    constructor(private service : ProductService) {}

    getProducts() {
        this.products = this.service.getProducts();
    }
}
