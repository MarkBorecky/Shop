import { Component, OnInit } from '@angular/core';
import { MatListOption, MatSelectionList } from "@angular/material/list";
import { NgForOf } from "@angular/common";
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './model/sidebarCategory';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatSelectionList,
        MatListOption,
        NgForOf,
        RouterLink
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  categories: SidebarCategory[] = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sidebarService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
