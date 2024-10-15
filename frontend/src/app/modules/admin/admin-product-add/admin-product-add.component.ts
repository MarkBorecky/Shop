import { Component, OnInit } from '@angular/core';
import { AdminProductFormComponent } from '../admin-product-form/admin-product-form.component';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProductAddService } from './admin-product-add.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../admin-message.service';

@Component({
  selector: 'app-admin-product-add',
  standalone: true,
  imports: [AdminProductFormComponent, FlexModule, ReactiveFormsModule],
  templateUrl: './admin-product-add.component.html',
  styleUrl: './admin-product-add.component.scss',
})
export class AdminProductAddComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly adminProductAddService: AdminProductAddService,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly adminMessageService: AdminMessageService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
    });
  }

  submit() {
    this.adminProductAddService
      .saveNewProduct(this.productForm.value)
      .subscribe({
        next: (product) => {
          this.router
            .navigate(['/admin/products/update', product.id])
            .then(() =>
              this.snackbar.open('Produkt zosta? dodany', '', {
                duration: 3000,
              }),
            );
        },
        error: (err) => this.adminMessageService.addBackendErrors(err.error),
      });
  }
}
