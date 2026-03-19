import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing-module';
import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';



@NgModule({
  declarations: [

],
  imports: [
  
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    CategoryList,
    CategoryForm
  ]
})
export class CategoriesModule { }
