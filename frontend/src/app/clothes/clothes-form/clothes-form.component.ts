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
  formGroup: FormGroup;
  isUpdating: boolean;

  @Input() statusList: Observable<ClothesStatus[]>;

  @Output() createObject = new EventEmitter<ClothesCreateDTO>();
  @Output() updateObject = new EventEmitter<ClothesUpdateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantityInStock: [null, [Validators.required, Validators.min(0)]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
    this.isUpdating = false;
  }

  async sendForm(): Promise<void> {
    try {
      if (!this.isUpdating) {
        this.createObject.next(this.formGroup.value);
      } else {
        this.updateObject.next(this.formGroup.value);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setClothesToUpdate(clothes: ClothesDetailsDTO) {
    this.isUpdating = true;
    this.formGroup.patchValue(clothes);
    this.formGroup.patchValue({ status: clothes.status.id });
  }

  resetForm(): void {
    this.formGroup.reset();
    this.isUpdating = false;
  }

  isValid(attr: string): string {
    return this.formGroup.get(attr).valid ? 'is-valid' : 'is-invalid';
  }

  showInvalidFeedback(attr: string): boolean {
    return this.isValid(attr) === 'is-invalid' ? true : false;
  }
}
