import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';

export const routes: Routes = [
  { path: 'entries', loadChildren: () => import('./pages/entries/entries-module').then(m => m.EntriesModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories-module').then(m => m.CategoriesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
