import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryList } from './entry-list/entry-list';

const routes: Routes = [
  { path: '', component: EntryList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
