import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FlexModule } from "@angular/flex-layout";
import { MatButton } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";
import { AdminProductUpdateService } from "./admin-product-update.service";
import { AdminProductUpdate } from "./model/adminProductUpdate";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { map } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminProductFormComponent } from "../admin-product-form/admin-product-form.component";
import { AdminMessageService } from '../admin-message.service';

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
    AdminProductFormComponent,
  ],
  templateUrl: './admin-product-update.component.html',
  styleUrl: './admin-product-update.component.scss',
})
export class AdminProductUpdateComponent implements OnInit {
  private readonly product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly adminProductUpdateService: AdminProductUpdateService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly adminMessageService: AdminMessageService,
  ) {}

  ngOnInit(): void {
    this.getProduct();

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
    });
  }

  getProduct() {
    const id = Number(this.router.snapshot.params['id']);

    this.adminProductUpdateService
      .getProduct(id)
      .pipe(map(mapToAdminProduct))
      .subscribe((newValue) => this.productForm.setValue(newValue));
  }

  submit() {
    const id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService
      .saveProduct(id, this.productForm.value)
      .pipe(map(mapToAdminProduct))
      .subscribe({
        next: (newValue) => {
          this.productForm.setValue(newValue);
          this.snackBar.open('Produkt zosta? zapisany', '', { duration: 3000 });
        },
        error: (err) => this.adminMessageService.addBackendErrors(err.error),
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
