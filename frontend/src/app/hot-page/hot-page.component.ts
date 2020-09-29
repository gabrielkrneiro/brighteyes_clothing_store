import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from '../clothes/clothes.interface';
import { ClothesService } from '../clothes/clothes.service';
import { HotPageService } from './hot-page.service';

@Component({
  selector: 'app-hot-page',
  templateUrl: './hot-page.component.html',
  styleUrls: ['./hot-page.component.scss'],
})
export class HotPageComponent implements OnInit {
  clothesList$: Observable<Clothes[]>;

  constructor(private hotPageService: HotPageService) {}

  ngOnInit(): void {
    this.clothesList$ = this.hotPageService.clothesList();
  }
}
