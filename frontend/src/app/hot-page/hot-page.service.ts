import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from '../clothes/clothes.interface';
import { ClothesService } from '../clothes/clothes.service';

@Injectable({
  providedIn: 'root',
})
export class HotPageService {
  constructor(private clothesService: ClothesService) {}

  clothesList(): Observable<Clothes[]> {
    return this.clothesService.list();
  }
}
