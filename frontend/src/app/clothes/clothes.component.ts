import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothesListDTO, ClothesStatus } from './clothes.interface';

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
    this.clothesList$ = this.clothesService.list();
    this.clothesStatusList$ = this.clothesService.statusList();
  }
}
