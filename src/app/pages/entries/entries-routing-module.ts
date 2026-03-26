import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryList } from './entry-list/entry-list';
import { EntryForm } from './entry-form/entry-form';



const routes: Routes = [
  { path: '', component: EntryList },
  { path: 'new', component: EntryForm },
  { path: ':id/edit', component: EntryForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
