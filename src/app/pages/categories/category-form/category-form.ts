import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category';

import { switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit , AfterContentChecked {

  currentAction: string = '';
  categoryForm: FormGroup = new FormGroup({});
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submitingForm: boolean = false;
  category: Category = new Category();


   constructor(
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
   ) { }

    ngOnInit(): void {
      this.setCurrentAction();
      this.buildCategoryForm();
      this.loadCategory();
    }
   
   ngAfterContentChecked(): void {

      this.setPageTitle();
   }

    submitForm() {
      this.submitingForm = true;

      if (this.currentAction === 'new') {
        this.createCategory();
      } else {
        this.updateCategory();
      }
    }

     
    //Private methods

    private setCurrentAction() {
      this.route.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
   }

    private buildCategoryForm() {
      this.categoryForm = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null]
      });
    }

    private loadCategory() {
      if (this.currentAction === 'edit') {
        this.route.paramMap.pipe(
          switchMap(params => this.categoryService.getById(+params.get('id')!))
        )
        .subscribe((category) => {
          this.category = category;
          this.categoryForm.patchValue(category);  //binds loaded category data to categoryForm
        }, (error) => {
          alert('Ocorreu um erro no servidor, tente mais tarde.');
        });
      }
    }
  

    private setPageTitle() {
      if (this.currentAction === 'new') {
        this.pageTitle = 'Cadastro de Nova Categoria';
      } else {
        const categoryName = this.category.name || '';
        this.pageTitle = 'Editando Categoria: ' + categoryName;
      }
}

    private createCategory() {
      const category: Category = Object.assign(new Category(), this.categoryForm.value);
        this.categoryService.create(category).subscribe(
          category => this.actionsForSuccess(category),
          error => this.actionsForError(error)
        );
    
    }

    private updateCategory() {
      const category: Category = Object.assign(new Category(), this.categoryForm.value);
      this.categoryService.update(category).subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
    }

    private actionsForSuccess(category: Category) {
        this.toastr.success('Solicitação processada com sucesso!');

        this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
            () => this.router.navigate(['categories', category.id, 'edit'])
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