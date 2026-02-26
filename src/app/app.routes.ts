import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';

export const routes: Routes = [
  { path: 'categories', loadChildren: () => import('./pages/categories/categories-module').then(m => m.CategoriesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 