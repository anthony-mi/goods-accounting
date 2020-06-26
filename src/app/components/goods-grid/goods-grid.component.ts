import { GoodsService } from './../../services/goods.service';
import { ModalAction } from './../goods-modal/modal-action';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Goods } from 'src/app/entities/goods';
import { GoodsModalComponent } from '../goods-modal/goods-modal.component';

@Component({
  selector: 'app-goods-grid',
  templateUrl: './goods-grid.component.html',
  styleUrls: ['./goods-grid.component.css'],
  providers: [GoodsService]
})
export class GoodsgridComponent implements OnInit, AfterViewInit  {
  @ViewChild(GoodsModalComponent, {static: true})
  private goodsModal: GoodsModalComponent;

  private goods: Array<Goods>;
  private selectedGoods: Array<Goods>;

  constructor(private goodsService: GoodsService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.goodsModal.goodsCreationEvent.subscribe(item => this.goodsCreationEventHandler(item));
    this.goodsModal.goodsUpdatingEvent.subscribe(item => this.goodsUpdatingEventHandler(item));

    this.goodsService.getGoods()
      .subscribe(goods => this.goods = goods);
    this.selectedGoods = new Array<Goods>();
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerText = `$("#selectAll").click(function(){
      $('.select-checkbox').prop('checked', this.checked);
    });`;
    this.elementRef.nativeElement.appendChild(script);
  }

  requestGoodsCreation() {
    this.goodsModal.currentAction = ModalAction.Create;
    this.goodsModal.clear();
    this.goodsModal.showForm();
  }

  goodsCreationEventHandler(sender: GoodsModalComponent) {
    const clone = Object.assign({}, sender.currentGoods);

    if (this.goodsService.createGoods(clone)) {
      this.goodsModal.showSuccessMessage();
      this.goods.push(clone);
    } else {
      this.goodsModal.showErrorResult();
    }
  }

  requestEdit(goods: Goods) {
    this.goodsModal.clear();
    this.goodsModal.currentGoods = goods;
    this.goodsModal.currentAction = ModalAction.Update;
    this.goodsModal.showForm();
  }

  goodsUpdatingEventHandler(sender: GoodsModalComponent) {
    sender.close();

    if (this.goodsService.updateGoods(sender.currentGoods)) {
      this.goodsModal.showSuccessMessage();
    } else {
      this.goodsModal.showErrorResult();
    }
  }

  requestRemove(goods: Goods) {
    this.goodsModal.showYesNoMessage(`Remove '${goods.name}'?`,
    (
      () => {
        const index = this.goods.indexOf(goods, 0);
        if (index > -1) {
          this.goods.splice(index, 1);
        }
        this.goodsModal.close();
      }
      ),
        () => this.goodsModal.close()
    );
  }

  removeSelectedGoods() {
    this.selectedGoods.forEach(goods => {
      this.goodsService.deleteGoods(goods).subscribe(
        item => {
          const index = this.goods.indexOf(goods, 0);
          if (index > -1) {
            this.goods.splice(index, 1);
          }
        }
      );
    });
  }

  setAsSold(goods: Goods) {

  }

  writeOff(goods: Goods) {

  }

  toggleSelect(goods: Goods, checked: boolean) {
    if (checked) {
      this.selectedGoods.push(goods);
    } else {
      const index = this.selectedGoods.indexOf(goods, 0);
      if (index > -1) {
        this.selectedGoods.splice(index, 1);
      }
    }
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      const clonedArray  = Object.assign([], this.goods);
      this.selectedGoods = clonedArray;
    } else {
      this.selectedGoods = new Array<Goods>();
    }
  }
}
