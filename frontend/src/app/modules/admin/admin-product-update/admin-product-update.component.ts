import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {AdminProductUpdate} from "./model/adminProductUpdate";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductFormComponent} from "../admin-product-form/admin-product-form.component";

@Component({
    selector: 'app-admin-product-update',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatButton,
        MatLabel,
        FlexModule,
        MatButton,
        ReactiveFormsModule,
        AdminProductFormComponent
    ],
    templateUrl: './admin-product-update.component.html',
    styleUrl: './admin-product-update.component.scss'
})
export class AdminProductUpdateComponent implements OnInit{
    private product!: AdminProductUpdate;
    productForm!: FormGroup;

    constructor(
        private router: ActivatedRoute,
        private adminProductUpdateService: AdminProductUpdateService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getProduct();

        this.productForm = this.formBuilder.group({
            name: [''],
            description: [''],
            category: [''],
            price: [''],
            currency: ['PLN'],
        })
    }

    getProduct() {
        const id = Number(this.router.snapshot.params['id']);

        this.adminProductUpdateService.getProduct(id)
            .pipe(map(mapToAdminProduct))
            .subscribe(newValue => this.productForm.setValue(newValue));
    }

    submit() {
        const id = Number(this.router.snapshot.params['id']);
        this.adminProductUpdateService.saveProduct(id, this.productForm.value)
            .pipe(map(mapToAdminProduct))
            .subscribe(newValue => {
                this.productForm.setValue(newValue);
                this.snackBar.open("Produkt zosta? zapisany", '', {duration: 3000});
            });
    }
}

const mapToAdminProduct = (product: AdminProductUpdate) => ({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    currency: product.currency,
})
