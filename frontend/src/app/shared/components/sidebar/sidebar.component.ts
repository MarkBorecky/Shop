import { Component, OnInit } from '@angular/core';
import { MatListOption, MatNavList, MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import { NgForOf } from "@angular/common";
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './model/sidebarCategory';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatSelectionList,
        MatListOption,
        MatNavList,
        NgForOf,
        RouterLink
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  categories: SidebarCategory[] = [];

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sidebarService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  onCategorySelected(event: MatSelectionListChange) {
    const selectedCategorySlug = event.options[0].value;
    this.router.navigate(['/categories', selectedCategorySlug]);
  }
}
