import { Component, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

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
  ],
  template: ` <div [formGroup]="parentForm" fxLayout="column">
    <mat-form-field appearance="fill">
      <mat-label>name</mat-label>
      <input matInput placeholder="Podaj nazw?" formControlName="name" />
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
      <input
        matInput
        placeholder="podaj kategorię produktu"
        formControlName="category"
      />
      <div *ngIf="category?.invalid && (category?.dirty || category?.touched)">
        <div *ngIf="category?.errors?.['required']" class="errorMessages">
          Kategoria jest wymagana
        </div>
        <div *ngIf="category?.errors?.['minlength']" class="errorMessages">
          Kategoria musi mieć 4 znaki
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
export class AdminProductFormComponent {
  @Input() parentForm!: FormGroup;

  get name() {
    return this.parentForm.get('name');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get category() {
    return this.parentForm.get('category');
  }

  get price() {
    return this.parentForm.get('price');
  }

  get currency() {
    return this.parentForm.get('currency');
  }

  protected readonly JSON = JSON;
}
