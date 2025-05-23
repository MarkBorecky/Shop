import { AdminMessageService } from './../../admin-message.service';
import { AdminCategoryService } from './../admin-category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';


import { AdminCategoryFormComponent } from "../admin-category-form/admin-category-form.component";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-category-add',
  standalone: true,
  imports: [AdminCategoryFormComponent, FlexModule, ReactiveFormsModule],
  templateUrl: './admin-category-add.component.html',
  styleUrl: './admin-category-add.component.scss'
})
export class AdminCategoryAddComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      description: [""],
      slug: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  submit() {
    this.adminCategoryService.createCategory(this.categoryForm.value)
      .subscribe({
        next: category => {
          this.router.navigate(["/admin/categories"])
            .then(() => this.snackBar.open('Kategoria została dodana', '', { duration: 3000 }));
        },
        error: err => {
          this.adminMessageService.addBackendErrors(err.error);
        }
      })
  }
}
