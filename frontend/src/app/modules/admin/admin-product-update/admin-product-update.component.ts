import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from './model/adminProductUpdate';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProductFormComponent } from '../admin-product-form/admin-product-form.component';
import { AdminMessageService } from '../admin-message.service';
import { NgIf } from '@angular/common';

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
    NgIf,
  ],
  templateUrl: './admin-product-update.component.html',
  styleUrl: './admin-product-update.component.scss',
})
export class AdminProductUpdateComponent implements OnInit {
  private readonly product!: AdminProductUpdate;
  productForm!: FormGroup;
  imageForm!: FormGroup;
  requiredFileTypes = 'image/jpeg, image/png';
  image = '';

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

    this.imageForm = this.formBuilder.group({
      file: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getProduct() {
    const id = Number(this.router.snapshot.params['id']);

    this.adminProductUpdateService
      .getProduct(id)
      .subscribe((newValue) => {
        this.image = newValue.image;
        this.productForm.setValue({
          name: newValue.name,
          description: newValue.description,
          category: newValue.category,
          price: newValue.price,
          currency: newValue.currency,
        });
      });
  }

  submit() {
    const id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService
      .saveProduct(id, {
        ...this.productForm.value,
        image: this.image,
      })
      .subscribe({
        next: (newValue) => {
          this.image = newValue.image;
          this.productForm.setValue({
            name: newValue.name,
            description: newValue.description,
            category: newValue.category,
            price: newValue.price,
            currency: newValue.currency,
          });
          this.snackBar.open('Produkt zosta? zapisany', '', { duration: 3000 });
        },
        error: (err) => this.adminMessageService.addBackendErrors(err.error),
      });
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminProductUpdateService.uploadImage(formData).subscribe((result) => {
      console.log(`new image value ` + result.fileName);
      this.image = result.fileName;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0],
      });
    }
  }
}



