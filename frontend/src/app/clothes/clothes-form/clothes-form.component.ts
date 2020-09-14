import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/common/services/session.service';
import { Employee } from 'src/app/employee/employee.models';
import { EmployeeService } from 'src/app/employee/employee.service';
import { ClothesStatus } from '../clothes.interface';

@Component({
  selector: 'app-clothes-form',
  templateUrl: './clothes-form.component.html',
  styleUrls: ['./clothes-form.component.scss'],
})
export class ClothesFormComponent implements OnInit {
  clothesForm: FormGroup;

  @Input() statusList: Observable<ClothesStatus[]>;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.clothesForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantityInStock: [null, [Validators.required]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      warehouseEmployee: [null, [Validators.required]],
    });
  }

  sendForm(): void {
    const session = this.sessionService.decodeSession();
    // const wareHouseEmployee = this.employeeService.findOne()
    // this.clothesForm.patchValue({ warehouseEmployee: session. })
    console.log(this.clothesForm.value);
  }
}
