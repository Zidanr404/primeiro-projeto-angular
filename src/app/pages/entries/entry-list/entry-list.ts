import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "../../../app.routes";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';



@Component({
  selector: 'app-entry-list',
  imports: [AppRoutingModule, NgFor, NgIf, RouterLink],
  templateUrl: './entry-list.html',
  styleUrl: './entry-list.scss',
})


export class EntryList implements OnInit {
  
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
     entries => this.entries = entries,
     error => console.error('Erro ao carregar categorias')
   )
  }

  deleteEntry(entry: Entry) {
  const mustDelete = confirm('Deseja realmente excluir esse item?');

  if (mustDelete && entry.id) {
    this.entryService.delete(entry.id).subscribe(
      () => this.entries = this.entries.filter(element => element !== entry),
      (error) => console.error('Erro ao deletar categoria', error)
    )
    }
  }
  
} 
