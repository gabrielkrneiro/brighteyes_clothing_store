import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cashier-modal-finish-purchase',
  templateUrl: './cashier-modal-finish-purchase.component.html',
  styleUrls: ['./cashier-modal-finish-purchase.component.scss'],
})
export class CashierModalFinishPurchaseComponent implements OnInit {
  modalRef: BsModalRef;

  @ViewChild('lgModal', { static: false }) lgModal: ModalDirective;

  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    this.lgModal.show();
  }

  hideModal(): void {
    this.lgModal.hide();
  }
}
