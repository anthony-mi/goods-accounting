import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsModalComponent } from './goods-modal.component';

describe('GoodsModalComponent', () => {
  let component: GoodsModalComponent;
  let fixture: ComponentFixture<GoodsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
