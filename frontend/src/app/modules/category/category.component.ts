import { CategoryService } from './category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { CategoryProducts } from './model/categoryProducts';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    MatCardContent,
    RouterLink,
    NgForOf,
    MatPaginator,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts;
  subscription!: Subscription

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd ))
    .subscribe(() => this.getCategoriesWithProducts(0, 10));

    this.getCategoriesWithProducts(0, 10)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoriesWithProducts(page: number, size: number) {
    const slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoriesWithProducts(slug, page, size)
      .subscribe(categoryProducts => this.categoryProducts = categoryProducts);
  }

  onPageEvent(event: PageEvent) {
    this.getCategoriesWithProducts(event.pageIndex, event.pageSize)
  }
}
