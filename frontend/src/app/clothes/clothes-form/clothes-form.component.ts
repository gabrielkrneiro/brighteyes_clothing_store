import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  ClothesCreateDTO,
  ClothesDetailsDTO,
  ClothesStatus,
  ClothesUpdateDTO,
} from '../clothes.interface';

@Component({
  selector: 'app-clothes-form',
  templateUrl: './clothes-form.component.html',
  styleUrls: ['./clothes-form.component.scss'],
})
export class ClothesFormComponent implements OnInit {
  clothesForm: FormGroup;
  isUpdating: boolean;

  @Input() statusList: Observable<ClothesStatus[]>;

  @Output() createObject = new EventEmitter<ClothesCreateDTO>();
  @Output() updateObject = new EventEmitter<ClothesUpdateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clothesForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantityInStock: [null, [Validators.required]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
    this.isUpdating = false;
  }

  async sendForm(): Promise<void> {
    try {
      if (!this.isUpdating) {
        this.createObject.next(this.clothesForm.value);
      } else {
        this.updateObject.next(this.clothesForm.value);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setClothesToUpdate(clothes: ClothesDetailsDTO) {
    this.isUpdating = true;
    this.clothesForm.patchValue(clothes);
    this.clothesForm.patchValue({ status: clothes.status.id });
  }

  resetForm(): void {
    this.clothesForm.reset();
    this.isUpdating = false;
  }
}
