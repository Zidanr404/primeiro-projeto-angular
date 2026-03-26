import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing-module';

import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    IMaskModule
  ],
  exports: [
  ]
})
export class EntriesModule { }
