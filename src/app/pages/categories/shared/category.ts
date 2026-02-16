// Parte muito importante para o funcionamento do serviço, pois é onde estão as requisições para a API, e onde os dados são convertidos para o formato correto. e acaba evitando a repetição de código em outros lugares da aplicação, como os componentes. 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';

import { category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class categoryService {

  private apiPath: string = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<category[]> {
    
    return this.http.get<category[]>(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }

  getById(id: number): Observable<category> {
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  create(category: category): Observable<category> {
    
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  update(category: category): Observable<category> {
    const url = `${this.apiPath}/${category.id}`; 

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  // Private methods

  private jsonDataToCategories(jsonData: any[]): category[] {
    const categories: category[] = [];
    jsonData.forEach(element => categories.push(element as category));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): category {
    return jsonData as category;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
  
}
