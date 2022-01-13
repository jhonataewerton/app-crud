import { DepartamentService } from './../departament.service';
import { Departament } from './../departament';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css'],
})
export class DepartamentComponent implements OnInit {
  depName: string = '';
  departments: Departament[] = [
    { name: 'dep1', _id: 'asdf' },
    { name: 'dep1', _id: 'asdf' },
    { name: 'dep1', _id: 'asdf' },
    { name: 'dep1', _id: 'asdf' },
    { name: 'dep1', _id: 'asdf' },
  ];
  constructor(private departmentService: DepartamentService) {}

  ngOnInit(): void {
    this.departmentService.get().subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  save() {
    this.departmentService.add({ name: this.depName }).subscribe({
      next: (res) => {
        console.log(res);
        this.clearFields();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearFields() {
    this.depName = '';
  }

  cancel() {}

  delete(dep: Departament) {}

  edit(dep: Departament) {}
}
