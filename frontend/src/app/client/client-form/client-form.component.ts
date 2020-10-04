import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { dateFormatter, dateParser } from 'src/app/common/dateFormatter';

import {
  ClientCreateDTO,
  ClientDetailsDTO,
  ClientStatus,
  ClientUpdateDTO,
} from '../client.interfaces';

const clientMock = {
  name: 'Teste 1',
  birthdate: dateParser('12/12/2002'),
  cpf: '123.123.123-12',
  photo:
    'https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=728&q=80',
  status: 2,
  address: 'Rua klajskldfjasd, 00 - asdfasdf - Manaus/AM',
};

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  formGroup: FormGroup;
  isUpdating: boolean;

  @Input() statusList: Observable<ClientStatus[]>;

  @Output() createObject = new EventEmitter<ClientCreateDTO>();
  @Output() updateObject = new EventEmitter<ClientUpdateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
    this.isUpdating = false;
    // this.formGroup.patchValue(clientMock);
  }

  teste(): void {
    console.log(this.formGroup.get('name').errors?.required);
  }

  async sendForm(): Promise<void> {
    try {
      if (this.formGroup.invalid) return;
      const form = this.formGroup.value;
      form.birthdate = dateFormatter(this.formGroup.controls.birthdate.value);
      if (!this.isUpdating) {
        this.createObject.next(form);
      } else {
        this.updateObject.next(form);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setClothesToUpdate(client: ClientDetailsDTO) {
    this.isUpdating = true;
    this.formGroup.patchValue(client);
    this.formGroup.patchValue({ status: client.status.id });
    this.formGroup.patchValue({ birthdate: dateParser(client.birthdate) });
  }

  resetForm(): void {
    this.formGroup.reset();
    this.isUpdating = false;
  }
}
