import { AdminMessageService } from './../../admin-message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryService } from '../admin-category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCategory } from '../model/AdminCategory';

@Component({
  selector: 'app-admin-category-update',
  standalone: true,
  imports: [],
  templateUrl: './admin-category-update.component.html',
  styleUrl: './admin-category-update.component.scss'
})
export class AdminCategoryUpdateComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {}

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(4)]],
        description: [""],
        slug: ["", [Validators.required, Validators.minLength(4)]]
      });
      this.getCategory();
    }

  getCategory() {
    this.adminCategoryService.getCategory(Number(this.router.snapshot.params['id']))
      .subscribe(category => this.categoryForm.setValue({
        name: category.name,
        description: category.description,
        slug: category.slug
      }));
  }

  submit() {
    this.adminCategoryService.updateCategory(Number(this.router.snapshot.params['id']), this.categoryForm.value)
      .subscribe({
        next: category => {
          this.mapFormToValue(category);
          this.snackBar.open('Kategoria została zapisana', '', { duration: 3000 })
        },
        error: err => {
          this.adminMessageService.addBackendErrors(err.error)
        }
      })
  }

  mapFormToValue(category: AdminCategory) {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
  }
}
