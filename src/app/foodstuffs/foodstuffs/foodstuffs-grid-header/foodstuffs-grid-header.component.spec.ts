import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffsGridHeaderComponent } from './foodstuffs-grid-header.component';

describe('FoodstuffsGridHeaderComponent', () => {
  let component: FoodstuffsGridHeaderComponent;
  let fixture: ComponentFixture<FoodstuffsGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffsGridHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffsGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
