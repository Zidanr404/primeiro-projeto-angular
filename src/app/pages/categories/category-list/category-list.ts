import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "../../../app.routes";

import { category } from '../shared/category.model';
import { CategoryService } from "../shared/category.service";


@Component({
  selector: 'app-category-list',
  imports: [AppRoutingModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})


export class CategoryList implements OnInit {
  categories: category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
