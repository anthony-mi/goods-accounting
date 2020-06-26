import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsgridComponent } from './goods-grid.component';

describe('GoodsgridComponent', () => {
  let component: GoodsgridComponent;
  let fixture: ComponentFixture<GoodsgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
