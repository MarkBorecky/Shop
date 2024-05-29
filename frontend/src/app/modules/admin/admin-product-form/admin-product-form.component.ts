import {Component, Input, OnInit} from "@angular/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
        MatButton
    ],
    template: `
        <div [formGroup]="parentForm" fxLayout="column">
            <mat-form-field appearance="fill">
                <mat-label>name</mat-label>
                <input matInput placeholder="Podaj nazw?" formControlName="name">
            </mat-form-field>

            <mat-form-field appearance="fill">
                <mat-label>Opis</mat-label>
                <textarea matInput row="20" placeholder="Podaj opis productu" formControlName="description"></textarea>
            </mat-form-field>

            <mat-form-field appearance="fill">
                <mat-label>price</mat-label>
                <input matInput placeholder="podaj cen? produktu" formControlName="price">
            </mat-form-field>

            <mat-form-field appearance="fill">
                <mat-label>currency</mat-label>
                <input matInput placeholder="podaj walut? produktu" formControlName="currency">
            </mat-form-field>

            <div>
                <button mat-flat-button color="primary">Zapisz</button>
            </div>
        </div>`
})
export class AdminProductFormComponent {
    @Input() parentForm!: FormGroup;

}