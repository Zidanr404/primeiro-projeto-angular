import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "../../../app.routes";
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category';



@Component({
  selector: 'app-category-list',
  imports: [AppRoutingModule, NgFor, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})


export class CategoryList implements OnInit {
  
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
     categories => this.categories = categories,
     error => console.error('Erro ao carregar categorias')
   )
  }

  deleteCategory(category: Category) {
  const mustDelete = confirm('Deseja realmente excluir esse item?');

  if (mustDelete) {
    this.categoryService.delete(category.id).subscribe(
      () => this.categories = this.categories.filter(element => element !== category),
      (error) => console.error('Erro ao deletar categoria', error)
    )
    }
  }
  
} 
