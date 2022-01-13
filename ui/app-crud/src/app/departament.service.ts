import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Departament } from './departament';

@Injectable({
  providedIn: 'root',
})
export class DepartamentService {
  readonly url = 'http://localhost:3000/departments';

  private departmentsSubjects$: BehaviorSubject<Departament[]> =
    new BehaviorSubject<Departament[]>([]);
  private loaded: boolean = false;
  constructor(private http: HttpClient) {}

  get(): Observable<Departament[]> {
    if (!this.loaded) {
      this.http
        .get<Departament[]>(this.url)
        .pipe(tap((deps) => console.log))
        .subscribe(this.departmentsSubjects$);
      this.loaded = true;
    }
    return this.departmentsSubjects$.asObservable();
  }

  add(d: Departament): Observable<Departament> {
    return this.http
      .post<Departament>(this.url, d)
      .pipe(
        tap((dep: Departament) => this.departmentsSubjects$.getValue().push(dep))
      );
  }
}
