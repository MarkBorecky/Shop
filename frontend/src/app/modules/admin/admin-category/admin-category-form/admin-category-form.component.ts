import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminCategoryNameDTO } from '../../common/AdminCategoryNameDTO';

@Component({
  selector: 'app-admin-category-form',
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
        placeholder="Podaj opis produktu"
        formControlName="description"
      ></textarea>
      <div
        *ngIf="
          description?.invalid && (description?.dirty || description?.touched)
        "
      >
        <div *ngIf="description?.errors?.['required']" class="errorMessages">
          Opis jest wymagany
        </div>
        <div *ngIf="description?.errors?.['minlength']" class="errorMessages">
          Opis musi mieć 4 znaki
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
export class AdminCategoryFormComponent {
  @Input() parentForm!: FormGroup;
  categories: Array<AdminCategoryNameDTO> = [];


  get name() {
    return this.parentForm.get('name');
  }

  get slug() {
    return this.parentForm.get('slug');
  }

  get description() {
    return this.parentForm.get('description');
  }

  protected readonly JSON = JSON;
}
