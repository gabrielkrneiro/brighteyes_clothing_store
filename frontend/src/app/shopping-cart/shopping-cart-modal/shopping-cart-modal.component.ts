import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/clothes/clothes.interface';
import { ShoppingCart } from '../shopping-cart.interface';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss'],
})
export class ShoppingCartModalComponent implements OnInit {
  modalRef: BsModalRef;
  totalCost: number;
  searchInputValue: number;
  formGroup: FormGroup;

  @ViewChild('lgModal', { static: false }) lgModal: ModalDirective;

  @Input() shoppingCart: ShoppingCart;

  @Output() addClothes = new EventEmitter<{
    requestedClothesId: number;
    shoppingCartId: number;
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.totalCost = 0;
    this.calcTotalCost();
    this.formGroup = this.fb.group({
      searchInput: [null],
    });
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

  addClothesButtonClicked(): void {
    const inputValue = parseInt(this.formGroup.controls.searchInput.value);
    if (!inputValue) return;
    this.addClothes.next({
      requestedClothesId: inputValue,
      shoppingCartId: this.shoppingCart.id,
    });
    this.resetForm();
  }

  resetForm(): void {
    this.searchInputValue = null;
  }
}
