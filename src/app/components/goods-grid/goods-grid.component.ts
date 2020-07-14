import { GoodsService } from './../../services/goods.service';
import { ModalAction } from './../goods-modal/modal-action';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Goods } from 'src/app/entities/goods';
import { GoodsModalComponent } from '../goods-modal/goods-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goods-grid',
  templateUrl: './goods-grid.component.html',
  styleUrls: ['./goods-grid.component.css'],
  providers: [GoodsService]
})
export class GoodsgridComponent implements OnInit, AfterViewInit  {
  private numberInputEventSubscription: Subscription;

  constructor(private goodsService: GoodsService, private elementRef: ElementRef) { }
  @ViewChild(GoodsModalComponent, {static: true})
  private goodsModal: GoodsModalComponent;

  private goods: Array<Goods>;
  private selectedGoods: Array<Goods>;

  // TODO: add @out parameter to originalObject
  private static updateGoodsFields(originalObject: Goods, newObjectState: Goods): void {
    originalObject.count = newObjectState.count;
    originalObject.countOfSold = newObjectState.countOfSold;
    originalObject.name = newObjectState.name;
    originalObject.purchasePrice = newObjectState.purchasePrice;
    originalObject.salePrice = newObjectState.salePrice;
  }

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
      this.goodsModal.errorMessage = `Goods '${clone.name}' doesn't created.`;
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
    const clonedGoods = Object.assign({}, sender.currentGoods);

    if (this.goodsService.updateGoods(clonedGoods)) {
      // tslint:disable-next-line: prefer-const
      let goodsForUpdating = this.goods.find(goods => goods.id === clonedGoods.id);
      GoodsgridComponent.updateGoodsFields(goodsForUpdating, clonedGoods);
      this.goodsModal.showSuccessMessage();
    } else {
      this.goodsModal.errorMessage = `Goods '${clonedGoods.name}' doesn't updated.`;
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
    const modal = this.goodsModal;
    modal.showNumberForm();

    this.numberInputEventSubscription = modal.numberInputedEvent.subscribe(number => {
      if (number <= 0) {
        modal.title = 'Validation error';
        modal.errorMessage = 'Number must be greater than 0.';
        modal.showErrorResult();
      } else if (number > goods.count) {
        modal.title = 'Logical error';
        modal.errorMessage = 'Number must be less or equal to count of goods.';
        modal.showErrorResult();
      } else {
        goods.count -= number;
        goods.countOfSold += number;
        modal.showSuccessMessage();
      }

      this.numberInputEventSubscription.unsubscribe();
    });
  }

  writeOff(goods: Goods) {
    const modal = this.goodsModal;
    modal.showNumberForm();

    this.numberInputEventSubscription = modal.numberInputedEvent.subscribe(number => {
      if (number <= 0) {
        modal.title = 'Validation error';
        modal.errorMessage = 'Number must be greater than 0.';
        modal.showErrorResult();
      } else if (number > goods.count) {
        modal.title = 'Logical error';
        modal.errorMessage = 'Number must be less or equal to count of goods.';
        modal.showErrorResult();
      } else {
        goods.count -= number;
        modal.showSuccessMessage();
      }

      this.numberInputEventSubscription.unsubscribe();
    });
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
      const clonedArray = Object.assign([], this.goods);
      this.selectedGoods = clonedArray;
    } else {
      this.selectedGoods = new Array<Goods>();
    }
  }
}
