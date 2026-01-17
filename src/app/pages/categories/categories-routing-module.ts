import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';

const routes: Routes = [
  { path: '', component: CategoryList },
  { path: 'new', component: CategoryForm },
  { path: ':id/edit', component: CategoryForm }
];

 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }


//nomesite.com/categories => List (Master)
//nomesite.com/categories/id/edit => Detail (Detail)
//nomesite.com/categories/new => form (detail)
