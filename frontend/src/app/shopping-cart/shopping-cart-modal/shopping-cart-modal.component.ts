import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/clothes/clothes.interface';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss'],
})
export class ShoppingCartModalComponent implements OnInit {
  modalRef: BsModalRef;

  @ViewChild('lgModal', { static: false }) lgModal: ModalDirective;

  @Input() shoppingCartClothesList: Clothes[];

  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    console.log(this.shoppingCartClothesList);

    this.lgModal.show();
  }

  hideModal(): void {
    this.lgModal.hide();
  }
}
