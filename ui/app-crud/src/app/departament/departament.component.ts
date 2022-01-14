import { DepartamentService } from './../departament.service';
import { Departament } from './../departament';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css'],
})
export class DepartamentComponent implements OnInit {
  depName: string = '';
  departments: Departament[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  depEdit: Departament = { name: '' };
  constructor(
    private departmentService: DepartamentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.departmentService
      .get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.departments = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  save() {
    if (this.depEdit != { name: '' }) {
      this.departmentService
        .update({
          name: this.depName,
          _id: this.depEdit._id,
        })
        .subscribe({
          next: (dep) => {
            this.notify('Updated!');
          },
          error: (err) => {
            this.notify('Error!');
            console.error(err);
          },
        });
    } else {
      this.departmentService.add({ name: this.depName }).subscribe({
        next: (res) => {
          console.log(res);
          this.clearFields();
          this.notify('Inserted!');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  clearFields() {
    this.depName = '';
    this.depEdit = { name: '' };
  }

  cancel() {}

  delete(dep: Departament) {
    this.departmentService.del(dep).subscribe({
      next: () => {
        this.notify('Removed!');
      },
      error: (err) => {
        this.notify(err);
        console.error(err);
      },
    });
  }

  edit(dep: Departament) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
  }
}
