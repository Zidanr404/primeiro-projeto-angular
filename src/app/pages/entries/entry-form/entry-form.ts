import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { DatePicker} from 'primeng/datepicker'



@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePicker],
  templateUrl: './entry-form.html',
  styleUrl: './entry-form.scss',
})
export class EntryForm implements OnInit , AfterContentChecked {

  currentAction: string = '';
  entryForm: FormGroup = new FormGroup({});
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submitingForm: boolean = false;
  entry: Entry = new Entry();


   constructor(
      private entryService: EntryService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
   ) { }

    ngOnInit(): void {
      this.setCurrentAction();
      this.buildEntryForm();
      this.loadEntry();
    }
   
   ngAfterContentChecked(): void {

      this.setPageTitle();
   }

    submitForm() {
      this.submitingForm = true;

      if (this.currentAction === 'new') {
        this.createEntry();
      } else {
        this.updateEntry();
      }
    }

     
    //Private methods

    private setCurrentAction() {
      this.route.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
   }

    private buildEntryForm() {
      this.entryForm = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null],
        type: [null, [Validators.required]],
        amount: [null, [Validators.required]],
        date: [null, [Validators.required]],
        paid: [true, [Validators.required]],
        categoryId: [null, [Validators.required]]
      });
    }

    private loadEntry() {
      if (this.currentAction === 'edit') {
        this.route.paramMap.pipe(
          switchMap(params => this.entryService.getById(+params.get('id')!))
        )
        .subscribe((entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry);  //binds loaded entry data to entryForm
        }, (error) => {
          alert('Ocorreu um erro no servidor, tente mais tarde.');
        });
      }
    }
  

    private setPageTitle() {
      if (this.currentAction === 'new') {
        this.pageTitle = 'Cadastro de Novo Lançamento';
      } else {
        const entryName = this.entry.name || '';
        this.pageTitle = 'Editando Lançamento: ' + entryName;
      }
}

    private createEntry() {
      const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
        this.entryService.create(entry).subscribe(
          entry => this.actionsForSuccess(entry),
          error => this.actionsForError(error)
        );
    
    }

    private updateEntry() {
      const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
      this.entryService.update(entry).subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
    }

    private actionsForSuccess(entry: Entry) {
        this.toastr.success('Solicitação processada com sucesso!');

        this.router.navigateByUrl('entries', { skipLocationChange: true }).then(
            () => this.router.navigate(['entries', entry.id, 'edit'])
        );
    }

    private actionsForError(error: any) {
        this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
        this.submitingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
        }
    }
}