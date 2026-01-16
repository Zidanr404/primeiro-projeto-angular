import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent},
  { path: 'new', component: CategoriesFormComponent},
  { path: ':id/edit', component: CategoriesFormComponent}
];

 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }


//nomesite.com/categories => List (Master)
//nomesite.com/categories/id/edit => Detail (Detail)
//nomesite.com/categories/new => form (detail)
