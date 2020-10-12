import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientListDTO } from '../client.interfaces';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent {
  @Input() clientList: Observable<ClientListDTO[]>;

  @Output() removeObject = new EventEmitter<ClientListDTO>();
  @Output() findOne = new EventEmitter<ClientListDTO>();

  exportPDF(): void {
    console.log('exporting pdf...')
  }

  exportExcel(): void {
    console.log('exporting excel...')
  }

  removeButtonClicked(client: ClientListDTO): void {
    this.removeObject.next(client);
  }

  updateButtonClicked(client: ClientListDTO): void {
    this.findOne.next(client);
  }
}
