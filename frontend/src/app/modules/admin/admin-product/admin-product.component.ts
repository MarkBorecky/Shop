import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AdminProductService } from './admin-product.service';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { AdminProduct } from './adminProduct';
import { Page } from '../../../shared/model/page';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIcon,
    RouterLink,
    MatButton,
    MatIconButton,
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss',
})
export class AdminProductComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  page: Page<AdminProduct> = { content: [], totalElements: 0 };

  constructor(
    private readonly adminProductService: AdminProductService,
    private readonly dialogService: AdminConfirmDialogService,
  ) {}

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.adminProductService.getProducts({
            page: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
          });
        }),
      )
      .subscribe((page: Page<AdminProduct>) => (this.page = page));
  }

  confirmDelete(element: AdminProduct) {
    this.dialogService
      .openConfirmDialog('Czy na pewno chcesz usun?? przedmiot')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adminProductService.delete(element.id).subscribe(() => {
            this.page.content.forEach((value, index) => {
              if (element == value) {
                this.page.content.splice(index, 1);
                this.table.renderRows();
              }
            });
          });
        }
      });
  }
}
