import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {ProductDetails} from "./model/ProductDetails";
import {ProductDetailsService} from "./product-details.service";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        FlexModule,
        MatButton,
        NgIf
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

    product!: ProductDetails;

    constructor(
        private readonly productDetailsService: ProductDetailsService,
        private readonly router: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.getProductDetails();
    }


    getProductDetails() {
        const slug = this.router.snapshot.params['slug'];
        this.productDetailsService.getProductDetails(slug)
            .subscribe(product => this.product = product);
    }

}
