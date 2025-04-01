import { FormCategoryService } from './form-category.service';
import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminCategoryNameDTO } from './AdminCategoryNameDTO';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    FlexModule,
    MatInput,
    MatButton,
    NgIf,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  template: ` <div [formGroup]="parentForm" fxLayout="column">
    <mat-form-field appearance="fill">
      <mat-label>name</mat-label>
      <input matInput placeholder="Podaj nazwę" formControlName="name" />
      <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
        <div *ngIf="name?.errors?.['required']" class="errorMessages">
          Nazwa jest wymagana
        </div>
        <div *ngIf="name?.errors?.['minlength']" class="errorMessages">
          Nazwa musi mieć 4 znaki
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Przyjazny url</mat-label>
      <input matInput placeholder="Podaj url" formControlName="slug" />
      <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)">
        <div *ngIf="slug?.errors?.['required']" class="errorMessages">
          Nazwa jest wymagana
        </div>
        <div *ngIf="slug?.errors?.['minlength']" class="errorMessages">
          Nazwa musi mieć 4 znaki
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Opis</mat-label>
      <textarea
        matInput
        row="20"
        placeholder="Podaj opis productu"
        formControlName="description"
      ></textarea>
      <div
        *ngIf="
          description?.invalid && (description?.dirty || description?.touched)
        "
      >
        <div *ngIf="description?.errors?.['required']" class="errorMessages">
          Opis jest wymagana
        </div>
        <div *ngIf="description?.errors?.['minlength']" class="errorMessages">
          Opis musi mieć 4 znaki
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>category</mat-label>
      <!-- <input
        matInput
        placeholder="podaj kategorię produktu"
        formControlName="category"
      /> -->
      <mat-select formControlName="categoryId">
        @for (category of categories; track category) {
          <mat-option [value]="category.id">{{category.name}}</mat-option>
        }
      </mat-select>
      <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)">
        <div *ngIf="categoryId?.errors?.['required']" class="errorMessages">
          Kategoria jest wymagana
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>price</mat-label>
      <input
        matInput
        placeholder="podaj cen? produktu"
        formControlName="price"
      />
      <div *ngIf="price?.invalid && (price?.dirty || price?.touched)">
        <div *ngIf="price?.errors?.['required']" class="errorMessages">
          Cena jest wymagana
        </div>
        <div *ngIf="name?.errors?.['minlength']" class="errorMessages">
          Cena musi być co najmniej równa 0
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>currency</mat-label>
      <input
        matInput
        placeholder="podaj walut? produktu"
        formControlName="currency"
      />
      <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)">
        <div *ngIf="currency?.errors?.['required']" class="errorMessages">
          Waluta jest wymagana
        </div>
      </div>
    </mat-form-field>

    <div fxLayoutAlign="end">
      <button mat-flat-button color="primary" [disabled]="!parentForm.valid">
        Zapisz
      </button>
    </div>
  </div>`,
  styles: [
    `
      .errorMessages {
        color: red;
      }
    `,
  ],
})
export class AdminProductFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  categories: Array<AdminCategoryNameDTO> = [];

  constructor(private formCategoryService: FormCategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.formCategoryService.getCategories()
      .subscribe(categories => this.categories = categories)
  }

  get name() {
    return this.parentForm.get('name');
  }

  get slug() {
    return this.parentForm.get('slug');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get categoryId() {
    return this.parentForm.get('categoryId');
  }

  get price() {
    return this.parentForm.get('price');
  }

  get currency() {
    return this.parentForm.get('currency');
  }

  protected readonly JSON = JSON;
}
