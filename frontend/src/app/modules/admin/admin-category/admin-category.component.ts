import { AdminCategoryService } from './admin-category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from '../../../shared/model/page';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AdminCategoryNameDTO } from '../common/AdminCategoryNameDTO';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    RouterLink,
    MatButton,
    MatIconButton,
  ],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent implements OnInit {

  categories: Array<AdminCategoryNameDTO> = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private adminCategoryService: AdminCategoryService,
    private dialogService: AdminConfirmDialogService
  ){}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.adminCategoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  confirmDelete(element: any) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć kategorię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminCategoryService.delete(element.id)
            .subscribe(() => {
              this.categories.forEach((value, index) => {
                if (element == value) {
                  this.categories.splice(index, 1);
                  this.table.renderRows();
                }
              })
            });
        }
      });
  }

}

