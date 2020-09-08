import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../employee.models';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit, OnChanges {
  @Input() employeeList: Observable<Employee[]>;

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.employeeList.subscribe((o) => console.log(o));
  }
}
