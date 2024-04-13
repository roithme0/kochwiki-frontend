import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffsGridComponent } from './foodstuffs-grid.component';

describe('FoodstuffsGridComponent', () => {
  let component: FoodstuffsGridComponent;
  let fixture: ComponentFixture<FoodstuffsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
