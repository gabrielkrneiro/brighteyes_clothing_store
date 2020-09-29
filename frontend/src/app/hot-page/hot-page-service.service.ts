import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from '../clothes/clothes.interface';
import { ClothesService } from '../clothes/clothes.service';

@Injectable({
  providedIn: 'root',
})
export class HotPageServiceService {
  clothes$: Observable<Clothes[]>;

  constructor(private clothesService: ClothesService) {
    this.clothes$ = this.clothesService.list();
  }
}
