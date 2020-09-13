import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothesListDTO } from '../clothes.interface';

@Component({
  selector: 'app-clothes-table',
  templateUrl: './clothes-table.component.html',
  styleUrls: ['./clothes-table.component.scss'],
})
export class ClothesTableComponent implements OnInit {
  @Input() clothesList: Observable<ClothesListDTO[]>;

  constructor() {}

  ngOnInit(): void {}
}
