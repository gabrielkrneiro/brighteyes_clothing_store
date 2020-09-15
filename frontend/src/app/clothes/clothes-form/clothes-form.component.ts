import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/common/services/session.service';
import { Employee } from 'src/app/employee/employee.models';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Clothes, ClothesCreateDTO, ClothesStatus } from '../clothes.interface';
import { ClothesStatusEnum } from './../clothes.enum';

const ClothesMock: ClothesCreateDTO = {
  name: 'CLOTHES 1',
  photo:
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  price: 10.0,
  quantityInStock: 2,
  status: 1,
};

@Component({
  selector: 'app-clothes-form',
  templateUrl: './clothes-form.component.html',
  styleUrls: ['./clothes-form.component.scss'],
})
export class ClothesFormComponent implements OnInit {
  clothesForm: FormGroup;

  @Input() statusList: Observable<ClothesStatus[]>;

  @Output() createClothes = new EventEmitter<ClothesCreateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clothesForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantityInStock: [null, [Validators.required]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
    this.clothesForm.patchValue(ClothesMock);
  }

  async sendForm(): Promise<void> {
    const formValues = this.clothesForm.value as ClothesCreateDTO;
    this.createClothes.next(formValues);
  }
}
