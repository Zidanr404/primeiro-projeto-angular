import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';


@Component({
  selector: 'app-category-form',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit , AfterContentChecked {

  currentAction: string = '';
  categoryForm: FormGroup = new FormGroup({});
  pageTitle: string = '';
  serverErrorMessages: string[] = null;
  submitingForm: boolean = false;
  category: Category = new Category();

  


   constructor(
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
   ) { }

    ngOnInit(): void {
      this.setCurrentAction();
      this.buildCategoryForm();
      this.loadCategory();
    }
   
   ngAfterContentChecked(): void {

      this.setPageTitle();
   }


     
    //Privite methods

    private setCurrentAction() {
      this.route.snapshot.url[0].path == 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
   }

    private buildCategoryForm() {
      this.categoryForm = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null]
      });
    }

    private loadCategory() {
      if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
          switchMap(params => this.categoryService.getById(+params.get('id')))
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
      if (this.currentAction == 'new') {
        this.pageTitle = 'Cadastro de Nova Categoria';
      } else {
        const categoryName = this.category.name || '';
        this.pageTitle = 'Editando Categoria: ' + categoryName;
      }
}
}