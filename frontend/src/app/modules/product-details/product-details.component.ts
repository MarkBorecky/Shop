import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetails } from './model/ProductDetails';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Review } from './model/review';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    FlexModule,
    MatButtonModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: ProductDetails;
  reviewForm!: FormGroup;

  constructor(
    private readonly productDetailsService: ProductDetailsService,
    private readonly router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.reviewForm = this.formBuilder.group({
      authorName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(600),
        ],
      ],
    });
  }

  getProductDetails() {
    const slug = this.router.snapshot.params['slug'];
    this.productDetailsService
      .getProductDetails(slug)
      .subscribe((product) => (this.product = product));
  }

  submit() {
    if (this.reviewForm.valid) {
      const review: Review = {
        authorName: this.reviewForm.get('authorName')?.value,
        content: this.reviewForm.get('content')?.value,
        productId: this.product.id,
      };
      this.productDetailsService
        .saveProductReview(review)
        .subscribe((review) => {
          this.reviewForm.reset();
          this.snackBar.open('Dziekujemy za garść interesujących informacji, ale mamy to w d....', '', { duration: 5000, panelClass: ['snack-bar-bg-color-ok'] })
        });
    }
  }

  get authorName() {
    return this.reviewForm.get('authorName');
  }

  get content() {
    return this.reviewForm.get('content');
  }
}
