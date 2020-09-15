import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ClothesCreateDTO,
  ClothesListDTO,
  ClothesStatus,
} from './clothes.interface';

import { ClothesService } from './clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
})
export class ClothesComponent implements OnInit {
  clothesList$: Observable<ClothesListDTO[]>;
  clothesStatusList$: Observable<ClothesStatus[]>;

  constructor(private clothesService: ClothesService) {}

  ngOnInit(): void {
    this.getClothesList();
    this.clothesStatusList$ = this.clothesService.statusList();
  }

  createClothes(formValue: ClothesCreateDTO): void {
    this.clothesService.create(formValue).subscribe(
      () => {
        console.log('Clothes created successfully');
        this.getClothesList();
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  getClothesList(): void {
    this.clothesList$ = this.clothesService.list();
  }

  removeClothes(clothes: ClothesListDTO): void {
    this.clothesService.remove(clothes.id).subscribe(
      () => this.getClothesList(),
      ({ error }: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  findOne(clothes: ClothesListDTO): void {
    console.log('find one clothes');
  }
}
