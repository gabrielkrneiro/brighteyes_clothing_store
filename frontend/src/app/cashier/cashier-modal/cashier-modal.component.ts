import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ShoppingCart } from 'src/app/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-cashier-modal',
  templateUrl: './cashier-modal.component.html',
  styleUrls: ['./cashier-modal.component.scss'],
})
export class CashierModalComponent implements OnInit {
  modalRef: BsModalRef;
  totalCost: number;

  @ViewChild('lgModal', { static: false }) lgModal: ModalDirective;
  @Input() shoppingCart: ShoppingCart;

  ngOnInit(): void {
    this.totalCost = 0;
    this.calcTotalCost();
  }

  showModal(): void {
    this.lgModal.show();
  }

  hideModal(): void {
    this.lgModal.hide();
  }

  calcTotalCost(): void {
    this.shoppingCart.clothes.forEach((c) => {
      this.totalCost = this.totalCost + c.price;
    });
  }
}
