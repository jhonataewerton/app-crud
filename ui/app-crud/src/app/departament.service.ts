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
        tap((dep: Departament) =>
          this.departmentsSubjects$.getValue().push(dep)
        )
      );
  }

  del(dep: Departament): Observable<any> {
    return this.http.delete(`${this.url}/${dep._id}`).pipe(
      tap(() => {
        let departments = this.departmentsSubjects$.getValue();
        let i = departments.findIndex((d) => d._id === dep._id);
        if (i >= 0) departments.splice(i, 1);
      })
    );
  }

  update(dep: Departament): Observable<Departament> {
    return this.http.patch<Departament>(`${this.url}/${dep._id}`, dep).pipe(
      tap((d) => {
        let departments = this.departmentsSubjects$.getValue();
        let i = departments.findIndex((d) => d._id === dep._id);
        if (i >= 0) departments[i].name = d.name;
      })
    );
  }
}
