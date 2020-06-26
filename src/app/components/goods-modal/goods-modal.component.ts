import { Component, OnInit, EventEmitter } from '@angular/core';
import { Goods } from 'src/app/entities/goods';
import { ModalAction } from './modal-action';
import { ModalWindowType } from './modal-window-type';

@Component({
  selector: 'app-goods-modal',
  templateUrl: './goods-modal.component.html',
  styleUrls: ['./goods-modal.component.css']
})
export class GoodsModalComponent implements OnInit {
  private visible: boolean;

  // tslint:disable-next-line: variable-name
  private _title: string;
  // tslint:disable-next-line: variable-name
  private _message: string;
  // tslint:disable-next-line: variable-name
  private _goods: Goods;

  // tslint:disable-next-line: variable-name
  private _onYesAction: () => any;
  // tslint:disable-next-line: variable-name
  private _onNoAction: () => any;

  // tslint:disable-next-line: variable-name
  private _currentAction: ModalAction;
  // tslint:disable-next-line: variable-name
  private _currentWindowType: ModalWindowType;

  public showErrorMessage: boolean;
  public errorMessages: Array<string>;

  public goodsCreationEvent = new EventEmitter();
  public goodsUpdatingEvent = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    this._goods = new Goods(0, '', 0, 0, 0, 0);
    this.visible = false;
  }

  set currentAction(value: ModalAction) {
    this._currentAction = value;
  }

  get currentGoods(): Goods {
    return this._goods;
  }

  set currentGoods(value: Goods) {
    this._goods.id = value.id;
    this._goods.name = value.name;
    this._goods.count = value.count;
    this._goods.purchasePrice = value.purchasePrice;
    this._goods.salePrice = value.salePrice;
    this._goods.countOfSold = value.countOfSold;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  public showForm() {
    this._currentWindowType = ModalWindowType.Form;
    this.showErrorMessage = false;
    this.visible = true;
  }

  public showSuccessMessage() {
    this._currentWindowType = ModalWindowType.Success;
    this.showErrorMessage = false;
    this.visible = true;
  }

  public showErrorResult() {
    this._currentWindowType = ModalWindowType.Error;
    this.showErrorMessage = false;
    this.visible = true;
  }

  public close() {
    this.visible = false;
    this.errorMessages = new Array<string>();
  }

  public clear() {
    this.title = '';
    this.message = '';
    this.currentGoods = new Goods(0, '', 0, 0, 0, 0);
    this.showErrorMessage = false;
    this.errorMessages = new Array<string>();
  }

  public save() {
    this.errorMessages = new Array<string>();

    if (this._goods.name === '') {
      this.errorMessages.push('Name field is required');
    }

    if (this._goods.count < 0) {
      this.errorMessages.push('Count can\'t be less than zero');
    }

    if (this._goods.purchasePrice < 0) {
      this.errorMessages.push('Purchase price can\'t be less than zero');
    }

    if (this._goods.salePrice < 0) {
      this.errorMessages.push('Sale price can\'t be less than zero');
    }

    if (this._goods.countOfSold < 0) {
      this.errorMessages.push('Count of sold can\'t be less than zero');
    }

    if (this.errorMessages.length === 0) { // form data is valid
      switch (this._currentAction) {
        case ModalAction.Create:
          this.goodsCreationEvent.emit(this);
          break;

        case ModalAction.Update:
          this.goodsUpdatingEvent.emit(this);
          break;
      }
    } else {
      this.showErrorMessage = true;
    }
  }

  public showYesNoMessage(message: string, onYesAction: () => any, onNoAction: () => any) {
    this.message = message;
    this._onYesAction = onYesAction;
    this._onNoAction = onNoAction;
    this._currentWindowType = ModalWindowType.YesNoMessage;
    this.visible = true;
  }

  private yesClick() {
    this._onYesAction();
  }

  private noClick() {
    this._onNoAction();
  }

  public currentWindowIsSuccess() {
    return this._currentWindowType === ModalWindowType.Success;
  }

  public currentWindowIsError() {
    return this._currentWindowType === ModalWindowType.Error;
  }

  public currentWindowIsForm() {
    return this._currentWindowType === ModalWindowType.Form;
  }

  public currentWindowIsYesNoMessage() {
    return this._currentWindowType === ModalWindowType.YesNoMessage;
  }
}
